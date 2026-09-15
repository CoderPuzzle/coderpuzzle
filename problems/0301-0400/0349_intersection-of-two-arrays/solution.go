import "sort"

// The set does the uniqueness bookkeeping: hashing nums1's values answers
// "is this value shared?" in O(1) average, and collecting the hits into a
// second set collapses the duplicates both inputs carry, so each shared
// value is kept exactly once. The final sort pins the output to the
// ascending order the judge compares exactly.
func intersection(nums1 []int, nums2 []int) []int {
	seen := make(map[int]bool, len(nums1))
	for _, value := range nums1 {
		seen[value] = true
	}
	shared := make(map[int]bool)
	for _, value := range nums2 {
		if seen[value] {
			shared[value] = true
		}
	}
	result := make([]int, 0, len(shared))
	for value := range shared {
		result = append(result, value)
	}
	sort.Ints(result)
	return result
}
