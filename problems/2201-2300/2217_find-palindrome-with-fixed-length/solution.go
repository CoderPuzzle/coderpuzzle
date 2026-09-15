import (
	"math"
	"strconv"
)

// The kth palindrome is the kth half-number mirrored, so each query is one
// string construction; queries past the 9*10^(half-1) supply answer -1.
func kthPalindrome(queries []int, intLength int) []int64 {
	half := (intLength + 1) / 2
	count := 9 * int64(math.Pow10(half-1))
	answer := make([]int64, len(queries))
	for index, query := range queries {
		if int64(query) > count {
			answer[index] = -1
			continue
		}
		prefix := strconv.FormatInt(int64(math.Pow10(half-1))+int64(query)-1, 10)
		digits := []byte(prefix)
		// Mirror the first intLength/2 digits back onto the end.
		for i := intLength/2 - 1; i >= 0; i-- {
			digits = append(digits, prefix[i])
		}
		value, _ := strconv.ParseInt(string(digits), 10, 64)
		answer[index] = value
	}
	return answer
}
