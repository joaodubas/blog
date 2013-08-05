#!/bin/bash

MOCHA=./node_modules/.bin/mocha
_MOCHA=./node_modules/.bin/_mocha
ISTANBUL=./node_modules/.bin/istanbul
THRESHOLD=80
TESTDB=./testdb

coverage:
	@$(ISTANBUL) cover $(_MOCHA)
	@$(MAKE) clean

check-coverage:
	@$(ISTANBUL) check-coverage  \
		--statements $(THRESHOLD) \
		--branches $(THRESHOLD) \
		--lines $(THRESHOLD) \
		--functions $(THRESHOLD)

test:
	@$(MOCHA) --reporter dot
	@$(MAKE) clean

clean:
	@rm -rf $(TESTDB)

.PHONY: test coverage check-coverage clean