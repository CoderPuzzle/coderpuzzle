import "sort"

func minSetSize(arr []int) int {
	// A k-value set removes the sum of k frequencies; accumulate the largest
	// frequencies first until half the array is gone.
	counts := map[int]int{}
	for _, value := range arr {
		counts[value]++
	}
	freqs := make([]int, 0, len(counts))
	for _, freq := range counts {
		freqs = append(freqs, freq)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(freqs)))
	need := (len(arr) + 1) / 2
	removed := 0
	for size, freq := range freqs {
		removed += freq
		if removed >= need {
			return size + 1
		}
	}
	return len(freqs)
}
