declare module 'hard-rejection' {
  function install(log?: (message: any) => void): any;

  namespace install {}
  export = install;
}
