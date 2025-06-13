package models

import (
	"time"

	"github.com/google/uuid"
)

type MST_USERS struct {
	User_Id       uuid.UUID `gorm:"type:uuid;primaryKey"`
	Name          string    `gorm:"type:varchar(30)"`
	User_Name     string    `json:"userName" gorm:"type:varchar(30);unique"`
	Password      string    `gorm:"type:varchar(100)"`
	Phone_Number  string    `json:"phoneNumber" gorm:"type:varchar(15);unique"`
	Image         string    `gorm:"type:varchar(100)"`
	Role_Id       uuid.UUID
	Role          MST_ROLES
	Active_Status int       `json:"activeStatus" gorm:"type:integer"`
	Delete_Status int       `json:"deleteStatus" gorm:"type:integer"`
	Created_By    string    `json:"createdBy" gorm:"type:varchar(100)"`
	Created_Date  time.Time `json:"createdDate"`
	Updated_By    string    `json:"updatedBy"`
	Updated_Date  time.Time `json:"updatedAt"`
}
