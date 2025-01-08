package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/username/project-name/internal/config"
	"github.com/username/project-name/internal/handlers"
)

func main() {
	// Inisialisasi koneksi database
	config.ConnectDB()

	r := gin.Default()

	// Konfigurasi CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:3001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	// Route dasar
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	// Route user
	api := r.Group("/api")
	{
		api.POST("/users", handlers.CreateUser)
		api.GET("/users", handlers.GetUsers)
	}

	log.Fatal(r.Run(":8081"))
}
