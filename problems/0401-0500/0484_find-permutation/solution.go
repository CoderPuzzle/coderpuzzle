// Ascending 1..n+1 is the lexicographically smallest arrangement of the
// values, and it already satisfies every 'I' — so disturb it only where a
// maximal run of 'D's demands a descent, by reversing exactly the block
// that run covers.
func findPermutation(s string) []int {
	n := len(s)
	perm := make([]int, n+1)
	for i := range perm {
		perm[i] = i + 1
	}
	i := 0
	for i < n {
		if s[i] == 'D' {
			start := i
			for i < n && s[i] == 'D' {
				i++
			}
			for lo, hi := start, i; lo < hi; lo, hi = lo+1, hi-1 {
				perm[lo], perm[hi] = perm[hi], perm[lo]
			}
		} else {
			i++
		}
	}
	return perm
}
