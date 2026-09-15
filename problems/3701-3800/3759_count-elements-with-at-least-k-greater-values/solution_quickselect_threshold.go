import "math/rand"

func countElements(nums []int, k int) int {
	// The full sorted order is more than the answer needs: the count is
	// decided entirely by which values sit strictly below
	// sorted[n - k - 1]. Quickselect learns that one threshold value
	// without paying to order everything else.
	target := len(nums) - k - 1
	lo, hi := 0, len(nums)-1
	for lo < hi {
		// A uniformly random pivot defeats adversarial inputs: every
		// partition is expected to shrink the window by a constant
		// factor, so the total work stays linear instead of degrading
		// to quadratic on sorted arrays.
		r := lo + rand.Intn(hi-lo+1)
		nums[r], nums[hi] = nums[hi], nums[r]
		pivot := nums[hi]
		// Three-way (Dutch flag) split: values strictly below the pivot
		// move to the front block, values strictly above to the back
		// block, and the pivot's own run sits between them. A run of
		// equals leaves the window together, which is what keeps heavily
		// duplicated inputs fast.
		lt, i, gt := lo, lo, hi
		for i <= gt {
			switch {
			case nums[i] < pivot:
				nums[lt], nums[i] = nums[i], nums[lt]
				lt++
				i++
			case nums[i] > pivot:
				nums[i], nums[gt] = nums[gt], nums[i]
				gt--
			default:
				i++
			}
		}
		// [lo, lt-1] < pivot, [lt, gt] == pivot, [gt+1, hi] > pivot;
		// keep only the block still covering the target index.
		if target < lt {
			hi = lt - 1
		} else if target > gt {
			lo = gt + 1
		} else {
			break
		}
	}
	threshold := nums[target]
	// Elements strictly below the threshold qualify wholesale; the run AT
	// it qualifies only when its strictly-greater count reaches k.
	less, equal := 0, 0
	for _, value := range nums {
		switch {
		case value < threshold:
			less++
		case value == threshold:
			equal++
		}
	}
	if len(nums)-less-equal >= k {
		return less + equal
	}
	return less
}
