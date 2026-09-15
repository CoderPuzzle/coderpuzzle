import "sort"

func relativeSortArray(arr1 []int, arr2 []int) []int {
	// Rank in arr2 for present values; absent ones share the sentinel rank
	// len(arr2) and then compare by value (ascending at the end).
	rank := make(map[int]int, len(arr2))
	for i, value := range arr2 {
		rank[value] = i
	}
	tail := len(arr2)
	out := append([]int(nil), arr1...)
	key := func(value int) int {
		r, ok := rank[value]
		if !ok {
			r = tail
		}
		return r*2000 + value // ranks < 1000, values <= 1000 < 2000
	}
	sort.SliceStable(out, func(i, j int) bool { return key(out[i]) < key(out[j]) })
	return out
}
