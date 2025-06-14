package dto

import "github.com/google/uuid"

type LoginResponse struct {
	UserId   uuid.UUID `json:"userId"`
	UserName string    `json:"userName"`
	Token    string    `json:"token"`
	RoleName string    `json:"roleName"`
}
