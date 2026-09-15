func minimumTime(s string) int {
	n := len(s)
	// cost(l, r) = l + (n - r) + 2 * count1(s[l:r])
	//            = n + sum over kept chars of (1 if '1' else -1).
	// Minimize by taking the minimum subarray sum (empty subarray allowed).
	minEnd := 0
	best := 0
	for k := 0; k < n; k++ {
		value := -1
		if s[k] == '1' {
			value = 1
		}
		if value < minEnd+value {
			minEnd = value
		} else {
			minEnd = minEnd + value
		}
		if minEnd < best {
			best = minEnd
		}
	}
	return n + best
}
