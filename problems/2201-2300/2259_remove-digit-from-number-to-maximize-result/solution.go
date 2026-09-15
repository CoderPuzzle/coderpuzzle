func removeDigit(number string, digit string) string {
	best := ""
	for i := 0; i < len(number); i++ {
		if string(number[i]) == digit {
			candidate := number[:i] + number[i+1:]
			if best == "" || candidate > best {
				best = candidate
			}
		}
	}
	return best
}
