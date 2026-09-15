func firstPalindrome(words []string) string {
	for _, word := range words {
		left, right := 0, len(word)-1
		for left < right && word[left] == word[right] {
			left++
			right--
		}
		if left >= right {
			return word
		}
	}
	return ""
}
