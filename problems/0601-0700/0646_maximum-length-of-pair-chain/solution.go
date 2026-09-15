import "sort"

func findLongestChain(pairs [][]int) int {
	// Taking the compatible pair that ends earliest leaves the most room,
	// so sorting by right endpoint makes a single greedy pass optimal.
	sort.Slice(pairs, func(i, j int) bool { return pairs[i][1] < pairs[j][1] })
	length := 0
	currentEnd := -1 << 62
	for _, pair := range pairs {
		// Strict > encodes the strict b < c rule; touching pairs can't chain.
		if pair[0] > currentEnd {
			length++
			currentEnd = pair[1]
		}
	}
	return length
}
