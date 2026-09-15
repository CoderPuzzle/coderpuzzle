import "sort"

// Take the k smallest missing positives: sort distinct values, consume
// each gap with an arithmetic-series sum, then spill into the tail.
// Sums reach ~k^2/2 with k up to 10^8, so everything stays in int64.
func minimalKSum(nums []int, k int) int64 {
	ordered := make([]int, len(nums))
	copy(ordered, nums)
	sort.Ints(ordered)
	unique := ordered[:0]
	for i, v := range ordered {
		if i == 0 || v != ordered[i-1] {
			unique = append(unique, v)
		}
	}
	var total, taken, previous int64
	k64 := int64(k)
	for _, value := range unique {
		if taken >= k64 {
			break
		}
		gap := int64(value) - previous - 1
		if gap > 0 {
			use := gap
			if k64-taken < use {
				use = k64 - taken
			}
			total += use*(previous+1) + use*(use-1)/2
			taken += use
		}
		previous = int64(value)
	}
	if taken < k64 {
		use := k64 - taken
		total += use*(previous+1) + use*(use-1)/2
	}
	return total
}
