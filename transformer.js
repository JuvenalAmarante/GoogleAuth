const obfuscatingTransformer = require('react-native-obfuscating-transformer');

module.exports = obfuscatingTransformer({
  /* Insert here any required configuration */
  obfuscatorOptions: {
    compact: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 1,
    unicodeEscapeSequence: false,
  },
  upstreamTransformer: require('metro-react-native-babel-transformer'),
  trace: true,
  emitObfuscatedFiles: true,
  enableInDevelopment: true,
  filter: () => true,
});
