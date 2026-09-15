func smallestSubsequence(s string) string {
	last := make([]int, 26)
	for i := range last {
		last[i] = -1
	}
	for i := 0; i < len(s); i++ {
		last[s[i]-'a'] = i
	}
	used := make([]bool, 26)
	stack := make([]byte, 0, 26)
	for i := 0; i < len(s); i++ {
		ch := s[i]
		if used[ch-'a'] {
			continue
		}
		for n := len(stack); n > 0 && stack[n-1] > ch && last[stack[n-1]-'a'] > i; n = len(stack) {
			used[stack[n-1]-'a'] = false
			stack = stack[:n-1]
		}
		stack = append(stack, ch)
		used[ch-'a'] = true
	}
	return string(stack)
}
