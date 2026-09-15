func vowelStrings(words []string, queries [][]int) []int {
	// Prefix sums over the vowel-string marks: prefix[i+1] counts the
	// strings among words[0..i] that start and end with a vowel, so a
	// query [l, r] costs one subtraction. Counts stay below words
	// length <= 10^5, well inside 32 bits.
	isVowel := func(c byte) bool {
		switch c {
		case 'a', 'e', 'i', 'o', 'u':
			return true
		}
		return false
	}
	prefix := make([]int, len(words)+1)
	for i, w := range words {
		good := 0
		if isVowel(w[0]) && isVowel(w[len(w)-1]) {
			good = 1
		}
		prefix[i+1] = prefix[i] + good
	}
	ans := make([]int, len(queries))
	for i, q := range queries {
		ans[i] = prefix[q[1]+1] - prefix[q[0]]
	}
	return ans
}
