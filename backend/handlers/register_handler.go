package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/pataru/backend/dto"
	"github.com/pataru/backend/enums"
	"github.com/pataru/backend/models"
	"github.com/pataru/backend/services"
	"github.com/pataru/backend/utils"
)


type RegisterHandler struct {
	service services.UserService
}

func NewRegisterHandler(service services.UserService) *RegisterHandler {
	return &RegisterHandler{service}
}

func (handler *RegisterHandler) RegisterUser(c *fiber.Ctx) error {
	var user models.MST_USERS
	var request dto.RegisterUserRequest
	err := c.BodyParser(&request)
	if err != nil {
		return utils.RespondError[models.MST_USERS](c, err, enums.INVALID_REQUEST_BODY)
	}

	// create user
	hashedPassword, _ := utils.HashPassword(request.Password)
	uuid, _ := uuid.NewUUID()
	user = models.MST_USERS{
		User_Id:      uuid,
		Name:         request.Name,
		User_Name:    request.UserName,
		Password:     string(hashedPassword),
		Phone_Number: request.PhoneNumber,
		Role_Id:      request.RoleId,
		Active_Status: 1,
	}

	if err := handler.service.CreateUser(user); err != nil {
		return utils.RespondError[models.MST_USERS](c, err, enums.FAILED_TO_CREATE_USER)
	}

	return utils.RespondSuccess[enums.Notification](c, enums.USER_REGISTERED_SUCCESSFULLY)
}