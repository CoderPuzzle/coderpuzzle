import "sort"

// Bottom-up DP over prefix reachability: reachable[i] says the first i
// characters of s split into dictionary words. The empty prefix is reachable,
// and the answer is reachable[len(s)].
func wordBreak(s string, wordDict []string) bool {
	words := make(map[string]bool, len(wordDict))
	lengthSet := make(map[int]bool)
	for _, word := range wordDict {
		words[word] = true
		lengthSet[len(word)] = true
	}
	lengths := make([]int, 0, len(lengthSet))
	for length := range lengthSet {
		lengths = append(lengths, length)
	}
	sort.Ints(lengths)
	reachable := make([]bool, len(s)+1)
	reachable[0] = true
	for i := 1; i <= len(s); i++ {
		for _, length := range lengths {
			if length > i {
				break
			}
			// Position i ends a word exactly when the prefix before it is
			// reachable and the slice ending here is a dictionary word.
			if reachable[i-length] && words[s[i-length:i]] {
				reachable[i] = true
				break
			}
		}
	}
	return reachable[len(s)]
}
