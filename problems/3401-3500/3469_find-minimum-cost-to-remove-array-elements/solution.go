func minCost(nums []int) int64 {
	// Every operation removes two of the three frontmost elements, so
	// what remains is always an untouched suffix plus at most one
	// element left behind in front of it. Row j holds, at index c + 1,
	// the cheapest finish when nums[c] is that leftover (index 0 =
	// no leftover); computing row j reads only rows j + 2 and j + 3,
	// so a three-row ring bounds the table at O(n) memory. Costs sum
	// to at most 5 * 10^8, which fits int64 with room to spare.
	n := len(nums)
	if n < 3 {
		return int64(max(nums[0], nums[n-1]))
	}

	rowN := make([]int64, n+1)
	for c := 0; c < n; c++ {
		rowN[c+1] = int64(nums[c])
	}
	rowNm1 := make([]int64, n)
	rowNm1[0] = int64(nums[n-1])
	for c := 0; c < n-1; c++ {
		rowNm1[c+1] = int64(max(nums[c], nums[n-1]))
	}
	rowNm2 := make([]int64, n-1)
	rowNm2[0] = int64(max(nums[n-2], nums[n-1]))
	for c := 0; c < n-2; c++ {
		a, b, d := int64(nums[c]), int64(nums[n-2]), int64(nums[n-1])
		rowNm2[c+1] = min(min(max(a, b)+d, max(a, d)+b), max(b, d)+a)
	}

	ring := [][]int64{rowNm2, rowNm1, rowN}
	for j := n - 3; j >= 0; j-- {
		r2 := ring[1]
		r3 := ring[2]
		a, b := int64(nums[j]), int64(nums[j+1])
		pair := max(a, b)
		// No leftover: nums[j], nums[j+1], nums[j+2] meet one
		// operation and the survivor becomes the next leftover.
		row := make([]int64, j+1)
		row[0] = min(
			min(max(b, int64(nums[j+2]))+r3[j+1], max(a, int64(nums[j+2]))+r3[j+2]),
			pair+r3[j+3],
		)
		// With leftover nums[c]: the front three are nums[c], a, b.
		k1 := r2[j+2]
		k2 := r2[j+1]
		for c := 0; c < j; c++ {
			v := int64(nums[c])
			row[c+1] = min(min(max(v, a)+k1, max(v, b)+k2), pair+r2[c+1])
		}
		ring[2] = ring[1]
		ring[1] = ring[0]
		ring[0] = row
	}
	return ring[0][0]
}
