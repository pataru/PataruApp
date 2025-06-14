package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pataru/backend/configs"
	"github.com/pataru/backend/routes"
)

func main() {
	configs.ConnectDB()

	app := fiber.New()

	routes.LoginRoute(app)
	routes.RegisterRoute(app)

	app.Listen(":3000")
}
