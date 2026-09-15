func subStrHash(s string, power int, modulo int, k int, hashValue int) string {
	n := len(s)
	p := int64(power)
	m := int64(modulo)
	val := func(i int) int64 {
		return int64(s[i] - 'a' + 1)
	}

	// Hash of the rightmost window, then roll leftwards.
	var cur, pw int64 = 0, 1
	for j := 0; j < k; j++ {
		cur = (cur + val(n-k+j)*pw) % m
		pw = pw * p % m
	}
	var top int64 = 1
	for j := 0; j < k-1; j++ {
		top = top * p % m
	}
	answer := ""
	if cur == int64(hashValue) {
		answer = s[n-k:]
	}
	for i := n - k - 1; i >= 0; i-- {
		cur = (((cur-val(i+k)*top%m+m)%m)*p + val(i)) % m
		if cur == int64(hashValue) {
			answer = s[i : i+k] // scanning right-to-left keeps the leftmost match
		}
	}
	return answer
}
