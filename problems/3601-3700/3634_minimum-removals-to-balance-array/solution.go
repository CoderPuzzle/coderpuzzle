import "sort"

func minRemoval(nums []int, k int) int {
	// Sort so the best survivor set is a contiguous window: it is balanced
	// exactly when nums[j] <= nums[i] * k at its ends, and the longest such
	// window keeps the most elements.
	sort.Ints(nums)
	best := 0
	left := 0
	for right := 0; right < len(nums); right++ {
		// A one-element window is always balanced, so left never passes
		// right. The product reaches 1e14 — beyond int32 range, so widen
		// before multiplying.
		for int64(nums[right]) > int64(nums[left])*int64(k) {
			left++
		}
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return len(nums) - best
}
