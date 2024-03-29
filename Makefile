install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run

.PHONY: test
