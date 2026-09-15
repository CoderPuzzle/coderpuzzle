import (
	"strconv"
	"strings"
)

// 10^9 fits in 30 bits, so every i in [1, n] has a short binary form;
// checking each one as a substring of s directly answers the question.
func queryString(s string, n int) bool {
	for i := 1; i <= n; i++ {
		bin := strconv.FormatInt(int64(i), 2)
		if !strings.Contains(s, bin) {
			return false
		}
	}
	return true
}
