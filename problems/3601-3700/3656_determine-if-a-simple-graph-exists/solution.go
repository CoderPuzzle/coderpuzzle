import "sort"

func simpleGraphExists(degrees []int) bool {
	sort.Slice(degrees, func(i, j int) bool { return degrees[i] > degrees[j] })
	n := len(degrees)
	pre := make([]int64, n+1)
	for i := 0; i < n; i++ {
		pre[i+1] = pre[i] + int64(degrees[i])
	}
	total := pre[n]
	// An odd degree sum can never pair up into edges.
	if total%2 != 0 {
		return false
	}
	// big tracks how many entries still exceed k; it only moves left.
	big := n
	for k := 0; k <= n; k++ {
		for big > 0 && int64(degrees[big-1]) <= int64(k) {
			big--
		}
		excess := int64(big - k)
		if excess < 0 {
			excess = 0
		}
		m := big
		if m < k {
			m = k
		}
		spared := int64(k)*excess + total - pre[m]
		if pre[k] > int64(k)*int64(k-1)+spared {
			return false
		}
	}
	return true
}
