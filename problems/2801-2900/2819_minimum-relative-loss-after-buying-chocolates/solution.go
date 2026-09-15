import "sort"

func minimumRelativeLosses(prices []int, queries [][]int) []int64 {
	sort.Ints(prices)
	n := len(prices)
	prefix := make([]int64, n+1)
	for i, price := range prices {
		prefix[i+1] = prefix[i] + int64(price)
	}
	answer := make([]int64, len(queries))
	for qi, query := range queries {
		k := int64(query[0])
		m := query[1]
		split := sort.Search(len(prices), func(i int) bool { return int64(prices[i]) > k })
		// Every intermediate stays near 2 * 10^5 * 10^9, inside an int64.
		lo, hi := max(0, m-(n-split)), min(m, split)
		for lo < hi {
			mid := (lo + hi) / 2
			if int64(prices[mid])+int64(prices[n-m+mid]) >= 2*k {
				hi = mid
			} else {
				lo = mid + 1
			}
		}
		rest := m - lo
		answer[qi] = prefix[lo] + 2*k*int64(rest) - (prefix[n] - prefix[n-rest])
	}
	return answer
}
