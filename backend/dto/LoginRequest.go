package dto

type LoginRequest struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}
