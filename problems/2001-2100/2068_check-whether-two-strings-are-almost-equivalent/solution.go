func checkAlmostEquivalent(word1 string, word2 string) bool {
	var differences [26]int
	for index := 0; index < len(word1); index++ {
		differences[word1[index]-'a']++
		differences[word2[index]-'a']--
	}
	for _, difference := range differences {
		if difference < -3 || difference > 3 {
			return false
		}
	}
	return true
}
