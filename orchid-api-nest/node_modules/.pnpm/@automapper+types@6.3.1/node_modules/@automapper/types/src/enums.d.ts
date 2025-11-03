export declare const enum TransformationType {
    Ignore = 0,
    MapFrom = 1,
    Condition = 2,
    FromValue = 3,
    MapWith = 4,
    ConvertUsing = 5,
    MapInitialize = 6,
    NullSubstitution = 7,
    MapDefer = 8,
    MapWithArguments = 9
}
export declare const enum MappingClassId {
    mappings = 0,
    keys = 1,
    properties = 2,
    actions = 3,
    mapper = 4,
    namingConventions = 5,
    bases = 6
}
export declare const enum MappingPropertiesClassId {
    path = 0,
    property = 1,
    nestedMappingPair = 2
}
export declare const enum MappingPropertyClassId {
    targetAndOrigin = 0,
    transformation = 1
}
export declare const enum MappingPropertyTargetOriginClassId {
    target = 0,
    origin = 1
}
export declare const enum MappingTransformationClassId {
    memberMapFn = 0,
    metadataNullFlag = 1,
    preCond = 2
}
export declare const enum MapFnClassId {
    type = 0,
    fn = 1,
    misc = 2
}
export declare const enum MetadataClassId {
    propertyKey = 0,
    metadataFn = 1,
    isGetterOnly = 2
}
