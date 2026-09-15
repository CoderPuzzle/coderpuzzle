import "strconv"

func oddString(words []string) string {
	// Encode each word as its difference signature (the n-1 consecutive
	// letter differences); the odd word is the one whose signature appears
	// exactly once.
	count := make(map[string]int)
	sigs := make([]string, len(words))
	for i, w := range words {
		sig := ""
		for j := 1; j < len(w); j++ {
			sig += strconv.Itoa(int(w[j]-w[j-1])) + ","
		}
		sigs[i] = sig
		count[sig]++
	}
	for i, w := range words {
		if count[sigs[i]] == 1 {
			return w
		}
	}
	return ""
}
