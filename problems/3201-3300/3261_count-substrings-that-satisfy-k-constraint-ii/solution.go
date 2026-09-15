func countKConstraintSubstrings(s string, k int, queries [][]int) []int64 {
	n := len(s)
	bounds := make([]int, n)
	left, zeros, ones := 0, 0, 0
	for right := 0; right < n; right++ {
		if s[right] == '0' {
			zeros++
		} else {
			ones++
		}
		for zeros > k && ones > k {
			if s[left] == '0' {
				zeros--
			} else {
				ones--
			}
			left++
		}
		bounds[right] = left
	}
	pre := make([]int64, n+1)
	for j := 0; j < n; j++ {
		pre[j+1] = pre[j] + int64(j+1-bounds[j])
	}
	next := make([]int, n)
	ptr := n
	for l := n - 1; l >= 0; l-- {
		for ptr > 0 && bounds[ptr-1] >= l {
			ptr--
		}
		next[l] = ptr
	}
	answer := make([]int64, len(queries))
	for t, query := range queries {
		l, r := query[0], query[1]
		j := next[l]
		if j > r {
			m := int64(r - l + 1)
			answer[t] = m * (m + 1) / 2
		} else {
			d := int64(j - l)
			answer[t] = pre[r+1] - pre[j] + d*(d+1)/2
		}
	}
	return answer
}
