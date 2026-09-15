import "sort"

func maxSumSubmatrix(matrix [][]int, k int) int {
	m := len(matrix)
	n := len(matrix[0])
	best := 0
	found := false
	for top := 0; top < m; top++ {
		// colSum[c] = sum of column c between rows top..bottom, so
		// extending the bottom row is one O(n) update; any rectangle
		// in this row pair is a contiguous subarray of colSum.
		colSum := make([]int, n)
		for bottom := top; bottom < m; bottom++ {
			for c := 0; c < n; c++ {
				colSum[c] += matrix[bottom][c]
			}
			prefix := 0
			// 0 seeded so a subarray starting at the first column counts.
			prefixes := []int{0}
			for c := 0; c < n; c++ {
				prefix += colSum[c]
				// Subarray sum = prefix - earlier prefix; the smallest
				// earlier >= prefix-k maximizes it while staying <= k.
				// bisect_left(prefixes, prefix-k)
				lo, hi := 0, len(prefixes)
				for lo < hi {
					mid := (lo + hi) / 2
					if prefixes[mid] < prefix-k {
						lo = mid + 1
					} else {
						hi = mid
					}
				}
				if lo < len(prefixes) {
					candidate := prefix - prefixes[lo]
					if !found || candidate > best {
						best = candidate
						found = true
					}
				}
				// insort keeps the list sorted for the next query.
				pos := sort.SearchInts(prefixes, prefix)
				prefixes = append(prefixes, 0)
				copy(prefixes[pos+1:], prefixes[pos:])
				prefixes[pos] = prefix
			}
		}
	}
	return best
}
