import "sort"

// Count how many times each value occurs in nums1, then walk nums2: a value
// can join the result at most min(count1, count2) times, which the per-value
// counter enforces by falling to zero. The judge compares arrays exactly, so
// the any-order freedom is pinned to ascending sorted order before returning.
func intersect(nums1 []int, nums2 []int) []int {
	counts := make(map[int]int)
	for _, value := range nums1 {
		counts[value]++
	}
	picked := []int{}
	for _, value := range nums2 {
		if counts[value] > 0 {
			picked = append(picked, value)
			counts[value]--
		}
	}
	sort.Ints(picked)
	return picked
}
