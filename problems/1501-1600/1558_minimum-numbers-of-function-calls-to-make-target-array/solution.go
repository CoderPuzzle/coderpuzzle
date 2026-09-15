import "math/bits"

func minOperations(nums []int) int {
	// Each element's popcount is the number of independent increments it
	// needs; the doublings are shared by the whole array, so only the
	// element with the most bits sets how many doublings are needed.
	total := 0
	maxBits := 0
	for _, v := range nums {
		total += bits.OnesCount(uint(v))
		b := bits.Len(uint(v))
		if b > maxBits {
			maxBits = b
		}
	}
	extra := maxBits - 1
	if extra < 0 {
		extra = 0
	}
	return total + extra
}
