func canBeValid(s string, locked string) bool {
	if len(s)%2 == 1 {
		return false
	}
	minimum, maximum := 0, 0
	for index := 0; index < len(s); index++ {
		if locked[index] == '0' {
			minimum--
			maximum++
		} else if s[index] == '(' {
			minimum++
			maximum++
		} else {
			minimum--
			maximum--
		}
		if maximum < 0 {
			return false
		}
		if minimum < 0 {
			minimum = 0
		}
	}
	return minimum == 0
}
