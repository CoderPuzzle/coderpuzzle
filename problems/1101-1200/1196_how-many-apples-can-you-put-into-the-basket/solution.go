import "sort"

func maxNumberOfApples(weight []int) int {
	// Lightest apples first: any optimal packing can be assumed to consist
	// of them, so a sorted greedy prefix is exactly optimal.
	sort.Ints(weight)
	total := 0
	for i, w := range weight {
		if total+w > 5000 {
			return i
		}
		total += w
	}
	return len(weight)
}
