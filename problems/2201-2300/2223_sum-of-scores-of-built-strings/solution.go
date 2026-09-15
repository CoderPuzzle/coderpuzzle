func sumScores(s string) int64 {
	n := len(s)
	if n == 0 {
		return 0
	}
	z := make([]int64, n)
	// s_n = s is its own longest prefix; each s_i is a suffix scoring z[n-i]
	z[0] = int64(n)
	left, right := 0, 0
	for i := 1; i < n; i++ {
		if i < right {
			// inside the window [left, right): reuse the mirrored z[i-left],
			// capped at right-i so the guess stays within verified territory
			zi := int64(right - i)
			if z[i-left] < zi {
				zi = z[i-left]
			}
			z[i] = zi
		}
		// extend by direct comparison as far as the match truly goes
		for i+int(z[i]) < n && s[z[i]] == s[i+int(z[i])] {
			z[i]++
		}
		// track the rightmost window; its forward growth bounds work by O(n)
		if i+int(z[i]) > right {
			left = i
			right = i + int(z[i])
		}
	}
	var total int64
	for _, v := range z {
		total += v
	}
	return total
}
