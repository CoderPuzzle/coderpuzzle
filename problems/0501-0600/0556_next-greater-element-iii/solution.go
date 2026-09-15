import (
	"math"
	"strconv"
)

// Rearranging n's digits, the answer is the immediate successor of n's digit
// string among all rearrangements — the classic next-permutation step. Scan
// from the right for the first digit below its right neighbor (the pivot);
// none means the digits are entirely non-increasing and n is already the
// largest arrangement. The suffix past the pivot is non-increasing, so the
// smallest digit larger than the pivot is the rightmost one that beats it:
// swap the two, then reverse the (still non-increasing) suffix to sort it
// ascending — the smallest tail those digits can form.
func nextGreaterElement(n int) int {
	digits := []byte(strconv.Itoa(n))
	i := len(digits) - 2
	for i >= 0 && digits[i] >= digits[i+1] {
		i--
	}
	if i < 0 {
		return -1
	}
	j := len(digits) - 1
	for digits[j] <= digits[i] {
		j--
	}
	digits[i], digits[j] = digits[j], digits[i]
	for lo, hi := i+1, len(digits)-1; lo < hi; lo, hi = lo+1, hi-1 {
		digits[lo], digits[hi] = digits[hi], digits[lo]
	}
	// n reaches 2³¹ - 1 (ten digits) and the successor can run one digit
	// wider, so the rebuilt value is parsed as an int64 (Go's int is 64 bits
	// on every platform the judge runs, so it already has the headroom) and
	// checked against the 32-bit ceiling before it is returned.
	result, _ := strconv.ParseInt(string(digits), 10, 64)
	if result > math.MaxInt32 {
		return -1
	}
	return int(result)
}
