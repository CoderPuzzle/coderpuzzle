import "sort"

func miceAndCheese(reward1 []int, reward2 []int, k int) int {
	// Start from the second mouse eating everything, then hand k cheeses
	// to the first mouse. Swapping cheese i changes the total by
	// reward1[i] - reward2[i], so the k swaps with the largest gains are
	// optimal — gains may be negative when forced, and taking the top k
	// regardless is exactly what "exactly k" demands.
	n := len(reward1)
	gains := make([]int, n)
	total := 0
	for i := 0; i < n; i++ {
		total += reward2[i]
		gains[i] = reward1[i] - reward2[i]
	}
	sort.Sort(sort.Reverse(sort.IntSlice(gains)))
	for i := 0; i < k; i++ {
		total += gains[i]
	}
	return total
}
