func isCovered(ranges [][]int, left int, right int) bool {
	// +1 at start, -1 past end, running sum > 0 means covered.
	diff := make([]int, 52)
	for _, r := range ranges {
		diff[r[0]]++
		diff[r[1]+1]--
	}
	cover := make([]bool, 51)
	cur := 0
	for x := 1; x <= 50; x++ {
		cur += diff[x]
		cover[x] = cur > 0
	}
	for x := left; x <= right; x++ {
		if !cover[x] {
			return false
		}
	}
	return true
}
