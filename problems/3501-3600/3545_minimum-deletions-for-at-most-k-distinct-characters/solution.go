import "sort"

func minDeletion(s string, k int) int {
	// At most k distinct characters may survive, so keep the k most
	// frequent ones and delete every occurrence of the rest: the answer
	// is the sum of the (distinct - k) smallest frequencies.
	counts := make([]int, 26)
	for _, ch := range s {
		counts[ch-'a']++
	}
	freqs := []int{}
	for _, f := range counts {
		if f > 0 {
			freqs = append(freqs, f)
		}
	}
	sort.Ints(freqs)
	deletions := 0
	for i := 0; i < len(freqs)-k; i++ {
		deletions += freqs[i]
	}
	return deletions
}
