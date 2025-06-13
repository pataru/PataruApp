package dto

type APIResponseDTO[T any] struct {
	Success      bool     `json:"success"`
	Errors       []string `json:"errors"`
	ErrorCodes   []string `json:"errorCodes"`
	Data         T        `json:"data"`
	Messages     []string `json:"messages"`
	MessageCodes []string `json:"messageCodes"`
}

func SuccessAPIResponseDTO[T any](data T) APIResponseDTO[T] {
	return APIResponseDTO[T]{
		Success:      true,
		Errors:       make([]string, 0),
		ErrorCodes:   make([]string, 0),
		Messages:     make([]string, 0),
		MessageCodes: make([]string, 0),
		Data:         data,
	}
}

func FailedAPIResponseDTO[T any](errors []string, errorCodes []string, messages []string, messageCodes []string) APIResponseDTO[T] {
	var data T
	return APIResponseDTO[T]{
		Success:      false,
		Errors:       errors,
		ErrorCodes:   errorCodes,
		Messages:     messages,
		MessageCodes: messageCodes,
		Data:         data,
	}
}
