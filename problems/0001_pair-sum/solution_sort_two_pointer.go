import "sort"

// Sort + two pointers instead of a hash map: order the indexes by value so a
// classic two-pointer scan can find the pair that sums to target.
func pairSum(nums []int, target int) []int {
	// Keep indexes, not values, so the original positions survive the sort.
	indexes := make([]int, len(nums))
	for i := range indexes {
		indexes[i] = i
	}
	sort.Slice(indexes, func(a, b int) bool { return nums[indexes[a]] < nums[indexes[b]] })
	lo, hi := 0, len(indexes)-1
	for lo < hi {
		sum := nums[indexes[lo]] + nums[indexes[hi]]
		if sum == target {
			return []int{indexes[lo], indexes[hi]}
		} else if sum < target {
			// Too small: only a larger value can help, so advance lo.
			lo++
		} else {
			// Too large: only a smaller value can help, so retreat hi.
			hi--
		}
	}
	return nil
}
