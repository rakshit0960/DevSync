package config

import (
	"log"
	"os"

	"github.com/jackc/pgx/v5"
)

var DB *pgx.Conn

func ConnectDB() {
	dbUrl := os.Getenv("DATABASE_URL")
	var err error
	DB, err = pgx.Connect(nil, dbUrl)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
}
