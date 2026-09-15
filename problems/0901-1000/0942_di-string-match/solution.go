// Two counters bracket the value range: `lo` is the smallest value not yet
// placed, `hi` the largest. An 'I' is safest satisfied with lo (everything
// still unused is larger), a 'D' with hi — the pinned canonical construction.
func diStringMatch(s string) []int {
	n := len(s)
	lo, hi := 0, n
	perm := make([]int, 0, n+1)
	for i := 0; i < n; i++ {
		if s[i] == 'I' {
			perm = append(perm, lo)
			lo++
		} else {
			perm = append(perm, hi)
			hi--
		}
	}
	// lo and hi have met; the single leftover value fills the last slot.
	perm = append(perm, lo)
	return perm
}
