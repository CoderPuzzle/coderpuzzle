// Only 3 candidate letters and at most 2 neighbors to avoid, so one of
// 'a', 'b', 'c' (tried in that fixed order) always works.
func modifyString(s string) string {
	chars := []byte(s)
	n := len(chars)
	for i := 0; i < n; i++ {
		if chars[i] != '?' {
			continue
		}
		for candidate := byte('a'); candidate <= 'c'; candidate++ {
			leftOk := i == 0 || chars[i-1] != candidate
			rightOk := i == n-1 || chars[i+1] != candidate
			if leftOk && rightOk {
				chars[i] = candidate
				break
			}
		}
	}
	return string(chars)
}
