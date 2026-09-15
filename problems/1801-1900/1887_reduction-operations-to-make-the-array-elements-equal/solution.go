import (
	"sort"
)

func reductionOperations(nums []int) int64 {
	// Sorted ascending: crossing into a new (larger) distinct value
	// raises the level; element i costs its level = number of distinct
	// smaller values below it.
	sort.Ints(nums)
	var ans int64
	level := 0
	for i := 1; i < len(nums); i++ {
		if nums[i] != nums[i-1] {
			level++
		}
		ans += int64(level)
	}
	return ans
}
