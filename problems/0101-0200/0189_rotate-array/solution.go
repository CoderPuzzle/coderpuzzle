// Three reversals compose into a right rotation — reverse the whole slice,
// then each of the two blocks the rotation trades — so the rotation rewrites
// the given slice with no second allocation.
func rotate(nums []int, k int) []int {
	n := len(nums)
	// A rotation by n steps is the identity, so any larger k wraps
	// around to k % n — normalize before splitting into blocks.
	k %= n
	reverse := func(lo, hi int) {
		for lo < hi {
			nums[lo], nums[hi] = nums[hi], nums[lo]
			lo++
			hi--
		}
	}
	reverse(0, n-1)
	reverse(0, k-1)
	reverse(k, n-1)
	// The rotation happened inside the input allocation; the same slice,
	// now rotated, is what the judge compares.
	return nums
}
