import (
	"sort"
)

func partitionArray(nums []int, k int) int {
	sort.Ints(nums)
	groups := 1
	start := nums[0]
	for _, value := range nums {
		if value-start > k {
			groups++
			start = value
		}
	}
	return groups
}
