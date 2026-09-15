import "sort"

func lexicographicallySmallestArray(nums []int, limit int) []int {
	n := len(nums)
	type pair struct{ v, i int }
	pairs := make([]pair, n)
	for i, v := range nums {
		pairs[i] = pair{v, i}
	}
	// Sort (value, index) pairs so components are contiguous runs of values.
	sort.Slice(pairs, func(a, b int) bool {
		if pairs[a].v != pairs[b].v {
			return pairs[a].v < pairs[b].v
		}
		return pairs[a].i < pairs[b].i
	})
	result := make([]int, n)
	i := 0
	for i < n {
		// A maximal run whose consecutive value gaps are all <= limit is
		// exactly one connected component; any larger gap splits it.
		j := i
		for j+1 < n && pairs[j+1].v-pairs[j].v <= limit {
			j++
		}
		// Within a component any permutation is reachable, so place the
		// run's ascending values at its original indices in ascending order.
		indices := make([]int, 0, j-i+1)
		for pos := i; pos <= j; pos++ {
			indices = append(indices, pairs[pos].i)
		}
		sort.Ints(indices)
		for p := i; p <= j; p++ {
			result[indices[p-i]] = pairs[p].v
		}
		i = j + 1
	}
	return result
}
