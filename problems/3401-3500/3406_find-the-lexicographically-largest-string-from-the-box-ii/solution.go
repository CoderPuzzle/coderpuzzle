// Every piece of every split is a substring of length at most
// n - numFriends + 1, and the largest such substring starts where
// the lexicographically largest suffix starts, truncated to that cap.
func answerString(word string, numFriends int) string {
	n := len(word)
	if numFriends == 1 {
		return word
	}
	limit := n - numFriends + 1
	// Duel for the start of the largest suffix: i is the champion, j the
	// challenger, k the offset at which they currently tie.
	i, j, k := 0, 1, 0
	for j+k < n {
		if word[i+k] == word[j+k] {
			k++
		} else if word[i+k] < word[j+k] {
			// Challenger wins: suffixes i..i+k all lose to j..j+k.
			i += k + 1
			if i >= j {
				j = i + 1
			}
			k = 0
		} else {
			// Champion wins: suffixes j..j+k all lose to i..i+k.
			j += k + 1
			k = 0
		}
	}
	return word[i : i+min(limit, n-i)]
}
