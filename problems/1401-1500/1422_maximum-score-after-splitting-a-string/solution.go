func maxScore(s string) int {
	zerosLeft := 0
	onesRight := 0
	for i := 0; i < len(s); i++ {
		if s[i] == '1' {
			onesRight++
		}
	}
	best := -1
	for i := 0; i < len(s)-1; i++ {
		if s[i] == '0' {
			zerosLeft++
		} else {
			onesRight--
		}
		if score := zerosLeft + onesRight; score > best {
			best = score
		}
	}
	return best
}
