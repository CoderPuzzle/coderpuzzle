func longestPalindrome(words []string) int {
	waiting := [26][26]int{}
	length := 0
	for _, word := range words {
		first := int(word[0] - 'a')
		second := int(word[1] - 'a')
		if waiting[second][first] > 0 {
			waiting[second][first]--
			length += 4
		} else {
			waiting[first][second]++
		}
	}
	for letter := 0; letter < 26; letter++ {
		if waiting[letter][letter] > 0 {
			return length + 2
		}
	}
	return length
}
