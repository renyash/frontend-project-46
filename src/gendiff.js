import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getDataFile1 = readFileSync(path.resolve('__fixtures__', 'file1.json'), 'utf8');
const getDataFile2 = readFileSync(path.resolve('__fixtures__', 'file2.json'), 'utf8');

const parsedDataFile1 = JSON.parse(getDataFile1);
const parsedDataFile2 = JSON.parse(getDataFile2);

const mknode = (key, value, type, oldValue = null) => ({
  key,
  value,
  type,
  oldValue,
});

const getDiff = (parsedDataFile1, parsedDataFile2) => {
  const keys1 = Object.keys(parsedDataFile1);
  const keys2 = Object.keys(parsedDataFile2);

  const unitedKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unitedKeys);
  
  console.log(`Here all unique keys found: ${unitedKeys}`);
  console.log(`Sorted keys: ${sortedKeys}`);

  const nodes = sortedKeys.map((key) => {
    const value1 = parsedDataFile1[key];
    const value2 = parsedDataFile2[key];
    if (!_.has(parsedDataFile1, key)) return mknode(key, value2, 'added');
    if (!_.has(parsedDataFile2, key)) return mknode(key, value1, 'deleted');
    if (parsedDataFile1[key] !== parsedDataFile2[key]) return mknode(key, value1, 'updated', value2);
    return mknode(key, value1, 'unchanged');
  });
  return nodes;
};

const renderTree = (nodes) => {
  const tree = nodes.map((node) => {
    const { key, value, oldValue } = node;
    switch (node.type) {
      case 'added': return `\t+ ${key}: ${value}`;
      case 'deleted': return `\t- ${key}: ${value}`;
      case 'updated': return `\t- ${key}: ${oldValue}\n\t+ ${key}: ${value}`;
      case 'unchanged': return `\t  ${key}: ${value}`;
      default: throw new Error('something went wrong... :(');
    }
  });
  return `{\n${tree.join('\n')} \n}`;
};
const nodes = getDiff(parsedDataFile1, parsedDataFile2);
console.log(renderTree(nodes));

export default getDiff;
