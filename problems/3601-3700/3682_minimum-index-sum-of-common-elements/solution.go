// For a shared value the two indices are independent, so its best good pair
// is its first occurrence in each array: minimizing i and j separately
// minimizes i + j.
func minimumSum(nums1 []int, nums2 []int) int {
	firstIndex := make(map[int]int, len(nums1))
	for i, value := range nums1 {
		if _, seen := firstIndex[value]; !seen {
			firstIndex[value] = i
		}
	}
	// One pass over nums2: every value the map knows scores
	// firstIndex[nums2[j]] + j, and the smallest score wins. The flag stays
	// -1 when nothing matched.
	best := -1
	for j, value := range nums2 {
		if earlier, ok := firstIndex[value]; ok {
			if total := earlier + j; best == -1 || total < best {
				best = total
			}
		}
	}
	return best
}
