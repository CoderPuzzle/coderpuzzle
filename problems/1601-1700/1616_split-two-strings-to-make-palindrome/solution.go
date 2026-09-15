func checkPalindromeFormation(a string, b string) bool {
	return checkSplitCombination(a, b) || checkSplitCombination(b, a)
}

func checkSplitCombination(x string, y string) bool {
	left, right := 0, len(x)-1
	for left < right && x[left] == y[right] {
		left++
		right--
	}
	if left >= right {
		return true
	}
	return isPalindromeRange(x, left, right) || isPalindromeRange(y, left, right)
}

func isPalindromeRange(s string, left int, right int) bool {
	for left < right {
		if s[left] != s[right] {
			return false
		}
		left++
		right--
	}
	return true
}
