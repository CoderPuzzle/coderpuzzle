import "sort"

// Count how often each letter occurs, then process the frequencies from
// largest to smallest. Whenever a frequency repeats a value already
// committed to, shrink it by one deletion at a time until it lands on an
// unused value (or hits zero, meaning that letter is deleted away
// entirely).
func minDeletions(s string) int {
	var counts [26]int
	for _, c := range s {
		counts[c-'a']++
	}
	freqs := counts[:]
	sort.Sort(sort.Reverse(sort.IntSlice(freqs)))

	used := make(map[int]bool)
	deletions := 0
	for _, freq := range freqs {
		for freq > 0 && used[freq] {
			freq--
			deletions++
		}
		if freq > 0 {
			used[freq] = true
		}
	}
	return deletions
}
