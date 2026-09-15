func maxVowels(s string, k int) int {
	isVowel := func(c byte) bool {
		return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
	}
	// count vowels of the first window once; afterwards only the
	// entering letter (i) and the leaving letter (i-k) can change it
	count := 0
	for i := 0; i < k && i < len(s); i++ {
		if isVowel(s[i]) {
			count++
		}
	}
	best := count
	for i := k; i < len(s); i++ {
		if isVowel(s[i]) {
			count++
		}
		if isVowel(s[i-k]) {
			count--
		}
		if count > best {
			best = count
		}
	}
	return best
}
