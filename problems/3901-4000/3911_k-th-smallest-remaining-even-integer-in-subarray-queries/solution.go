import "sort"

func kthRemainingInteger(nums []int, queries [][]int) []int {
	positions := make([]int, 0)
	adjusted := make([]int, 0)
	for index, value := range nums {
		if value%2 == 0 {
			positions = append(positions, index)
			adjusted = append(adjusted, value/2-(len(positions)-1))
		}
	}

	result := make([]int, len(queries))
	for queryIndex, query := range queries {
		first := sort.SearchInts(positions, query[0])
		last := sort.Search(len(positions), func(index int) bool { return positions[index] > query[1] })
		crossed := sort.Search(last-first, func(index int) bool {
			return adjusted[first+index] > query[2]-first
		})
		result[queryIndex] = 2 * (query[2] + crossed)
	}
	return result
}
