func countAsterisks(s string) int {
	count := 0
	inside := false
	for _, ch := range s {
		if ch == '|' {
			inside = !inside
		} else if !inside && ch == '*' {
			count++
		}
	}
	return count
}
