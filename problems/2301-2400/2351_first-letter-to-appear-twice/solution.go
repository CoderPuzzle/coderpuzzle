func repeatedCharacter(s string) string {
	// The first letter to appear twice is exactly the first letter whose
	// second occurrence shows up, so one left-to-right scan with a seen
	// table ends the moment a repeat is met.
	var seen [26]bool
	for i := 0; i < len(s); i++ {
		index := s[i] - 'a'
		if seen[index] {
			return string(s[i])
		}
		seen[index] = true
	}
	return ""
}
