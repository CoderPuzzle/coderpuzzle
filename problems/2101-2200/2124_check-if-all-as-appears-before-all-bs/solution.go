func checkString(s string) bool {
	seenB := false
	for _, character := range s {
		if character == 'b' {
			seenB = true
		} else if seenB {
			return false
		}
	}
	return true
}
