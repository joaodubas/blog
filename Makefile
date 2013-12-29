#!/bin/bash
ROOT=$(CURDIR)
APP=$(ROOT)/app

DOCKER_SUPERVISOR_HOOK=/etc/supervisor/conf.d/hook.d
DOCKER_SUPERVISOR=9001
DOCKER_SSH=22

SERVER=$(ROOT)/docker/server
SERVER_VERSION=`cat $(SERVER)/TAG`
SERVER_REPO=`cat $(SERVER)/REPOSITORY`
SERVER_TAG=$(SERVER_REPO):$(SERVER_VERSION)
SERVER_APP=$(SERVER_REPO):latest
SERVER_DIR=/opt/app
SERVER_NAME=blog-server
SERVER_PORT=16152
SERVER_HOST_PORT=$(SERVER_PORT)
SERVER_HOST_SUPERVISOR=9005
SERVER_HOST_SSH=40025

MOCHA=$(SERVER_DIR)/node_modules/.bin/mocha
_MOCHA=$(SERVER_DIR)/node_modules/.bin/_mocha
ISTANBUL=$(SERVER_DIR)/node_modules/.bin/istanbul
THRESHOLD=80

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
DB_HOST_SSH=40026

install-server:
	@cd $(SERVER) \
	&& cp $(HOME)/.ssh/id_rsa.pub ./ \
	&& docker build \
		-t $(SERVER_TAG) \
		. \
	&& docker tag $(SERVER_TAG) $(SERVER_APP) \
	&& rm ./id_rsa.pub

install-database:
	@cd $(DB) \
	&& cp $(HOME)/.ssh/id_rsa.pub ./ \
	&& docker build \
		-t $(DB_TAG) \
		. \
	&& docker tag $(DB_TAG) $(DB_APP) \
	&& rm ./id_rsa.pub

install-docker: install-server install-database

install-back:
	@docker run \
		-i \
		-t \
		-entrypoint /usr/local/bin/npm \
		-w $(SERVER_DIR) \
		-v $(ROOT):$(SERVER_DIR) \
		$(SERVER_APP) \
		install $(ARGS)

install-front:
	@docker run \
		-i \
		-t \
		-entrypoint $(SERVER_APP)/node_modules/.bin/bower \
		-w $(SERVER_DIR) \
		-v $(ROOT):$(SERVER_DIR) \
		$(SERVER_APP) \
		install $(ARGS)

install: install-docker install-back install-front

start-server: start-database
	@docker run \
		-d \
		-t \
		-v $(ROOT):$(SERVER_DIR) \
		-v $(ROOT)/supervisor/server:$(DOCKER_SUPERVISOR_HOOK) \
		-w $(SERVER_DIR) \
		-p $(SERVER_HOST_PORT):$(SERVER_PORT) \
		-p $(SERVER_HOST_SUPERVISOR):$(DOCKER_SUPERVISOR) \
		-p $(SERVER_HOST_SSH):$(DOCKER_SSH) \
		-link $(DB_NAME):database \
		-name $(SERVER_NAME) \
		$(SERVER_APP)

stop-server: stop-database
	@docker kill $(SERVER_NAME)
	@docker rm $(SERVER_NAME)

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

start: start-server

stop: stop-server

shell: start-database
	@docker run \
		-i \
		-t \
		-entrypoint /usr/local/bin/node \
		-w $(SERVER_DIR) \
		-v $(ROOT):$(SERVER_DIR) \
		-link $(DB_NAME):database \
		$(SERVER_APP) \
		--harmony

coverage: clean-coverage
	@cd $(APP)
	@$(ISTANBUL) cover $(_MOCHA)
	@$(MAKE) clean-testdb

check-coverage: coverage
	@cd $(APP)
	@$(ISTANBUL) check-coverage  \
		--statements $(THRESHOLD) \
		--branches $(THRESHOLD) \
		--lines $(THRESHOLD) \
		--functions $(THRESHOLD)

test:
	@$(MOCHA) --reporter dot
	@$(MAKE) clean-testdb

clean-testdb:
	@rm -rf $(APP)/testdb

clean-coverage:
	@rm -rf $(APP)/coverage

clean: clean-testdb clean-coverage

.PHONY: start-server start-database start stop-server stop-database shell test coverage check-coverage clean clean-testdb clean-coverage
