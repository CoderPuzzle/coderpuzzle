func reformat(s string) string {
	letters := make([]byte, 0, len(s))
	digits := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		if s[i] >= '0' && s[i] <= '9' {
			digits = append(digits, s[i])
		} else {
			letters = append(letters, s[i])
		}
	}
	diff := len(letters) - len(digits)
	if diff > 1 || diff < -1 {
		return ""
	}
	first, second := letters, digits
	if diff < 0 {
		first, second = digits, letters
	}
	result := make([]byte, 0, len(s))
	for i := 0; i < len(first); i++ {
		result = append(result, first[i])
		if i < len(second) {
			result = append(result, second[i])
		}
	}
	return string(result)
}
