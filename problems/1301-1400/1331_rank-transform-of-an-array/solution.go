import "sort"

func arrayRankTransform(arr []int) []int {
	// Rank = position in the sorted distinct values, 1-based; the map is then
	// applied in input order so the output preserves positions.
	distinct := make([]int, 0, len(arr))
	seen := map[int]bool{}
	for _, value := range arr {
		if !seen[value] {
			seen[value] = true
			distinct = append(distinct, value)
		}
	}
	sort.Ints(distinct)
	ranks := make(map[int]int, len(distinct))
	for index, value := range distinct {
		ranks[value] = index + 1
	}
	out := make([]int, len(arr))
	for i, value := range arr {
		out[i] = ranks[value]
	}
	return out
}
