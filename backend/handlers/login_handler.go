package handlers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/pataru/backend/dto"
	"github.com/pataru/backend/enums"
	"github.com/pataru/backend/services"
	"github.com/pataru/backend/utils"
)

type LoginHandler struct {
	service services.UserService
}

func NewLoginHandler(service services.UserService) *LoginHandler {
	return &LoginHandler{service}
}

func (handler *LoginHandler) LoginUser(c *fiber.Ctx) error {
	var req dto.LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return utils.RespondError[[]string](c, err, enums.INVALID_REQUEST_BODY)
	}

	user, err := handler.service.GetUserByUserName(req.UserName)

	if err != nil {
		return utils.RespondError[[]string](c, err, enums.INVALID_USERNAME_OR_PASSWORD)
	}

	if !utils.CheckPassword(req.Password, user.Password) {
		fmt.Println(utils.CheckPassword(req.Password, user.Password))
		return utils.RespondError[[]string](c, err, enums.INVALID_USERNAME_OR_PASSWORD)
	}

	token, err := utils.GenerateJWT(user.User_Id.String())
	if err != nil {
		return utils.RespondError[[]string](c, err, enums.FAILED_TO_GENERATE_TOKEN)
	}

	response := dto.LoginResponse{
		UserId:   user.User_Id,
		UserName: user.User_Name,
		Token:    token,
		RoleName: user.Role.Role_Name,
	}

	return utils.RespondSuccess[dto.LoginResponse](c, response)
}
