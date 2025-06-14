package repositories

import (
	"github.com/google/uuid"
	"github.com/pataru/backend/models"
	"gorm.io/gorm"
)

// contract
type UserRepository interface {
	FindAll() ([]models.MST_USERS, error)
	FindById(id uuid.UUID) (models.MST_USERS, error)
	FindByUserName(userName string) (models.MST_USERS, error)
	Create(user models.MST_USERS) error
	Update(userId uuid.UUID, user models.MST_USERS) error
	Delete(id uuid.UUID) error
}


// struct fields
type userRepository struct {
	db *gorm.DB
}

// constructor 
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

// FindAll retrieve all user from the database.
func (repo *userRepository) FindAll() ([]models.MST_USERS, error) {
	var users []models.MST_USERS
	err := repo.db.Preload("Role").Find(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

// FindById retrieves a user from the database by the given id.
func (repo *userRepository) FindById(userId uuid.UUID) (models.MST_USERS, error) {
	var user models.MST_USERS
	err := repo.db.Preload("Role").First(&user, "user_id = ?", userId).Error
	if err != nil {
		return models.MST_USERS{}, err
	}
	return user, nil
} 

// FindByUserName retrieves a user from the database by the given username.
func (repo *userRepository) FindByUserName(userName string) (models.MST_USERS, error) {
	var user models.MST_USERS
	err := repo.db.Preload("Role").First(&user, "user_name = ?", userName).Error
	if err != nil {
		return models.MST_USERS{}, err
	}
	return user, nil
}

// Create creates a new user in the database.
func (repo *userRepository) Create(user models.MST_USERS) error {
	return repo.db.Create(&user).Error
}

// Update updates an existing user in the database.
func (repo *userRepository) Update(userId uuid.UUID, user models.MST_USERS) error {
	return repo.db.Model(&models.MST_USERS{}).
		Where("id = ?", userId).
		Updates(user).Error
}

// Delete deletes a user from the database by the given id.
func (repo *userRepository) Delete(userId uuid.UUID) error {
	where := map[string]interface{}{
		"delete_status": 0,
		"active_status": 0,
	}

	return repo.db.Model(&models.MST_USERS{}).
		Where("id = ?", userId).
		Updates(where).Error
}