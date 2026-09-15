import "sort"

// Sort both arrays ascending and walk them with one index each: the smaller
// current value can no longer be matched and advances alone, while equal
// currents are a shared copy and both indexes advance together. Every
// emission spends one copy of the value on each side, so each value joins
// exactly min(count1, count2) times, and the ascending walk leaves the
// result already sorted — no map and no final re-sort.
func intersect(nums1 []int, nums2 []int) []int {
	sort.Ints(nums1)
	sort.Ints(nums2)
	picked := []int{}
	i, j := 0, 0
	for i < len(nums1) && j < len(nums2) {
		if nums1[i] == nums2[j] {
			picked = append(picked, nums1[i])
			i++
			j++
		} else if nums1[i] < nums2[j] {
			i++
		} else {
			j++
		}
	}
	return picked
}
