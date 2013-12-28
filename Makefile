#!/bin/bash
ROOT=$(CURDIR)
APP=$(ROOT)/app

MOCHA=./node_modules/.bin/mocha
_MOCHA=./node_modules/.bin/_mocha
ISTANBUL=./node_modules/.bin/istanbul
THRESHOLD=80

DOCKER_SUPERVISOR_HOOK=/etc/supervisor/conf.d/hook.d
DOCKER_SUPERVISOR=9001
DOCKER_SSH=22

DB=$(ROOT)/docker/database
DB_VERSION=`cat $(DB)/TAG`
DB_REPO=`cat $(DB)/REPOSITORY`
DB_TAG=$(DB_REPO):$(DB_VERSION)
DB_APP=$(DB_REPO):latest
DB_DIR=/opt/app
DB_NAME=blog-database
DB_PORT=3000
DB_HOST_PORT=$(DB_PORT)
DB_HOST_SUPERVISOR=9006
DB_HOST_SSH:40026

install-database:
	@cd $(DB) \
	&& cp $(HOME)/.ssh/id_rsa.pub ./ \
	&& docker build \
		-t $(DB_TAG) \
		. \
	&& docker tag $(DB_TAG) $(DB_APP) \
	&& rm ./id_rsa.pub

start-database:
	@docker run \
		-d \
		-t \
		-v $(APP)/db:$(DB_DIR)/db \
		-v $(ROOT)/bin:$(DB_DIR)/bin \
		-v $(ROOT)/log:$(DB_DIR)/log \
		-v $(ROOT)/supervisor/database:$(DOCKER_SUPERVISOR_HOOK) \
		-p $(DB_HOST_PORT):$(DB_PORT) \
		-p $(DB_HOST_SUPERVISOR):$(DOCKER_SUPERVISOR) \
		-p $(DB_HOST_SSH):$(DOCKER_SSH) \
		-w $(DB_DIR) \
		-name $(DB_NAME) \
		$(DB_APP)

stop-database:
	@docker kill $(DB_NAME)
	@docker rm $(DB_NAME)

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
