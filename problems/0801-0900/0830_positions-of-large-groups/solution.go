// Groups are the maximal runs of one character. One scan keeps start,
// the index where the current run began; whenever s[i] differs from
// s[i-1] — or i reaches n, a virtual change that closes the final run —
// the run [start, i-1] is complete, its length i - start is tested
// against 3, and the interval is appended. Runs close left to right, so
// the intervals come out already sorted by start.
func largeGroupPositions(s string) [][]int {
	groups := make([][]int, 0, len(s)/3+1)
	n := len(s)
	start := 0
	for i := 1; i <= n; i++ {
		if i == n || s[i] != s[i-1] {
			if i-start >= 3 {
				groups = append(groups, []int{start, i - 1})
			}
			start = i
		}
	}
	return groups
}
