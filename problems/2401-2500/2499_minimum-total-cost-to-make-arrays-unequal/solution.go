// Pay every equal column tentatively and histogram their values; buy the
// cheapest neutral columns while one value dominates the chosen set. The
// total reaches n*(n-1)/2 ~ 5e9 at n=10^5, hence the int64 accumulator.
func minimumTotalCost(nums1 []int, nums2 []int) int64 {
	cost := int64(0)
	cnt := make(map[int]int)
	chosen := 0
	dom := -1 // values are >= 1, so -1 can never be a real key
	for i := range nums1 {
		if nums1[i] == nums2[i] {
			cnt[nums1[i]]++
			if cnt[nums1[i]] > cnt[dom] {
				dom = nums1[i]
			}
			chosen++
			cost += int64(i)
		}
	}
	if chosen == 0 {
		return 0
	}
	for j := 0; j < len(nums1) && cnt[dom]*2 > chosen; j++ {
		if nums1[j] != nums2[j] && nums1[j] != dom && nums2[j] != dom {
			chosen++
			cost += int64(j)
		}
	}
	if cnt[dom]*2 <= chosen {
		return cost
	}
	return -1
}
