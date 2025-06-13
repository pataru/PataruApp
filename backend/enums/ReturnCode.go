package enums

type Notification struct {
	Code    int
	Message string
}

var (
	FAILED_TO_CONNECT_TO_DATABASE = Notification{Code: 2001, Message: "Failed to connect to database"}
)
