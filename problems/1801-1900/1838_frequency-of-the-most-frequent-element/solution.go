import "sort"

func maxFrequency(nums []int, k int) int {
	// Operations only raise values, so an optimal equal-value group is a
	// contiguous window in sorted order, raised to its right end.
	arr := make([]int, len(nums))
	copy(arr, nums)
	sort.Ints(arr)
	best := 1
	left := 0
	windowSum := int64(0)
	for right := 0; right < len(arr); right++ {
		value := int64(arr[right])
		windowSum += value
		// Cost = width * target - window sum, the increments needed to
		// lift everything to the right end; drop the smallest member while
		// the budget is exceeded.
		for int64(right-left+1)*value-windowSum > int64(k) {
			windowSum -= int64(arr[left])
			left++
		}
		// Once a length is affordable, every shorter window is too.
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}
