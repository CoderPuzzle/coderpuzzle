import "sort"

func sortPeople(names []string, heights []int) []string {
	// Sort indices by descending height; heights are distinct, so the
	// comparator fully orders every pair and no stability is relied on.
	order := make([]int, len(names))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return heights[order[a]] > heights[order[b]] })
	result := make([]string, 0, len(names))
	for _, i := range order {
		result = append(result, names[i])
	}
	return result
}
