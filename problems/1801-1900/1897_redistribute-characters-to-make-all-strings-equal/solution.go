func makeEqual(words []string) bool {
	// Pool all letters; n equal strings need each count % n == 0.
	n := len(words)
	var counts [26]int
	for _, w := range words {
		for i := 0; i < len(w); i++ {
			counts[w[i]-'a']++
		}
	}
	for _, c := range counts {
		if c%n != 0 {
			return false
		}
	}
	return true
}
