EXEC_PHP        = php -d memory_limit=-1
CONSOLE         = $(EXEC_PHP) bin/console
COMPOSER        = composer
SYMFONY         = symfony

##
##Dev
##-------------

dev: ## Start symfony dev server
	docker-compose up -d
	$(SYMFONY) server:start --port=8092

# DEFAULT
.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help

##
