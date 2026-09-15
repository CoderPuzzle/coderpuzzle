func longestValidSubstring(word string, forbidden []string) int {
	banned := make(map[string]struct{}, len(forbidden))
	for _, s := range forbidden {
		banned[s] = struct{}{}
	}
	maxLen := 0
	for s := range banned {
		if len(s) > maxLen {
			maxLen = len(s)
		}
	}
	n := len(word)
	left := 0
	ans := 0
	// Validity is hereditary (shrinking a valid window stays valid), so a
	// two-pointer sweep finds the longest valid substring.
	for right := 0; right < n; right++ {
		// Only suffixes ending at right can be forbidden, each at most maxLen
		// (<= 10) long; nothing before left - 1 can matter since earlier
		// occurrences were already excluded.
		start := right - maxLen
		if left-1 > start {
			start = left - 1
		}
		// Test suffixes shortest-first: the shortest match has the latest
		// start, so jumping left past it yields the largest window that
		// excludes every forbidden occurrence.
		for j := right; j > start; j-- {
			if _, ok := banned[word[j:right+1]]; ok {
				left = j + 1
				break
			}
		}
		if right-left+1 > ans {
			ans = right - left + 1
		}
	}
	return ans
}
