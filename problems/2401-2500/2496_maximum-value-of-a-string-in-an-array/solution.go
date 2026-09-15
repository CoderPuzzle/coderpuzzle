import "strconv"

// Digits-only strings count as their base-10 numeric value; everything
// else counts by length. strconv.Atoi succeeds exactly on the pure-digit
// strings (the alphabet is lowercase letters plus digits, so no sign or
// empty string ever appears) and nine digits stay inside int's range.
func maximumValue(strs []string) int {
	best := 0
	for _, s := range strs {
		value := len(s)
		if v, err := strconv.Atoi(s); err == nil {
			value = v
		}
		if value > best {
			best = value
		}
	}
	return best
}
