module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|(\\.|/)(spec))\\.ts?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testEnvironment: 'node'
};
