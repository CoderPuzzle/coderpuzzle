func canAliceWin(a []string, b []string) bool {
	// A legal reply depends only on the last played word: it must be
	// lexicographically greater and start with the same letter or the
	// next one, and every earlier play is <= that word, so words are
	// never replayed. Handing the opponent a larger threshold never
	// helps them (their reply options only shrink), so inside one letter
	// a player always answers with their largest remaining word there,
	// and a jump into the next letter is played at that letter's largest
	// word. After a player spends their largest word of a letter they
	// can never play in that letter again, so the fight in each letter
	// above the first is one reply long: enter with your max, opponent
	// answers with theirs or exits upward, entrant exits upward or
	// loses.
	//
	// Sweep letters top-down with enter[c] = "the player who enters this
	// letter with their largest word wins", then resolve Bob's two
	// options at the forced opener a[0]: answer inside the letter or
	// jump to the next letter at once.
	var maxA, maxB [26]string
	var hasA, hasB [26]bool
	for _, w := range a {
		maxA[w[0]-'a'] = w
		hasA[w[0]-'a'] = true
	}
	for _, w := range b {
		maxB[w[0]-'a'] = w
		hasB[w[0]-'a'] = true
	}
	var entA, entB [26]bool
	for c := 25; c >= 0; c-- {
		hasNext := c < 25
		if hasA[c] {
			bobExit := hasNext && hasB[c+1] && entB[c+1]
			bobStay := hasB[c] && maxB[c] > maxA[c] &&
				!(hasNext && hasA[c+1] && entA[c+1])
			entA[c] = !(bobExit || bobStay)
		}
		if hasB[c] {
			aliceExit := hasNext && hasA[c+1] && entA[c+1]
			aliceStay := hasA[c] && maxA[c] > maxB[c] &&
				!(hasNext && hasB[c+1] && entB[c+1])
			entB[c] = !(aliceExit || aliceStay)
		}
	}
	c0 := a[0][0] - 'a'
	bobExit := c0 < 25 && hasB[c0+1] && entB[c0+1]
	battle := false
	if b1 := maxB[c0]; hasB[c0] && b1 > a[0] {
		aliceExit := c0 < 25 && hasA[c0+1] && entA[c0+1]
		a1Wins := hasA[c0] && maxA[c0] > b1 && !bobExit
		battle = !(a1Wins || aliceExit)
	}
	return !(bobExit || battle)
}
