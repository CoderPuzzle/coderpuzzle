import "sort"

func maxKDistinct(nums []int, k int) []int {
	// A duplicate can never be picked twice and never beats an unused value,
	// so only the set of distinct values matters; a map collapses nums.
	seen := make(map[int]bool, len(nums))
	for _, num := range nums {
		seen[num] = true
	}
	distinct := make([]int, 0, len(seen))
	for value := range seen {
		distinct = append(distinct, value)
	}
	// Descending order lines the largest values up first; the first k of
	// them are the unique optimum, truncated when fewer than k exist.
	sort.Slice(distinct, func(i, j int) bool { return distinct[i] > distinct[j] })
	if len(distinct) > k {
		distinct = distinct[:k]
	}
	return distinct
}
