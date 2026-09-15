// One map entry per message: the next timestamp it may print at.
type Logger struct {
	nextAllowed map[string]int
}

func NewLoggerTyped() *Logger {
	return &Logger{nextAllowed: make(map[string]int)}
}

func (design *Logger) shouldPrintMessage(timestamp int, message string) bool {
	allowed, printed := design.nextAllowed[message]
	if printed && timestamp < allowed {
		return false
	}
	design.nextAllowed[message] = timestamp + 10
	return true
}
