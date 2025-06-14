package dto

import "github.com/google/uuid"

type RegisterUserRequest struct {
	Name        string    `form:"name"`
	UserName    string    `form:"userName"`
	Password    string    `form:"password"`
	PhoneNumber string    `form:"phoneNumber"`
	RoleId      uuid.UUID `form:"roleId"`
}
