import (
	"strconv"
	"strings"
)

func closestFair(n int) int {
	// A fair integer needs an even digit count with half of the digits odd.
	// When the digit count is odd no fair integer exists with that many
	// digits, so the answer is the smallest fair number with one more digit:
	// a leading 1, then half zeros and half-1 ones (balanced by construction
	// and minimal).
	digits := len(strconv.Itoa(n))
	if digits%2 == 1 {
		half := (digits + 1) / 2
		build := "1" + strings.Repeat("0", half) + strings.Repeat("1", half-1)
		v, _ := strconv.Atoi(build)
		return v
	}
	limit := 1
	for i := 0; i < digits; i++ {
		limit *= 10
	}
	// Even digit count: the next fair integer is close, so scan upward.
	for k := n; k < limit; k++ {
		if isFair(k) {
			return k
		}
	}
	half := (digits + 2) / 2
	build := "1" + strings.Repeat("0", half) + strings.Repeat("1", half-1)
	v, _ := strconv.Atoi(build)
	return v
}

func isFair(x int) bool {
	odd, length := 0, 0
	for x > 0 {
		if x%10%2 == 1 {
			odd++
		}
		length++
		x /= 10
	}
	return length%2 == 0 && odd*2 == length
}
