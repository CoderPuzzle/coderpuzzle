import "sort"

func fourSumCount(nums1 []int, nums2 []int, nums3 []int, nums4 []int) int {
	// Same split as the hash-map version -- a+b+c+d = 0 iff a+b = -(c+d)
	// -- but the join is ordered ground rather than a table: materialise
	// both halves' pair sums and sort the right one.
	left := make([]int, 0, len(nums1)*len(nums2))
	for _, a := range nums1 {
		for _, b := range nums2 {
			left = append(left, a+b)
		}
	}
	right := make([]int, 0, len(nums3)*len(nums4))
	for _, c := range nums3 {
		for _, d := range nums4 {
			right = append(right, c+d)
		}
	}
	sort.Ints(right)
	// Each left sum asks "how many right sums equal my negation?"; on a
	// sorted array a pair of binary searches brackets exactly that run.
	// Counts can reach n^4 = 1.6e9, so the tally widens to 64 bits.
	total := int64(0)
	for _, sum := range left {
		negated := -sum
		lower := sort.SearchInts(right, negated)
		upper := sort.Search(len(right), func(i int) bool { return right[i] > negated })
		total += int64(upper - lower)
	}
	return int(total)
}
