func isItPossible(word1 string, word2 string) bool {
	// One frequency array per word: any single move shifts exactly two
	// buckets, so its effect on the distinct counts is O(1) to evaluate.
	c1 := [26]int{}
	c2 := [26]int{}
	for k := 0; k < len(word1); k++ {
		c1[word1[k]-'a']++
	}
	for k := 0; k < len(word2); k++ {
		c2[word2[k]-'a']++
	}
	n1, n2 := 0, 0
	for _, v := range c1 {
		if v > 0 {
			n1++
		}
	}
	for _, v := range c2 {
		if v > 0 {
			n2++
		}
	}
	// Try every ordered pair (a, b): letter a leaves word1 and letter b
	// takes its place; equal letters mean the swap changes nothing.
	for a := 0; a < 26; a++ {
		if c1[a] == 0 {
			continue
		}
		for b := 0; b < 26; b++ {
			if c2[b] == 0 {
				continue
			}
			if a == b {
				// Swapping identical letters changes nothing, so this
				// candidate succeeds exactly when the words already tie.
				if n1 == n2 {
					return true
				}
				continue
			}
			d1 := n1 - b2i(c1[a] == 1) + b2i(c1[b] == 0)
			d2 := n2 - b2i(c2[b] == 1) + b2i(c2[a] == 0)
			if d1 == d2 {
				return true
			}
		}
	}
	return false
}

func b2i(v bool) int {
	if v {
		return 1
	}
	return 0
}
