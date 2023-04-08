#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
    .description('Compares two configuration files and shows difference.')
    .version('0.1.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format');

program.parse();