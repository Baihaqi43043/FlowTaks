package main

import (
	"log"

	"flowtaks/internal/config"
	"flowtaks/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Inisialisasi koneksi database
	if err := config.ConnectDB(); err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}
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

	// Auth routes
	api := r.Group("/api")
	{
		api.POST("/register", handlers.Register)
		api.POST("/login", handlers.Login)
		api.POST("/users", handlers.CreateUser)
		api.GET("/users", handlers.GetUsers)
	}

	log.Fatal(r.Run(":8081"))
}
