func isAlienSorted(words []string, order string) bool {
	// Rank of every letter under the alien alphabet.
	var rank [26]int
	for index := 0; index < len(order); index++ {
		rank[order[index]-'a'] = index
	}
	// Adjacent pairs decide the whole list: any out-of-order pair
	// falsifies it, and each pair's verdict is final.
	for i := 0; i+1 < len(words); i++ {
		first, second := words[i], words[i+1]
		// March to the first differing position — the only one that
		// orders this pair.
		length := len(first)
		if len(second) < length {
			length = len(second)
		}
		j := 0
		for j < length && first[j] == second[j] {
			j++
		}
		// A shared prefix: the shorter word is smaller, so only the
		// left word may be short; otherwise the first differing
		// letters decide, and the left word must lose that duel.
		if j == length {
			if len(first) > len(second) {
				return false
			}
		} else if rank[first[j]-'a'] > rank[second[j]-'a'] {
			return false
		}
	}
	return true
}
