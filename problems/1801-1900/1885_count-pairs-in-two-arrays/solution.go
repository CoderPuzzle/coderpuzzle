import (
	"sort"
)

func countPairs(nums1 []int, nums2 []int) int64 {
	// d[i] = nums1[i]-nums2[i]; count pairs with d[i]+d[j] > 0 by two
	// pointers over sorted d: d[l]+d[r] > 0 means all of l+1..r-1 also
	// pair with r, so add r-l and move r down.
	n := len(nums1)
	d := make([]int, n)
	for i := 0; i < n; i++ {
		d[i] = nums1[i] - nums2[i]
	}
	sort.Ints(d)
	var total int64
	l, r := 0, n-1
	for l < r {
		if d[l]+d[r] > 0 {
			total += int64(r - l)
			r--
		} else {
			l++
		}
	}
	return total
}
