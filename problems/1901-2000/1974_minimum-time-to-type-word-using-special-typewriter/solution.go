// The pointer sits on a 26-letter ring. Between two consecutive letters
// there are only two arcs — clockwise and counterclockwise — and the
// cheaper one is always optimal, because the cost to type every future
// character does not depend on which arc was taken (only the final
// position matters, which is the same either way). Sum the cheaper arc
// for each letter, then add one second per character for typing it.
func minTimeToType(word string) int {
	seconds := len(word)
	pos := 0 // pointer starts on 'a'
	for i := 0; i < len(word); i++ {
		target := int(word[i] - 'a')
		diff := target - pos
		if diff < 0 {
			diff = -diff
		}
		if diff > 26-diff {
			diff = 26 - diff
		}
		seconds += diff
		pos = target
	}
	return seconds
}
