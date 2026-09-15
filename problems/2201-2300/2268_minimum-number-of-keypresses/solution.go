import "sort"

// Each letter's press count is its position among the sorted frequencies:
// the most frequent 9 are pressed once, the next 9 twice, and the remaining
// 8 three times.
func minimumKeypresses(s string) int {
	var freq [26]int
	for i := 0; i < len(s); i++ {
		freq[s[i]-'a']++
	}
	sort.Sort(sort.Reverse(sort.IntSlice(freq[:])))
	presses := 0
	for rank, count := range freq {
		presses += count * (rank/9 + 1)
	}
	return presses
}
