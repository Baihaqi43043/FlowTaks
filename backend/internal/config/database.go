package config

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return err
	}

	// Ping database untuk memastikan koneksi berhasil
	err = client.Ping(ctx, nil)
	if err != nil {
		return err
	}

	DB = client.Database("flowtaks")
	return nil
}
