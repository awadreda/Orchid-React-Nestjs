export declare type Unpacked<T> = T extends (infer U)[] ? U : T extends (...args: unknown[]) => infer U ? U : T extends new (...args: unknown[]) => infer U ? U : T extends Promise<infer U> ? U : T;
export declare type Dictionary<T> = {
    [key in keyof T]?: unknown;
};
export declare type Primitive = String | Number | Boolean;
export declare type PrimitiveWithDate = Primitive | Date;
export declare type PrimitiveConstructor = StringConstructor | NumberConstructor | BooleanConstructor;
export declare type PrimitiveConstructorWithDate = PrimitiveConstructor | DateConstructor;
export interface Selector<TObject extends Dictionary<TObject> = any, TReturnType = unknown> {
    (obj: TObject): TReturnType;
}
export declare type SelectorReturn<TObject extends Dictionary<TObject>> = ReturnType<Selector<TObject>>;
export interface ValueSelector<TSource extends Dictionary<TSource> = any, TDestination extends Dictionary<TDestination> = any, TValueReturn = SelectorReturn<TDestination>> {
    (source: TSource): TValueReturn;
}
export interface TransformerMetadataFactory<TModel extends Dictionary<TModel> = any> {
    __NARTC_AUTOMAPPER_METADATA_FACTORY?: () => Dictionary<TModel>;
}
