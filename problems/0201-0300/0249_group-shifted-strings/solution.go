func groupStrings(strings []string) [][]string {
	// Anchored key -> position of its group in the groups slice.
	index := make(map[string]int)
	groups := [][]string{}
	for _, word := range strings {
		// Anchoring on the first letter canonicalizes the shifting sequence:
		// left-shift the word until that letter becomes 'a' — the same gap
		// from it to every letter, mod 26 — so shifted copies produce
		// identical keys and unshiftable strings never collide on one.
		keyBytes := make([]byte, len(word))
		for i := 0; i < len(word); i++ {
			keyBytes[i] = 'a' + (word[i]+26-word[0])%26
		}
		key := string(keyBytes)
		// Every word lands in exactly one bucket, alongside precisely its
		// shifts; a first-seen key opens a new group.
		if idx, ok := index[key]; ok {
			groups[idx] = append(groups[idx], word)
		} else {
			index[key] = len(groups)
			groups = append(groups, []string{word})
		}
	}
	return groups
}
