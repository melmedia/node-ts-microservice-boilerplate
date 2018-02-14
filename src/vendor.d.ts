declare module 'hard-rejection' {
  function install(log?: (stack: any) => void): any;

  namespace install {}
  export = install;
}

declare module 'object-to-map' {

  interface ObjectToMap {
    (input: object): Map<string, any>;
  }

  const objectToMap: ObjectToMap;
  export = objectToMap;

}
