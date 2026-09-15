// Deletion only lowers counts, so some kept letter ends up with the smallest
// final frequency x and every other kept letter must land in [x, x + k]:
// letters above the window donate their excess, letters below it vanish
// entirely. Trying each letter's original count as x covers the optimum,
// since the winning x is always a count that some letter keeps for free.
func minimumDeletions(word string, k int) int {
	var counts [26]int
	for i := 0; i < len(word); i++ {
		counts[word[i]-'a']++
	}
	best := len(word)
	for _, base := range counts {
		deletions := 0
		for _, cnt := range counts {
			switch {
			case cnt < base:
				deletions += cnt
			case cnt > base+k:
				deletions += cnt - (base + k)
			}
		}
		if deletions < best {
			best = deletions
		}
	}
	return best
}
