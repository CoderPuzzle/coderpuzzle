func nextBeautifulNumber(n int) int {
	for candidate := n + 1; ; candidate++ {
		if isBalanced(candidate) {
			return candidate
		}
	}
}

func isBalanced(value int) bool {
	counts := [10]int{}
	for value > 0 {
		digit := value % 10
		if digit == 0 {
			return false
		}
		counts[digit]++
		value /= 10
	}
	for digit := 1; digit < 10; digit++ {
		if counts[digit] != 0 && counts[digit] != digit {
			return false
		}
	}
	return true
}
