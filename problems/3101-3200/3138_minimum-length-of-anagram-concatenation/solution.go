func minAnagramLength(s string) int {
	// t repeats, so len(t) = L divides n = len(s) and every n / L chunk
	// must carry the same letter multiset as the first chunk: sweep the
	// divisors of n ascending and take the first survivor. A running
	// count that exceeds the first chunk's count already proves the
	// chunk differs, so failed candidates die early.
	n := len(s)
	for length := 1; length <= n; length++ {
		if n%length != 0 {
			continue
		}
		var base [26]int
		for i := 0; i < length; i++ {
			base[s[i]-'a']++
		}
		var run [26]int
		filled := 0
		ok := true
		for i := 0; i < n; i++ {
			c := s[i] - 'a'
			run[c]++
			if run[c] > base[c] {
				ok = false
				break
			}
			filled++
			if filled == length {
				if run != base {
					ok = false
					break
				}
				run = [26]int{}
				filled = 0
			}
		}
		if ok && filled == 0 {
			return length
		}
	}
	return n
}
