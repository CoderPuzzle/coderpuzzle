import "math/bits"

// XOR never creates or destroys parity: every bit position of the result
// holds the mod-2 sum of the operands' bits there, so a triplet's XOR has
// an even number of set bits exactly when an even number of its operands —
// zero or two — carries an odd popcount.
func tripletCount(a []int, b []int, c []int) int {
	arrays := [][]int{a, b, c}
	evens := [3]int{}
	odds := [3]int{}
	for i := 0; i < 3; i++ {
		for _, x := range arrays[i] {
			if bits.OnesCount(uint(x))%2 == 0 {
				evens[i]++
			} else {
				odds[i]++
			}
		}
	}
	return evens[0]*evens[1]*evens[2] +
		odds[0]*odds[1]*evens[2] +
		odds[0]*evens[1]*odds[2] +
		evens[0]*odds[1]*odds[2]
}
