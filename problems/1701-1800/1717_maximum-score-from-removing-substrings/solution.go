func maximumGain(s string, x int, y int) int {
	removePairs := func(text string, first, second byte, points int) (string, int) {
		// Stack scan: `second` arriving on a top of `first` pops and scores;
		// everything else is pushed. Survivors are the text with every
		// non-overlapping removal of this pattern applied.
		stack := make([]byte, 0, len(text))
		score := 0
		for i := 0; i < len(text); i++ {
			c := text[i]
			if len(stack) > 0 && stack[len(stack)-1] == first && c == second {
				stack = stack[:len(stack)-1]
				score += points
			} else {
				stack = append(stack, c)
			}
		}
		// The residue — including non-a/b characters, which never pair — is
		// exactly what the other pattern's pass sweeps next.
		return string(stack), score
	}
	// Remove the higher-priced pattern first: by exchange, the character left
	// behind still pairs with the other kind, so this never loses.
	if x >= y {
		rest, score1 := removePairs(s, 'a', 'b', x)
		_, score2 := removePairs(rest, 'b', 'a', y)
		return score1 + score2
	}
	rest, score1 := removePairs(s, 'b', 'a', y)
	_, score2 := removePairs(rest, 'a', 'b', x)
	return score1 + score2
}
