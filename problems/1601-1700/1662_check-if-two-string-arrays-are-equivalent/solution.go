// Walk both arrays with an array index plus an offset inside the current
// element: the two concatenated streams are compared one character at a
// time, never materialized.
func arrayStringsAreEqual(word1 []string, word2 []string) bool {
	array1, offset1 := 0, 0
	array2, offset2 := 0, 0
	for array1 < len(word1) && array2 < len(word2) {
		if word1[array1][offset1] != word2[array2][offset2] {
			return false
		}
		offset1++
		if offset1 == len(word1[array1]) {
			array1++
			offset1 = 0
		}
		offset2++
		if offset2 == len(word2[array2]) {
			array2++
			offset2 = 0
		}
	}
	// Equal only if both walks exhausted together: an unfinished array
	// means its concatenation is strictly longer.
	return array1 == len(word1) && array2 == len(word2)
}
