func minLengthAfterRemovals(s string) int {
	// Every operation deletes one 'a' together with one 'b', so the
	// difference between the two counts never changes; while both letters
	// remain some adjacent pair differs, and deleting such pairs one after
	// another boils the string down to exactly that difference.
	countA := 0
	for i := 0; i < len(s); i++ {
		if s[i] == 'a' {
			countA++
		}
	}
	countB := len(s) - countA
	if countA >= countB {
		return countA - countB
	}
	return countB - countA
}
