import "fmt"

// Enumeration per the hint: try every one of the 12 * 60 legal times in
// ascending order and keep the last pattern match; that last match is the
// latest obtainable time.
func findLatestTime(s string) string {
	matches := func(candidate string) bool {
		for i := 0; i < 5; i++ {
			if s[i] != '?' && s[i] != candidate[i] {
				return false
			}
		}
		return true
	}
	best := ""
	for hh := 0; hh < 12; hh++ {
		for mm := 0; mm < 60; mm++ {
			candidate := fmt.Sprintf("%02d:%02d", hh, mm)
			if matches(candidate) {
				best = candidate
			}
		}
	}
	return best
}
