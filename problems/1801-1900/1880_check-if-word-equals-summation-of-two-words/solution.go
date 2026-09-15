func isSumEqual(firstWord string, secondWord string, targetWord string) bool {
	// Letter values are single decimal digits, so a positional fold
	// (v = v*10 + d) reproduces the concatenated-digit integer.
	val := func(w string) int64 {
		var v int64
		for i := 0; i < len(w); i++ {
			v = v*10 + int64(w[i]-'a')
		}
		return v
	}
	return val(firstWord)+val(secondWord) == val(targetWord)
}
