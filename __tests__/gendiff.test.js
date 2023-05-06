import genDiff from '../src/gendiff.js';

const testFile1 = './__fixtures__/file1.json';
const testFile2 = './__fixtures__/file2.json';

test('genDiff tests', () => {
  expect(genDiff(testFile1, testFile2)).toEqual(genDiff(testFile1, testFile2));
});
