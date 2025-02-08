package websocket

import (
	"log"

	"github.com/gofiber/websocket/v2"
)

func HandleConnection(c *websocket.Conn) {
	defer c.Close()

	for {
		msgType, msg, err := c.ReadMessage()
		if err != nil {
			log.Println("Read error:", err)
			break
		}
		log.Printf("Received: %s\n", msg)
		c.WriteMessage(msgType, msg)
	}
}
