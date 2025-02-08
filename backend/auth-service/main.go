package main

import (
	"log"

	"github.com/devsync/auth-service/config"
	"github.com/devsync/auth-service/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.ConnectDB()

	app := fiber.New()
	app.Use(logger.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Auth Service Running"})
	})

	app.Post("/login", routes.Login)

	log.Fatal(app.Listen(":5000"))
}
