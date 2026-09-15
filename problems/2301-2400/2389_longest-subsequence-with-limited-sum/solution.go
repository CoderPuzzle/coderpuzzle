import "sort"

func answerQueries(nums []int, queries []int) []int {
	// The longest subsequence under a sum cap uses the smallest
	// elements: sort, prefix-sum, then count prefixes <= query by
	// binary search (first index whose prefix exceeds the query).
	sort.Ints(nums)
	for i := 1; i < len(nums); i++ {
		nums[i] += nums[i-1]
	}
	answer := make([]int, len(queries))
	for i, q := range queries {
		answer[i] = sort.SearchInts(nums, q+1)
	}
	return answer
}
