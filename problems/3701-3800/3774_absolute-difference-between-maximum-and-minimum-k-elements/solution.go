import "sort"

func absDifference(nums []int, k int) int {
	// Sorted ascending, the k smallest elements occupy the first k
	// slots and the k largest the last k; all values are positive, so
	// the larger sum always comes from the top end and the absolute
	// difference is just last k minus first k.
	sort.Ints(nums)
	small, large := 0, 0
	for i := 0; i < k; i++ {
		small += nums[i]
		large += nums[len(nums)-k+i]
	}
	return large - small
}
