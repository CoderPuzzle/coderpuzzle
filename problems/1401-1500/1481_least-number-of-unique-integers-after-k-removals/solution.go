import "sort"

func findLeastNumOfUniqueInts(arr []int64, k int) int {
	counts := map[int64]int{}
	for _, value := range arr {
		counts[value]++
	}
	freqs := make([]int, 0, len(counts))
	for _, count := range counts {
		freqs = append(freqs, count)
	}
	sort.Ints(freqs)
	remaining := len(freqs)
	for _, count := range freqs {
		if k >= count {
			k -= count
			remaining--
		} else {
			break
		}
	}
	return remaining
}
