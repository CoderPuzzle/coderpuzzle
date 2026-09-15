// Bounds: n, m <= 100 and |values| <= 10^6, so each product is at most 10^12
// and the k <= 100-term total at most 10^14 — everything lives comfortably
// in an int64.
func maxScore(nums1 []int, nums2 []int, k int) int64 {
	n := len(nums1)
	m := len(nums2)
	// dp layer t over prefix lengths (a, b): the best score of exactly t
	// pairs inside nums1[:a] x nums2[:b]. Layer 0 is identically 0, and
	// layer t only has feasible cells at a >= t, b >= t (fewer than t
	// elements cannot host t pairs); every prev[a-1][b-1] read at such a
	// cell lies inside layer t-1's feasible rectangle, so no sentinel is
	// ever needed.
	prev := make([][]int64, n+1)
	cur := make([][]int64, n+1)
	for a := 0; a <= n; a++ {
		prev[a] = make([]int64, m+1)
		cur[a] = make([]int64, m+1)
	}
	for t := 1; t <= k; t++ {
		for a := t; a <= n; a++ {
			row, up, prow := cur[a], cur[a-1], prev[a-1]
			x := int64(nums1[a-1])
			for b := t; b <= m; b++ {
				best := prow[b-1] + x*int64(nums2[b-1])
				if a > t && up[b] > best {
					best = up[b]
				}
				if b > t && row[b-1] > best {
					best = row[b-1]
				}
				row[b] = best
			}
		}
		prev, cur = cur, prev
	}
	return prev[n][m]
}
