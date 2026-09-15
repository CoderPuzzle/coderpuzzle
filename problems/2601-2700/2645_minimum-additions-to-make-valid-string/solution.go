func addMinimum(word string) int {
	// Two pointers over word and the repeating pattern "abc": every
	// aligned pattern slot the word fails to consume is a letter that
	// must be inserted there.
	pattern := "abc"
	answer, k, i := 0, 0, 0
	for k < len(word) {
		if word[k] == pattern[i%3] {
			k++
		} else {
			answer++
		}
		i++
	}
	// After the last consumed letter, finish off its cycle.
	return answer + (3-i%3)%3
}
