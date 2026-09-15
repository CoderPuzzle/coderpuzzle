// Two prefixes pin a window down: a repeated prefix XOR cancels the shared
// head (the window's own XOR is 0), and a repeated parity gap (evens minus
// odds so far) means the window's even and odd counts tie. Matching pairs
// therefore bracket a balanced, zero-XOR subarray, and the earliest
// occurrence of each pair maximizes the length read off it.
//
// The pair packs into one int64 key: pxor < 2^30 and gap + n lies in
// [0, 2n], so pxor * (2n + 1) + (gap + n) fits far below 2^63.
func maxBalancedSubarray(nums []int) int {
	n := len(nums)
	width := int64(2*n + 1)
	first := make(map[int64]int, n+1)
	first[int64(n)] = -1
	pxor := 0
	gap := 0
	best := 0
	for i, value := range nums {
		pxor ^= value
		if value%2 == 0 {
			gap++
		} else {
			gap--
		}
		key := int64(pxor)*width + int64(gap+n)
		j, ok := first[key]
		if !ok {
			first[key] = i
		} else if i-j > best {
			best = i - j
		}
	}
	return best
}
