package main

import (
	"log"

	"github.com/devsync/project-service/config"
	"github.com/devsync/project-service/routes"
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
		return c.JSON(fiber.Map{"message": "Project Service Running"})
	})

	app.Post("/projects", routes.CreateProject)
	app.Get("/projects", routes.GetProjects)
	app.Get("/projects/:id", routes.GetProject)
	app.Delete("/projects/:id", routes.DeleteProject)

	log.Fatal(app.Listen(":7000"))
}
