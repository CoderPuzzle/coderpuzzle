// Repeated full passes through source: each pass greedily consumes as much
// of the remaining target as a subsequence match allows. A pass that
// matches nothing means the next target character never occurs in source
// at all, so the task is impossible.
func shortestWay(source string, target string) int {
	n, m := len(source), len(target)
	j := 0
	count := 0
	for j < m {
		start := j
		for i := 0; i < n; i++ {
			if j < m && source[i] == target[j] {
				j++
			}
		}
		if j == start {
			return -1
		}
		count++
	}
	return count
}
