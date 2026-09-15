import "strconv"

func minOperations(nums []int) []int {
	// The definition, read literally: widen the offset d = 0, 1, 2, ...
	// and stop at the first d where either neighbor is a binary
	// palindrome; that first hit costs exactly d operations and no
	// palindrome can be closer.
	palindrome := func(value int) bool {
		bits := strconv.FormatUint(uint64(value), 2)
		for left, right := 0, len(bits)-1; left < right; left, right = left+1, right-1 {
			if bits[left] != bits[right] {
				return false
			}
		}
		return true
	}
	distance := func(value int) int {
		for d := 0; ; d++ {
			// the down side floors at 1: values below have no binary form
			// without leading zeros
			if value-d >= 1 && palindrome(value-d) {
				return d
			}
			if palindrome(value + d) {
				return d
			}
		}
	}
	answer := make([]int, len(nums))
	for i, v := range nums {
		answer[i] = distance(v)
	}
	return answer
}
