package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pataru/backend/configs/clients"
	"github.com/pataru/backend/handlers"
	"github.com/pataru/backend/repositories"
	"github.com/pataru/backend/services"
)

func RegisterRoute(app *fiber.App) {
	userRepository := repositories.NewUserRepository(clients.DATABASE)
	userService := services.NewUserService(userRepository)
	registerHandler := handlers.NewRegisterHandler(userService)

	base := app.Group("/api")

	user := base.Group("/users")
	user.Post("/register", registerHandler.RegisterUser)
}