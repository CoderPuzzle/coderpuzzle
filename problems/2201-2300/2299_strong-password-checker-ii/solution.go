import "strings"

func strongPasswordCheckerII(password string) bool {
	if len(password) < 8 {
		return false
	}
	special := "!@#$%^&*()-+"
	hasLower, hasUpper, hasDigit, hasSpecial := false, false, false, false
	for index := 0; index < len(password); index++ {
		current := password[index]
		if index > 0 && current == password[index-1] {
			return false
		}
		if current >= 'a' && current <= 'z' {
			hasLower = true
		} else if current >= 'A' && current <= 'Z' {
			hasUpper = true
		} else if current >= '0' && current <= '9' {
			hasDigit = true
		} else if strings.IndexByte(special, current) >= 0 {
			hasSpecial = true
		}
	}
	return hasLower && hasUpper && hasDigit && hasSpecial
}
