import (
	"sort"
)

func minProductSum(nums1 []int, nums2 []int) int64 {
	// Rearrangement inequality: ascending x descending pairing minimizes
	// the sum of products over all rearrangements of nums1.
	sort.Ints(nums1)
	sort.Sort(sort.Reverse(sort.IntSlice(nums2)))
	total := int64(0)
	for i := range nums1 {
		total += int64(nums1[i]) * int64(nums2[i])
	}
	return total
}
