// FindSumPairs keeps a frequency map of nums2 and scans the short nums1 on
// every count: for each a in nums1 add freq2[tot-a]. An add updates one slot
// plus its two frequency entries. The pair count can reach
// len(nums1)*len(nums2) = 1e8, hence int64.
type FindSumPairs struct {
	nums1 []int
	nums2 []int
	freq2 map[int]int64
}

func NewFindSumPairsTyped(nums1 []int, nums2 []int) *FindSumPairs {
	freq2 := make(map[int]int64, len(nums2)*2)
	for _, v := range nums2 {
		freq2[v]++
	}
	return &FindSumPairs{nums1: nums1, nums2: nums2, freq2: freq2}
}

func (design *FindSumPairs) add(index int, val int) {
	old := design.nums2[index]
	design.freq2[old]--
	now := old + val
	design.nums2[index] = now
	design.freq2[now]++
}

func (design *FindSumPairs) count(tot int) int64 {
	var total int64
	for _, a := range design.nums1 {
		total += design.freq2[tot-a]
	}
	return total
}
