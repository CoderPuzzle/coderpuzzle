func kSimilarity(s1 string, s2 string) int {
	type item struct {
		s     string
		steps int
	}
	// Each swap is a move between strings, so BFS from s1 yields
	// the minimum swap count.
	queue := []item{{s1, 0}}
	seen := map[string]bool{s1: true}
	for head := 0; head < len(queue); head++ {
		cur := queue[head]
		s := cur.s
		if s == s2 {
			return cur.steps
		}
		b := []byte(s)
		// Always fix the leftmost mismatch first: some optimal
		// solution does, and the rule prunes the branching.
		i := 0
		for b[i] == s2[i] {
			i++
		}
		for j := i + 1; j < len(s); j++ {
			// Install s2's letter at i, and never break an
			// already-matching j — such a swap is never minimal.
			if s[j] == s2[i] && s[j] != s2[j] {
				b[i], b[j] = b[j], b[i]
				ns := string(b)
				b[i], b[j] = b[j], b[i]
				// Only novel strings join the queue; matched
				// positions are never touched again.
				if !seen[ns] {
					seen[ns] = true
					queue = append(queue, item{ns, cur.steps + 1})
				}
			}
		}
	}
	// Unreachable: anagrams are always convertible.
	return -1
}
