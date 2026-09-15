import "sort"

func findRepeatedDnaSequences(s string) []string {
	seen := make(map[string]bool)
	// A second set collects each repeated window exactly once, even when it
	// occurs three or more times.
	repeated := make(map[string]bool)
	// Slide a fixed 10-letter window; the loop bound yields no full window
	// (hence an empty result) for strings shorter than 10.
	for i := 0; i+10 <= len(s); i++ {
		seq := s[i : i+10]
		if seen[seq] {
			// Already seen: this window occurs at least twice.
			repeated[seq] = true
		} else {
			seen[seq] = true
		}
	}
	// Sorted output for a deterministic order.
	result := make([]string, 0, len(repeated))
	for seq := range repeated {
		result = append(result, seq)
	}
	sort.Strings(result)
	return result
}
