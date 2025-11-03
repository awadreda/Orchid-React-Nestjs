'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@automapper/core');
require('reflect-metadata');

const AUTOMAPPER_METADATA_FACTORY_KEY = '__AUTOMAPPER_METADATA_FACTORY__';
const AUTOMAP_PROPERTIES_METADATA_KEY = 'automap:properties';
const AUTOMAP_STANDALONE_METADATA_KEY = 'automap:standalone';

function getMetadataList(model) {
  let metadataList = (model.constructor?.prototype ? Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, model.constructor.prototype) || [] : []).concat(Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, model) || []);
  const metadataFactoryFn = model[AUTOMAPPER_METADATA_FACTORY_KEY];
  if (metadataFactoryFn) {
    metadataList = metadataList.concat(metadataFactoryFn() || []);
  }
  return metadataList.reduce((result, [propertyKey, {
    type,
    depth,
    isGetterOnly
  }]) => {
    // can be [type] or type
    const meta = type();
    const isArray = Array.isArray(meta);
    const trueMeta = isArray ? meta[0] : meta;
    if (!core.isDateConstructor(trueMeta) && !core.isPrimitiveConstructor(trueMeta)) {
      result[1].push(trueMeta);
    }
    result[0].push([propertyKey, {
      type: () => trueMeta,
      depth,
      isGetterOnly,
      isArray
    }]);
    return result;
  }, [[], []]);
}

function classes(options = {}) {
  const {
    destinationConstructor = (_, destinationIdentifier) => new destinationIdentifier(),
    applyMetadata,
    postMap,
    preMap
  } = {
    ...core.defaultStrategyInitializerOptions,
    ...options
  };
  const metadataTracker = new Set();
  return mapper => ({
    destinationConstructor,
    mapper,
    get applyMetadata() {
      return applyMetadata(this);
    },
    retrieveMetadata(...identifiers) {
      const metadataMap = new Map();
      for (let i = 0, length = identifiers.length; i < length; i++) {
        const identifier = identifiers[i];
        if (metadataTracker.has(identifier)) {
          continue;
        }
        const [metadataList, nestedConstructors] = getMetadataList(identifier);
        metadataMap.set(identifier, metadataList);
        metadataTracker.add(identifier);
        if (nestedConstructors.length) {
          const nestedConstructorsMetadataMap = this.retrieveMetadata(...nestedConstructors);
          nestedConstructorsMetadataMap.forEach((nestedConstructorMetadataList, nestedConstructor) => {
            metadataMap.set(nestedConstructor, nestedConstructorMetadataList);
          });
        }
      }
      return metadataMap;
    },
    preMap,
    postMap
  });
}

function AutoMap(typeFnOrOptions) {
  const options = getAutoMapOptions(typeFnOrOptions);
  return (target, propertyKey) => {
    const existingMetadataList = Reflect.getMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, target.constructor) || [];
    if (!options.type) {
      const designTypeMeta = Reflect.getMetadata('design:type', target, propertyKey);
      // only store design:type metadata if it's not Array or Object
      if (designTypeMeta && designTypeMeta !== Array && designTypeMeta !== Object) {
        options.type = () => designTypeMeta;
      }
    }
    // if typeFn is still null/undefined, fail fast;
    if (options.type == null) {
      if (core.AutoMapperLogger.warn) {
        core.AutoMapperLogger.warn(`
Cannot determine type metadata of "${String(propertyKey)}" on class ${target.constructor.name}.
"${String(propertyKey)}" metadata has been skipped.
Manually provide the "type" metadata to prevent unexpected behavior.
`);
      }
      return;
    }
    if (!options.isGetterOnly) {
      // paramtypes gives information about the setter.
      // it will be null if this is not a getter
      // it will be an [] if this is an getter-only
      const designParamsType = Reflect.getMetadata('design:paramtypes', target, propertyKey);
      options.isGetterOnly = designParamsType && !designParamsType.length;
    }
    Reflect.defineMetadata(AUTOMAP_PROPERTIES_METADATA_KEY, [...existingMetadataList, [propertyKey, options]], target.constructor);
  };
}
function getAutoMapOptions(typeFnOrOptions) {
  if (typeFnOrOptions === undefined) {
    return {
      depth: 1,
      isGetterOnly: undefined,
      type: undefined
    };
  }
  if (typeof typeFnOrOptions === 'function') {
    return {
      depth: 1,
      isGetterOnly: undefined,
      type: typeFnOrOptions
    };
  }
  return typeFnOrOptions;
}

exports.AUTOMAPPER_METADATA_FACTORY_KEY = AUTOMAPPER_METADATA_FACTORY_KEY;
exports.AUTOMAP_PROPERTIES_METADATA_KEY = AUTOMAP_PROPERTIES_METADATA_KEY;
exports.AUTOMAP_STANDALONE_METADATA_KEY = AUTOMAP_STANDALONE_METADATA_KEY;
exports.AutoMap = AutoMap;
exports.classes = classes;
exports.getMetadataList = getMetadataList;
