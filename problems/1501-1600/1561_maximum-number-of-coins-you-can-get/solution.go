import "sort"

func maxCoins(piles []int) int {
	// Sort ascending. Bob permanently absorbs the n smallest piles
	// (indices 0..n-1); of what's left, you take every other pile
	// starting at index n, and Alice takes the rest.
	sort.Ints(piles)
	n := len(piles) / 3
	total := 0
	idx := n
	for i := 0; i < n; i++ {
		total += piles[idx]
		idx += 2
	}
	return total
}
