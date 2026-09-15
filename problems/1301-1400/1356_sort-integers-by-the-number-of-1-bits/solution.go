import "sort"

func sortByBits(arr []int) []int {
	// The order is the lexicographic order of (popcount, value).
	out := make([]int, len(arr))
	copy(out, arr)
	popcount := func(x int) int {
		count := 0
		for x != 0 {
			count += x & 1
			x >>= 1
		}
		return count
	}
	sort.Slice(out, func(a, b int) bool {
		pa := popcount(out[a])
		pb := popcount(out[b])
		if pa != pb {
			return pa < pb
		}
		return out[a] < out[b]
	})
	return out
}
