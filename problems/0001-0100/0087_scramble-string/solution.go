// Memoized recursion over string pairs. Two guards run before any split
// work: identical strings are trivially scrambles, and a pair whose letter
// counts differ can never be one, since swapping blocks of a string only
// rearranges its letters.
func isScramble(s1 string, s2 string) bool {
	memo := map[string]bool{}

	// A scramble never adds or removes a letter, so a count mismatch rules
	// the pair out before any split is tried.
	sameLetters := func(a, b string) bool {
		var counts [26]int
		for i := 0; i < len(a); i++ {
			counts[a[i]-'a']++
		}
		for i := 0; i < len(b); i++ {
			counts[b[i]-'a']--
		}
		return counts == [26]int{}
	}

	// The pair (a + "|" + b) keys the memo; '|' cannot occur in the inputs.
	var solve func(a, b string) bool
	solve = func(a, b string) bool {
		if a == b {
			return true
		}
		if !sameLetters(a, b) {
			return false
		}
		key := a + "|" + b
		answer, seen := memo[key]
		if seen {
			return answer
		}
		n := len(a)
		for i := 1; i < n; i++ {
			// Keep the halves in order: the split of b sits at the same
			// index as the split of a.
			if solve(a[:i], b[:i]) && solve(a[i:], b[i:]) {
				memo[key] = true
				return true
			}
			// Swap the halves: the head of a pairs with the tail of b.
			if solve(a[:i], b[n-i:]) && solve(a[i:], b[:n-i]) {
				memo[key] = true
				return true
			}
		}
		memo[key] = false
		return false
	}

	return solve(s1, s2)
}
