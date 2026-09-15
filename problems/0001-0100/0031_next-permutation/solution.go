// Rearrange nums into its next lexicographic permutation: find the rightmost
// element smaller than its successor (the pivot), swap it with the smallest
// greater value in the suffix, then reverse the suffix to its minimum.
func nextPermutation(nums []int) []int {
	// Everything right of the pivot is a non-increasing suffix — the largest
	// arrangement of that tail — so the pivot is the only position that can
	// still grow while the prefix stays fixed.
	pivot := len(nums) - 2
	for pivot >= 0 && nums[pivot] >= nums[pivot+1] {
		pivot--
	}
	if pivot >= 0 {
		// The rightmost value exceeding the pivot is the smallest one that
		// does; the >= above means equals are stepped over.
		successor := len(nums) - 1
		for nums[successor] <= nums[pivot] {
			successor--
		}
		nums[pivot], nums[successor] = nums[successor], nums[pivot]
	}
	// The suffix stays non-increasing after the swap, so reversing it yields
	// the smallest possible tail. No pivot means the whole array was the last
	// permutation, and the full reverse wraps to the first.
	left, right := pivot+1, len(nums)-1
	for left < right {
		nums[left], nums[right] = nums[right], nums[left]
		left++
		right--
	}
	return nums
}
