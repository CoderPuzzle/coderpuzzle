// Order is irrelevant; only letter counts matter. Every unmatched copy of
// a letter on either side costs one append on the other.
func minSteps(s string, t string) int {
	counts := [26]int{}
	for _, ch := range s {
		counts[ch-'a']++
	}
	for _, ch := range t {
		counts[ch-'a']--
	}
	total := 0
	for _, diff := range counts {
		if diff < 0 {
			diff = -diff
		}
		total += diff
	}
	return total
}
