func divideString(s string, k int, fill string) []string {
	padding := (k - len(s)%k) % k
	padded := make([]byte, 0, len(s)+padding)
	padded = append(padded, s...)
	for count := 0; count < padding; count++ {
		padded = append(padded, fill[0])
	}

	groups := make([]string, 0, len(padded)/k)
	for start := 0; start < len(padded); start += k {
		groups = append(groups, string(padded[start:start+k]))
	}
	return groups
}
