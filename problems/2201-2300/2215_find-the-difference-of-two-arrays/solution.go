// Set membership answers "present in the other array" in O(1); the surviving
// distinct values are emitted ascending for judging.
import "sort"

func findDifference(nums1 []int, nums2 []int) [][]int {
	set1 := make(map[int]bool)
	for _, value := range nums1 {
		set1[value] = true
	}
	set2 := make(map[int]bool)
	for _, value := range nums2 {
		set2[value] = true
	}
	return [][]int{distinctSorted(nums1, set2), distinctSorted(nums2, set1)}
}

func distinctSorted(source []int, other map[int]bool) []int {
	kept := make(map[int]bool)
	for _, value := range source {
		if !other[value] {
			kept[value] = true
		}
	}
	sorted := make([]int, 0, len(kept))
	for value := range kept {
		sorted = append(sorted, value)
	}
	sort.Ints(sorted)
	return sorted
}
