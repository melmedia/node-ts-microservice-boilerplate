declare module 'hard-rejection' {
  function install(log?: (stack: any) => void): any;

  namespace install {}
  export = install;
}
