func countCharacters(words []string, chars string) int {
	var have [26]int
	for i := 0; i < len(chars); i++ {
		have[chars[i]-'a']++
	}
	total := 0
	for _, word := range words {
		var need [26]int
		for i := 0; i < len(word); i++ {
			need[word[i]-'a']++
		}
		ok := true
		for i := 0; i < 26; i++ {
			if need[i] > have[i] {
				ok = false
				break
			}
		}
		if ok {
			total += len(word)
		}
	}
	return total
}
