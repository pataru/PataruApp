package models

import (
	"time"

	"github.com/google/uuid"
)

type MST_ROLES struct {
	Role_Id       uuid.UUID `json:"roleId" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Role_Name     string    `json:"roleName" gorm:"type:varchar(30);unique"`
	Active_Status int       `json:"activeStatus" gorm:"type:integer"`
	Delete_Status int       `json:"deleteStatus" gorm:"type:integer"`
	Created_By    string    `json:"createdBy" gorm:"type:varchar(100)"`
	Created_Date  time.Time `json:"createdDate"`
	Updated_By    string    `json:"updatedBy"`
	Updated_Date  time.Time `json:"updatedAt"`
}
