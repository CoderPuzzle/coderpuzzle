func maxProduct(s string) int64 {
	n := len(s)

	// Manacher (odd palindromes): d1[i] = number of odd palindromes centered at i
	d1 := make([]int, n)
	left, right := 0, -1
	for i := 0; i < n; i++ {
		k := 1
		if i > right {
			k = 1
		} else {
			mirror := d1[left+right-i]
			span := right - i + 1
			if mirror < span {
				k = mirror
			} else {
				k = span
			}
		}
		for i-k >= 0 && i+k < n && s[i-k] == s[i+k] {
			k++
		}
		d1[i] = k
		if i+k-1 > right {
			left = i - k + 1
			right = i + k - 1
		}
	}

	// Record, per center, the longest odd palindrome that ends exactly
	// at each index and the longest that starts exactly at each index.
	bestEnd := make([]int64, n)
	bestStart := make([]int64, n)
	for c := 0; c < n; c++ {
		length := int64(2*d1[c] - 1)
		end := c + d1[c] - 1
		start := c - d1[c] + 1
		if length > bestEnd[end] {
			bestEnd[end] = length
		}
		if length > bestStart[start] {
			bestStart[start] = length
		}
	}

	// Shrink from the recorded maximum: a palindrome ending at i+1 of length L
	// implies one ending at i of length L-2 (drop one char from each side).
	for i := n - 2; i >= 0; i-- {
		candEnd := bestEnd[i+1] - 2
		if candEnd > bestEnd[i] {
			bestEnd[i] = candEnd
		}
	}
	for i := 1; i < n; i++ {
		candStart := bestStart[i-1] - 2
		if candStart > bestStart[i] {
			bestStart[i] = candStart
		}
	}

	// Prefix max of bestEnd / suffix max of bestStart = the longest
	// palindrome fully inside each prefix / suffix.
	pref := make([]int64, n)
	pref[0] = bestEnd[0]
	for i := 1; i < n; i++ {
		pref[i] = maxI64(pref[i-1], bestEnd[i])
	}

	suff := make([]int64, n)
	suff[n-1] = bestStart[n-1]
	for i := n - 2; i >= 0; i-- {
		suff[i] = maxI64(suff[i+1], bestStart[i])
	}

	// The two palindromes are disjoint, so some split separates them;
	// try every split. Single characters are length-1 palindromes, so
	// both sides always contribute at least 1.
	var ans int64 = 0
	for i := 0; i < n-1; i++ {
		candidate := pref[i] * suff[i+1]
		if candidate > ans {
			ans = candidate
		}
	}
	return ans
}

func maxI64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
