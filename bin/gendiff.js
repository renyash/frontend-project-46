#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse();
