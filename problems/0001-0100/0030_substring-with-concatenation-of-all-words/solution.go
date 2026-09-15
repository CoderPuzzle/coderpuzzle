import "sort"

func findSubstring(s string, words []string) []int {
	wordLength := len(words[0])
	// Required multiset of words; a window matches when its counts equal it.
	target := map[string]int{}
	for _, word := range words {
		target[word]++
	}
	result := []int{}
	// One sliding window per alignment offset: a match can only start at a
	// position congruent to some r in 0..wordLength-1 modulo wordLength.
	for offset := 0; offset < wordLength; offset++ {
		window := map[string]int{}
		count := 0 // Words currently inside the window.
		left := offset
		for right := offset; right+wordLength <= len(s); right += wordLength {
			word := s[right : right+wordLength]
			if _, ok := target[word]; !ok {
				// A non-word block can never appear in a match, so the
				// window empties and resumes after it.
				window = map[string]int{}
				count = 0
				left = right + wordLength
				continue
			}
			window[word]++
			count++
			// Too many copies of word: release blocks from the left end
			// until the surplus is gone.
			for window[word] > target[word] {
				window[s[left:left+wordLength]]--
				count--
				left += wordLength
			}
			if count == len(words) {
				result = append(result, left)
				// Release the leftmost block so the window can keep sliding
				// toward the next (possibly adjacent) match.
				window[s[left:left+wordLength]]--
				count--
				left += wordLength
			}
		}
	}
	// Each offset emits ascending indices within its residue class; one
	// sort merges the classes into the pinned ascending order.
	sort.Ints(result)
	return result
}
