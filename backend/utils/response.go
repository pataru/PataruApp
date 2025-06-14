package utils

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/pataru/backend/dto"
	"github.com/pataru/backend/enums"
)

// Success: Generic wrapper
func RespondSuccess[T any](c *fiber.Ctx, data T) error {
	return c.JSON(dto.SuccessAPIResponseDTO[T](data))
}

func RespondError[T any](c *fiber.Ctx, err error, enumError enums.Notification) error {
	var errors []string
	if err != nil {
		errors = append(errors, err.Error())
	} else {
		errors = append(errors, enumError.Message)
	}

	return c.Status(enumError.HTTPStatus).JSON(
		dto.FailedAPIResponseDTO[T](
			errors,
			[]string{strconv.Itoa(enumError.Code)},
			[]string{enumError.Message},
			[]string{},
		),
	)
}
