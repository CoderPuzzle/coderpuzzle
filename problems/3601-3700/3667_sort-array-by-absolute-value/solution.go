import "sort"

func sortByAbsoluteValue(nums []int) []int {
	// Comparator (|a|, a): magnitude orders the array, and the signed value
	// breaks every magnitude tie so -x always lands before x.
	sort.Slice(nums, func(i, j int) bool {
		ai, aj := absInt(nums[i]), absInt(nums[j])
		if ai != aj {
			return ai < aj
		}
		return nums[i] < nums[j]
	})
	// The tie-break makes the ordering total on distinct outcomes, so the
	// result is unique regardless of the sort's stability.
	return nums
}

// absInt avoids math.Abs's float round-trip; |x| <= 100 never overflows.
func absInt(value int) int {
	if value < 0 {
		return -value
	}
	return value
}
