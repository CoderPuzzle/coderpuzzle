import (
	"strconv"
	"strings"
)

func areNumbersAscending(s string) bool {
	previous := 0

	for _, token := range strings.Fields(s) {
		if token[0] >= '0' && token[0] <= '9' {
			current, _ := strconv.Atoi(token)
			if current <= previous {
				return false
			}
			previous = current
		}
	}

	return true
}
