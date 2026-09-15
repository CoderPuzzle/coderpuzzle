func pathExistenceQueries(n int, nums []int, maxDiff int, queries [][]int) []bool {
	// nums is sorted, so any edge i-j (i < j) forces every consecutive
	// pair between them to be an edge too — components are contiguous
	// segments, cut wherever a gap exceeds maxDiff.
	comp := make([]int, n)
	for i := 1; i < n; i++ {
		comp[i] = comp[i-1]
		if nums[i]-nums[i-1] > maxDiff {
			comp[i]++
		}
	}
	answer := make([]bool, len(queries))
	for i, q := range queries {
		answer[i] = comp[q[0]] == comp[q[1]]
	}
	return answer
}
