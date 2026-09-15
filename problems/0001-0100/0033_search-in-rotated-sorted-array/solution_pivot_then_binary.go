func search(nums []int, target int) int {
	n := len(nums)
	// Stage one: pin the seam. The cut leaves two ascending runs, and the
	// smallest value sits exactly where the lower one begins.
	lo, hi := 0, n-1
	for lo < hi {
		mid := (lo + hi) / 2
		// Compare the midpoint with the window's last value: above it, the
		// drop lies to mid's right; below it, the minimum is at mid or
		// earlier. Distinct values rule out equality.
		if nums[mid] > nums[hi] {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	pivot := lo
	// Stage two: one range test picks the run. From `pivot` to the end the
	// values climb from nums[pivot] to nums[n-1], and everything before
	// the pivot is larger still, so a target outside that span can only
	// live in the front run. An uncut array has pivot == 0 and the test
	// simply selects the whole array.
	if nums[pivot] <= target && target <= nums[n-1] {
		lo, hi = pivot, n-1
	} else {
		lo, hi = 0, pivot-1
	}
	// Inside a single run the values ascend, so ordinary binary search
	// applies without further thought about the rotation.
	for lo <= hi {
		mid := (lo + hi) / 2
		if nums[mid] == target {
			return mid
		}
		if nums[mid] < target {
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}
	// The run that could hold target turned out not to; the other run was
	// excluded by value range, so nothing remains.
	return -1
}
