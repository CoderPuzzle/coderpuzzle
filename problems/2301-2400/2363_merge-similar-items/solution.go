import "sort"

func mergeSimilarItems(items1 [][]int, items2 [][]int) [][]int {
	// Accumulate weights per value in one map fed by both lists, then sort
	// the entries by value for the output.
	weights := make(map[int]int)
	for _, items := range [][][]int{items1, items2} {
		for _, item := range items {
			weights[item[0]] += item[1]
		}
	}
	ret := make([][]int, 0, len(weights))
	for value, weight := range weights {
		ret = append(ret, []int{value, weight})
	}
	sort.Slice(ret, func(i, j int) bool { return ret[i][0] < ret[j][0] })
	return ret
}
