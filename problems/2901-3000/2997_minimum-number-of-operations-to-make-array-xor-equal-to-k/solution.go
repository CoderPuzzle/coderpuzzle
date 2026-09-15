import "math/bits"

// Flipping one bit of any element toggles exactly that bit of the
// array-wide XOR, so one operation changes the XOR's Hamming distance to k
// by exactly one: fold nums into a single XOR and count the bits where it
// differs from k.
func minOperations(nums []int, k int) int {
	xorAll := 0
	for _, v := range nums {
		xorAll ^= v
	}
	return bits.OnesCount(uint(xorAll ^ k))
}
