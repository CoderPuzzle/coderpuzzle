import (
	"sort"
)

// Every value is non-negative, so an optimal selection can be found among
// each row's top limits[i] values: pool those candidates, sort descending,
// and sum the first k. The sum may reach 250000 * 10^5 = 2.5e10, beyond
// int32, so accumulate in an int64.
func maxSum(grid [][]int, limits []int, k int) int64 {
	var pool []int64
	for i, row := range grid {
		s := make([]int, len(row))
		copy(s, row)
		sort.Ints(s)
		for j := len(s) - 1; j >= len(s)-limits[i] && j >= 0; j-- {
			pool = append(pool, int64(s[j]))
		}
	}
	sort.Slice(pool, func(a, b int) bool { return pool[a] > pool[b] })
	var total int64
	for j := 0; j < k && j < len(pool); j++ {
		total += pool[j]
	}
	return total
}
