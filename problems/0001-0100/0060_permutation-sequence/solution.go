import (
	"strconv"
	"strings"
)

func getPermutation(n int, k int) string {
	// Digits stay sorted, so the index computed below is the position of
	// the chosen digit among the digits still available.
	digits := make([]int, 0, n)
	for value := 1; value <= n; value++ {
		digits = append(digits, value)
	}
	// factorials[block] = block! — the size of one block at a position
	// with `block` positions still unfilled after it. 9! fits in 32 bits,
	// but the ranks ride in int64 so nothing narrows on the way.
	factorials := make([]int64, n+1)
	factorials[0] = 1
	for value := 1; value <= n; value++ {
		factorials[value] = factorials[value-1] * int64(value)
	}
	rank := int64(k - 1)
	var result strings.Builder
	for block := n - 1; block >= 0; block-- {
		// Quotient picks the digit, remainder is the rank inside its block.
		index := rank / factorials[block]
		rank %= factorials[block]
		result.WriteString(strconv.Itoa(digits[index]))
		digits = append(digits[:index], digits[index+1:]...)
	}
	return result.String()
}
