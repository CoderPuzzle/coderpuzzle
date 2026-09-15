import "math"

func countTriples(n int) int {
	// Each ordered pair (a, b) contributes one triple iff a^2 + b^2 is a
	// perfect square c^2 with c <= n. Rounding sqrt and re-squaring keeps
	// the check on the integer side, immune to float drift.
	count := 0
	for a := 1; a <= n; a++ {
		for b := 1; b <= n; b++ {
			s := a*a + b*b
			r := int(math.Sqrt(float64(s)) + 0.5)
			if r <= n && r*r == s {
				count++
			}
		}
	}
	return count
}
