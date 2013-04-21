MOCHA_OPTS= --check-leaks
REPORTER = spec

NODE_ENV=test sequelize -m

check:test

test:before test-unit

before:
	@NODE_ENV=test ./node_modules/.bin/sequelize -m

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha -t 60000 \
		--reporter $(REPORTER) \
		-- bail \
		test/*
	

clean:

.PHONY: test

