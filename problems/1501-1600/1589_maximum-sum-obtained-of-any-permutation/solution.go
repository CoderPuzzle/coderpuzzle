import "sort"

const mod = 1_000_000_007

// Difference array: +1 at the start of each request's range, -1 just past
// its end; a prefix sum then turns this into per-index request coverage
// counts instead of re-walking every request's range.
func maxSumRangeQuery(nums []int, requests [][]int) int {
	n := len(nums)
	diff := make([]int, n+1)
	for _, request := range requests {
		diff[request[0]]++
		diff[request[1]+1]--
	}
	freq := make([]int, n)
	running := 0
	for i := 0; i < n; i++ {
		running += diff[i]
		freq[i] = running
	}
	sortedNums := append([]int(nil), nums...)
	sort.Sort(sort.Reverse(sort.IntSlice(sortedNums)))
	sort.Sort(sort.Reverse(sort.IntSlice(freq)))
	// Rearrangement inequality: pairing the largest values with the largest
	// weights (both sorted descending) maximizes the sum of pairwise
	// products.
	var total int64 = 0
	for i := 0; i < n; i++ {
		total += int64(sortedNums[i]) * int64(freq[i])
	}
	return int(total % mod)
}
