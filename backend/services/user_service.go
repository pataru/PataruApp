package services

import (
	"github.com/google/uuid"
	"github.com/pataru/backend/models"
	"github.com/pataru/backend/repositories"
)

type UserService interface {
	GetAllUsers() ([]models.MST_USERS, error) 
	GetUserById(userId uuid.UUID) (models.MST_USERS, error) 
	GetUserByUserName(userName string) (models.MST_USERS, error)
	CreateUser(user models.MST_USERS) error
	UpdateUser(userId uuid.UUID, user models.MST_USERS) error
	DeleteUser(userId uuid.UUID) error
}

type userService struct {
	repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) UserService {
	return &userService{repo}
}

// GetAllUsers retrieve all user from the database.
func (service *userService) GetAllUsers() ([]models.MST_USERS, error) {
	return service.repo.FindAll()
}

// GetById retrieves a user from the database by the given id.
func (service *userService) GetUserById(userId uuid.UUID) (models.MST_USERS, error) {
	return service.repo.FindById(userId)
}

func (service *userService) GetUserByUserName(userName string) (models.MST_USERS, error) {
	return service.repo.FindByUserName(userName)
}

// CreateUser creates a new user in the database.
func (service *userService) CreateUser(user models.MST_USERS) error {
	return service.repo.Create(user)
}

// UpdateUser updates an existing user in the database.
func (service *userService) UpdateUser(userId uuid.UUID, user models.MST_USERS) error {
	return service.repo.Update(userId, user)
}

func (service *userService) DeleteUser(userId uuid.UUID) error {
	return service.repo.Delete(userId)
}
