// One piece can hold at most n - numFriends + 1 letters (the other
// numFriends - 1 pieces need one each), and for numFriends > 1 every such
// capped slice really is a piece of some split, so the box's maximum is
// the largest capped slice over all start positions.
func answerString(word string, numFriends int) string {
	if numFriends == 1 {
		return word
	}
	limit := len(word) - numFriends + 1
	best := ""
	for i := 0; i < len(word); i++ {
		end := i + limit
		if end > len(word) {
			end = len(word)
		}
		if candidate := word[i:end]; candidate > best {
			best = candidate
		}
	}
	return best
}
