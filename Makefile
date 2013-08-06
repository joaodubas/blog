#!/bin/bash

MOCHA=./node_modules/.bin/mocha
_MOCHA=./node_modules/.bin/_mocha
ISTANBUL=./node_modules/.bin/istanbul
THRESHOLD=80

coverage: clean-coverage
	@$(ISTANBUL) cover $(_MOCHA)
	@$(MAKE) clean-testdb

check-coverage: coverage
	@$(ISTANBUL) check-coverage  \
		--statements $(THRESHOLD) \
		--branches $(THRESHOLD) \
		--lines $(THRESHOLD) \
		--functions $(THRESHOLD)

test:
	@$(MOCHA) --reporter dot
	@$(MAKE) clean-testdb

clean-testdb:
	@rm -rf ./testdb

clean-coverage:
	@rm -rf ./coverage

clean: clean-testdb clean-coverage

.PHONY: test coverage check-coverage clean clean-testdb clean-coverage
