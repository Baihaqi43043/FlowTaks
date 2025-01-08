.PHONY: run-backend run-frontend install-frontend

run-backend:
	cd backend && go run cmd/main.go

run-frontend:
	cd frontend && npm start

install-frontend:
	cd frontend && npm install

.DEFAULT_GOAL := help
help:
	@echo "Available commands:"
	@echo "make run-backend    - Menjalankan backend server"
	@echo "make run-frontend   - Menjalankan frontend development server"
	@echo "make install-frontend - Menginstall dependencies frontend" 