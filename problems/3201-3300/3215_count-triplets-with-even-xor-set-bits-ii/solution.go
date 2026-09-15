import "math/bits"

// A triplet's XOR has an even number of set bits exactly when an even number
// of the three operands carries an odd popcount: every bit position of the
// XOR holds the mod-2 sum of the operands' bits there, so the XOR preserves
// the parity of the total set-bit count. Counting the even- and odd-parity
// elements of each array leaves four parity classes, and the answer sums the
// three products that pick zero or two odd parities.
func tripletCount(a []int, b []int, c []int) int64 {
	arrays := [][]int{a, b, c}
	even := [3]int{}
	odd := [3]int{}
	for i := range arrays {
		for _, x := range arrays[i] {
			if bits.OnesCount(uint(x))%2 == 0 {
				even[i]++
			} else {
				odd[i]++
			}
		}
	}
	return int64(even[0])*int64(even[1])*int64(even[2]) +
		int64(odd[0])*int64(odd[1])*int64(even[2]) +
		int64(odd[0])*int64(even[1])*int64(odd[2]) +
		int64(even[0])*int64(odd[1])*int64(odd[2])
}
