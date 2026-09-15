import (
	"strconv"
	"strings"
)

func maxSumOfSquares(num int, sum int) string {
	// Even nine in every position falls short: no good integer exists.
	if sum > 9*num {
		return ""
	}
	// The optimal digits are forced — floor(sum / 9) nines plus at most
	// one leftover r — and descending order is the largest arrangement,
	// so lay them out from the left and pad with zeros.
	q, r := sum/9, sum%9
	head := strings.Repeat("9", q)
	if r > 0 {
		head += strconv.Itoa(r)
	}
	return head + strings.Repeat("0", num-len(head))
}
