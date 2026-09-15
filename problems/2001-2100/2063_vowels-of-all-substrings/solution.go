func countVowels(word string) int64 {
	var total int64
	for index := 0; index < len(word); index++ {
		if isVowel(word[index]) {
			total += int64(index+1) * int64(len(word)-index)
		}
	}
	return total
}

func isVowel(character byte) bool {
	return character == 'a' || character == 'e' || character == 'i' || character == 'o' || character == 'u'
}
