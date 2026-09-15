func twoEditWords(queries []string, dictionary []string) []string {
	// A query survives iff some dictionary word differs in at most two
	// positions; the strings are equal-length, so a position count is all it
	// takes.
	result := []string{}
	for _, q := range queries {
		for _, d := range dictionary {
			if edits(q, d) <= 2 {
				result = append(result, q)
				break
			}
		}
	}
	return result
}

func edits(a, b string) int {
	count := 0
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			count++
		}
	}
	return count
}
