package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pataru/backend/dto"
	"github.com/pataru/backend/enums"
	"github.com/pataru/backend/models"
	"github.com/pataru/backend/services"
	"github.com/pataru/backend/utils"
)

type UserHandler struct {
	service services.UserService
}

func NewUserHandler(service services.UserService) *UserHandler {
	return &UserHandler{service}
}

func (handler *UserHandler) GetAllUsers(c *fiber.Ctx) error {
	users, err := handler.service.GetAllUsers()
	if err != nil {
		return utils.RespondError[[]models.MST_USERS](c, err, enums.FAILED_TO_CONNECT_TO_DATABASE)
	}
	return utils.RespondSuccess[[]models.MST_USERS](c, users)
}

func (handler *UserHandler) GetUserById(c *fiber.Ctx) error {
	var req dto.GetUserRequest
	if err := c.BodyParser(&req); err != nil {
		return utils.RespondError[models.MST_USERS](c, err, enums.INVALID_REQUEST_BODY)
	}

	user, err := handler.service.GetUserById(req.UserID)
	if err != nil {
		return utils.RespondError[models.MST_USERS](c, err, enums.USER_NOT_FOUND)
	}

	return utils.RespondSuccess[models.MST_USERS](c, user)
}

