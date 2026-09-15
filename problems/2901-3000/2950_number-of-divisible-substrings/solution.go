func countDivisibleSubstrings(word string) int {
	digit := "11222333444555666777788899"
	n := len(word)
	pre := make([]int, n+1)
	for i := 0; i < n; i++ {
		pre[i+1] = pre[i] + int(digit[word[i]-'a']-'0')
	}
	count := 0
	for start := 0; start < n; start++ {
		for end := start + 1; end <= n; end++ {
			if (pre[end]-pre[start])%(end-start) == 0 {
				count++
			}
		}
	}
	return count
}
