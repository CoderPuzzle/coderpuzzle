// Walk source once keeping, for every prefix length k of pattern, the most
// removals achievable with k characters already matched. Every position
// carries each state over unchanged (the character can always be kept
// unused), adds one when the position is a removable target that gets
// deleted, and moves state k to k + 1 when the character equals
// pattern[k]. Unreachable states sit at NEG, whose drift stays far below
// zero across the whole scan.
func maxRemovals(source string, pattern string, targetIndices []int) int {
	const NEG = -(1 << 30)
	n := len(source)
	m := len(pattern)
	removable := make([]bool, n)
	for _, idx := range targetIndices {
		removable[idx] = true
	}
	prev := make([]int, m+1)
	for k := range prev {
		prev[k] = NEG
	}
	prev[0] = 0
	cur := make([]int, m+1)
	for i := 0; i < n; i++ {
		for k := 0; k <= m; k++ {
			best := prev[k]
			if removable[i] {
				best = prev[k] + 1
			}
			if k > 0 && source[i] == pattern[k-1] && prev[k-1] > best {
				best = prev[k-1]
			}
			cur[k] = best
		}
		prev, cur = cur, prev
	}
	return prev[m]
}
