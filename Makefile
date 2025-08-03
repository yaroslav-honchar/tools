DOCKER_COMPOSE_FILE = docker-compose.dev.yml
COMPOSE = docker-compose -f $(DOCKER_COMPOSE_FILE)

.PHONY: help install add add-dev up down restart logs clean

help: ## Show all available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

up:
	pnpm run dev

down:
	pnpm run docker:down

install: ## Install all dependencies locally and restart containers
	@echo "📦 Installing dependencies locally..."
	pnpm install
	@echo "🐳 Restarting containers with new dependencies..."
	$(COMPOSE) restart

add: ## Add dependency (usage: make add SPC=frontend PKG=package-name)
	@if [ -z "$(PKG)" ]; then \
		echo "❌ Please specify package name: make add SPC=frontend PKG=package-name"; \
		exit 1; \
	fi
	@if [ -z "$(SPC)" ]; then \
		echo "❌ Please specify workspace name: make add SPC=frontend PKG=package-name"; \
		exit 1; \
	fi
	@echo "📦 Adding $(PKG) to $(SPC) locally..."
	pnpm add $(PKG) --filter $(SPC)
	@echo "🐳 Installing in $(SPC) container..."
	$(COMPOSE) exec $(SPC) pnpm install
	@echo "✅ Package $(PKG) added to $(SPC)!"
	@echo "🐳 Restarting..."
	$(COMPOSE) restart
