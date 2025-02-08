package routes

import (
	"time"

	"github.com/devsync/project-service/config"
	"github.com/devsync/project-service/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

// Create Project
func CreateProject(c *fiber.Ctx) error {
	type Request struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	newProject := models.Project{
		ID:          uuid.New().String(),
		Name:        req.Name,
		Description: req.Description,
		CreatedAt:   time.Now(),
	}

	query := `INSERT INTO projects (id, name, description, created_at) VALUES ($1, $2, $3, $4)`
	_, err := config.DB.Exec(nil, query, newProject.ID, newProject.Name, newProject.Description, newProject.CreatedAt)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create project"})
	}

	return c.Status(fiber.StatusCreated).JSON(newProject)
}

// Get Projects
func GetProjects(c *fiber.Ctx) error {
	rows, err := config.DB.Query(nil, "SELECT id, name, description, created_at FROM projects")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch projects"})
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.CreatedAt)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to parse project data"})
		}
		projects = append(projects, p)
	}

	return c.JSON(projects)
}

// Get Single Project
func GetProject(c *fiber.Ctx) error {
	id := c.Params("id")
	var project models.Project
	err := config.DB.QueryRow(nil, "SELECT id, name, description, created_at FROM projects WHERE id = $1", id).
		Scan(&project.ID, &project.Name, &project.Description, &project.CreatedAt)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Project not found"})
	}

	return c.JSON(project)
}

// Delete Project
func DeleteProject(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := config.DB.Exec(nil, "DELETE FROM projects WHERE id = $1", id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete project"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Project deleted"})
}
