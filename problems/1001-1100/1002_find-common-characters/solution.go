// Fold every word's 26-length letter-count array into a running
// element-wise minimum; a letter absent from any single word is pinned to
// zero from that point on. Reading the surviving counts off from 'a' to
// 'z' builds the answer directly in ascending alphabetical order.
func commonChars(words []string) []string {
	var common [26]int
	for i, word := range words {
		var counts [26]int
		for _, c := range word {
			counts[c-'a']++
		}
		if i == 0 {
			common = counts
		} else {
			for j := 0; j < 26; j++ {
				if counts[j] < common[j] {
					common[j] = counts[j]
				}
			}
		}
	}
	result := []string{}
	for i := 0; i < 26; i++ {
		for k := 0; k < common[i]; k++ {
			result = append(result, string(rune('a'+i)))
		}
	}
	return result
}
