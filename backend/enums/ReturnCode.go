package enums

type Notification struct {
	Code       int
	Message    string
	HTTPStatus int
}

var (
	FAILED_TO_CONNECT_TO_DATABASE = Notification{Code: 2001, Message: "Failed to connect to database", HTTPStatus: 500}
	FAILED_TO_GET_USERS           = Notification{Code: 2002, Message: "Failed to get users", HTTPStatus: 500}
	USER_NOT_FOUND                = Notification{Code: 2003, Message: "User not found", HTTPStatus: 404}
	INVALID_REQUEST_BODY          = Notification{Code: 2004, Message: "Invalid request body", HTTPStatus: 400}
	FAILED_TO_CREATE_USER         = Notification{Code: 2005, Message: "Failed to create user", HTTPStatus: 500}
	FAILED_TO_UPDATE_USER         = Notification{Code: 2006, Message: "Failed to update user", HTTPStatus: 500}
	FAILED_TO_DELETE_USER         = Notification{Code: 2007, Message: "Failed to delete user", HTTPStatus: 500}
	USER_REGISTERED_SUCCESSFULLY  = Notification{Code: 2008, Message: "User registered successfully", HTTPStatus: 201}
	INVALID_USERNAME_OR_PASSWORD  = Notification{Code: 2009, Message: "Invalid username or password", HTTPStatus: 401}
	FAILED_TO_GENERATE_TOKEN      = Notification{Code: 2010, Message: "Failed to generate token", HTTPStatus: 500}
)
