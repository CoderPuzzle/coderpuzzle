import "sort"

func largestSubmatrix(matrix [][]int) int {
	m := len(matrix)
	if m == 0 {
		return 0
	}
	n := len(matrix[0])
	heights := make([]int, n)
	best := 0
	for _, row := range matrix {
		// heights[j] = run of consecutive ones ending at this row.
		for j := 0; j < n; j++ {
			if row[j] == 1 {
				heights[j]++
			} else {
				heights[j] = 0
			}
		}
		// Columns may be rearranged, so only the multiset of heights
		// matters; reading the ascending copy backwards visits heights in
		// descending order, the (i+1)-th tallest at position i.
		ordered := make([]int, n)
		copy(ordered, heights)
		sort.Ints(ordered)
		// The top i+1 columns all reach height h, and the rearrangement
		// places them side by side — width i+1 is real.
		for i := 0; i < n; i++ {
			h := ordered[n-1-i]
			// Descending order: everything after a zero is zero too.
			if h == 0 {
				break
			}
			area := h * (i + 1)
			if area > best {
				best = area
			}
		}
	}
	return best
}
