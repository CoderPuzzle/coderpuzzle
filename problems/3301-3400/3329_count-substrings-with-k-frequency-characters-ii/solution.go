func numberOfSubstrings(s string, k int) int64 {
	n := len(s)
	count := make([]int, 26)
	sat := 0 // number of characters whose window count has reached k
	r := 0
	var total int64
	for l := 0; l < n; l++ {
		// Window is [l, r). Extend until some character reaches count k:
		// validity only grows as the window widens, so the first end that
		// works for l also works for every larger end.
		for r < n && sat == 0 {
			c := int(s[r] - 'a')
			count[c]++
			if count[c] == k {
				sat++
			}
			r++
		}
		if sat == 0 {
			break // no window from l (or any later l) can become valid
		}
		// [l, r - 1] is the minimal valid window from l, so exactly the
		// ends r - 1 .. n - 1 are valid: n - (r - 1) substrings.
		total += int64(n - (r - 1))
		c := int(s[l] - 'a')
		if count[c] == k {
			sat--
		}
		count[c]--
	}
	return total
}
