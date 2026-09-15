import "sort"

func numRescueBoats(people []int, limit int) int {
	sorted := make([]int, len(people))
	copy(sorted, people)
	sort.Ints(sorted)
	i, j := 0, len(sorted)-1
	boats := 0
	for i <= j {
		// The heaviest boards either way; the lightest is their best
		// partner, since a heavier one only risks exceeding the limit.
		// The i < j guard keeps the last person from pairing with themself.
		if i < j && sorted[i]+sorted[j] <= limit {
			i++
		}
		j--
		boats++
	}
	return boats
}
