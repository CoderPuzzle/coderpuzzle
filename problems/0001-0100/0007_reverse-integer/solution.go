import "math"

// Reverse by popping digits: peel the last digit of x with a remainder and
// push it onto rev, so no strings and no 64-bit integers are ever involved.
func reverse(x int) int {
	rev := 0
	for x != 0 {
		// Go division truncates toward zero, so the popped digit carries the
		// sign: -123 pops -3, -2, -1 and builds -321.
		pop := x % 10
		x /= 10
		// Clamp before the push, never after: the statement forbids 64-bit
		// slack, so rev*10 + pop must provably stay in range. The edge digits
		// are 7 (math.MaxInt32) and -8 (math.MinInt32).
		if rev > math.MaxInt32/10 || (rev == math.MaxInt32/10 && pop > 7) {
			return 0
		}
		if rev < math.MinInt32/10 || (rev == math.MinInt32/10 && pop < -8) {
			return 0
		}
		rev = rev*10 + pop
	}
	return rev
}
