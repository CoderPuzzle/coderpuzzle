import "sort"

func minCost(arr []int, brr []int, k int64) int64 {
	// Splitting into singleton blocks already realizes any permutation,
	// so one paid rearrangement is all Operation 1 can offer; matching
	// sorted to sorted then minimizes sum |a - b| over permutations. The
	// answer is the cheaper of leaving arr put and paying k plus that
	// matched cost. Sums reach 2 * 10^10 and k itself is up to
	// 2 * 10^10, so everything widens to int64.
	var direct int64
	for i := range arr {
		d := int64(arr[i] - brr[i])
		if d < 0 {
			d = -d
		}
		direct += d
	}
	sa := append([]int(nil), arr...)
	sb := append([]int(nil), brr...)
	sort.Ints(sa)
	sort.Ints(sb)
	matched := k
	for i := range sa {
		d := int64(sa[i] - sb[i])
		if d < 0 {
			d = -d
		}
		matched += d
	}
	if direct < matched {
		return direct
	}
	return matched
}
