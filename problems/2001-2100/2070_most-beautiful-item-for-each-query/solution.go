import "sort"

func maximumBeauty(items [][]int, queries []int) []int {
	sort.Slice(items, func(left, right int) bool {
		return items[left][0] < items[right][0]
	})
	prefixBeauty := make([]int, len(items))
	best := 0
	for index, item := range items {
		if item[1] > best {
			best = item[1]
		}
		prefixBeauty[index] = best
	}

	answer := make([]int, len(queries))
	for index, query := range queries {
		position := sort.Search(len(items), func(itemIndex int) bool {
			return items[itemIndex][0] > query
		})
		if position > 0 {
			answer[index] = prefixBeauty[position-1]
		}
	}
	return answer
}
