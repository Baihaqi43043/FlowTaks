package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Ganti URI sesuai dengan konfigurasi MongoDB Anda
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Cek koneksi
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	DB = client.Database("mydatabase")
	log.Println("Terhubung ke MongoDB!")
}
