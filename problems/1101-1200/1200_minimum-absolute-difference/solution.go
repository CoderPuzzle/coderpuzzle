import "sort"

func minimumAbsDifference(arr []int) [][]int {
	sorted := append([]int(nil), arr...)
	sort.Ints(sorted)
	pairs := [][]int{}
	best := int(^uint(0) >> 1)
	for i := 0; i+1 < len(sorted); i++ {
		gap := sorted[i+1] - sorted[i]
		if gap < best {
			// A strictly closer neighbour pair retires everything
			// collected against the old minimum.
			best = gap
			pairs = pairs[:0]
		}
		if gap == best {
			pairs = append(pairs, []int{sorted[i], sorted[i+1]})
		}
	}
	return pairs
}
