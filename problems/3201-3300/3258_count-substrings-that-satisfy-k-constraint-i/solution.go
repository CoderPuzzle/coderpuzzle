func countKConstraintSubstrings(s string, k int) int {
	n := len(s)
	answer := 0
	for left := 0; left < n; left++ {
		zeros := 0
		for right := left; right < n; right++ {
			if s[right] == '0' {
				zeros++
			}
			ones := right - left + 1 - zeros
			if zeros <= k || ones <= k {
				answer++
			}
		}
	}
	return answer
}
