install:
	npm ci

publish: #Publish
	npm publish --dry-run

lint:
	npx eslint .

build:
	npm run build
