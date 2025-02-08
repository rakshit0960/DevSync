package main

import (
	"log"

	ws "github.com/devsync/collaboration-service/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	fiberWs "github.com/gofiber/websocket/v2"
)

func main() {
	app := fiber.New()

	// Middleware
	app.Use(logger.New())

	// WebSocket upgrade route
	app.Use("/ws", func(c *fiber.Ctx) error {
		if fiberWs.IsWebSocketUpgrade(c) {
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	// WebSocket handler
	app.Get("/ws", fiberWs.New(ws.HandleConnection))

	log.Fatal(app.Listen(":6000"))
}
