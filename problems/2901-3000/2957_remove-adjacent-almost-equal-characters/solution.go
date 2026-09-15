func removeAlmostEqualCharacters(word string) int {
	// Scan left to right. Each almost-equal neighbor pair needs one
	// change; by rewriting word[i] to a letter almost-equal to neither
	// neighbor (always available: each neighbor forbids at most 3 of
	// 26 letters) one change settles both the pair behind and the pair
	// ahead of i, so the scan skips two positions after a change.
	ops := 0
	i := 1
	for i < len(word) {
		d := int(word[i]) - int(word[i-1])
		if d < 0 {
			d = -d
		}
		if d <= 1 {
			ops++
			i += 2
		} else {
			i++
		}
	}
	return ops
}
