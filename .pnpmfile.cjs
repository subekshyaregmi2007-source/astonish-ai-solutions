function readPackage(pkg) {
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  },
  allowBuilds: {
    "esbuild": true
  }
};
