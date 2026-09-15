func areSentencesSimilarTwo(sentence1 []string, sentence2 []string, similarPairs [][]string) bool {
	// Different lengths can never be similar.
	if len(sentence1) != len(sentence2) {
		return false
	}

	parent := map[string]string{}
	var find func(string) string
	// Unseen words register as their own singleton component; path compression
	// keeps the structure flat.
	find = func(x string) string {
		p, ok := parent[x]
		if !ok {
			parent[x] = x
			return x
		}
		if p == x {
			return x
		}
		parent[x] = parent[p]
		return find(parent[x])
	}
	union := func(a, b string) {
		ra, rb := find(a), find(b)
		if ra != rb {
			parent[ra] = rb
		}
	}

	// Symmetry + transitivity: similar exactly when identical or in the
	// same component, so unioning the pairs captures the whole relation.
	for _, pair := range similarPairs {
		union(pair[0], pair[1])
	}

	for i := range sentence1 {
		// Identical words pass; otherwise the roots must agree.
		if sentence1[i] != sentence2[i] && find(sentence1[i]) != find(sentence2[i]) {
			return false
		}
	}
	return true
}
