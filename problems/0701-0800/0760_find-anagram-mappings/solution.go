// Each element of nums1 must land on an index of nums2 that holds the same
// value, and with repeats no index can serve two elements. One pass files
// every value's indices in nums2 into a queue, left to right; the second
// walk hands each element of nums1 the front of its queue and pops it, so
// every copy takes the leftmost position not claimed by an earlier copy.
func anagramMappings(nums1 []int, nums2 []int) []int {
	positions := make(map[int][]int)
	for index, value := range nums2 {
		positions[value] = append(positions[value], index)
	}
	mapping := make([]int, 0, len(nums1))
	for _, value := range nums1 {
		queue := positions[value]
		mapping = append(mapping, queue[0])
		positions[value] = queue[1:]
	}
	return mapping
}
