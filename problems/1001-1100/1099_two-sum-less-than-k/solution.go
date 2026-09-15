import "sort"

func twoSumLessThanK(nums []int, k int) int {
	// Sort, then two pointers: advance lo on small sums, retreat hi on
	// large ones, tracking the largest sum below k.
	sort.Ints(nums)
	lo, hi := 0, len(nums)-1
	best := -1
	for lo < hi {
		s := nums[lo] + nums[hi]
		if s < k {
			if s > best {
				best = s
			}
			lo++
		} else {
			hi--
		}
	}
	return best
}
