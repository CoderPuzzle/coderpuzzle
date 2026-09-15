func minOperations(s string) int {
	// Every occurrence of the chosen letter advances one step per
	// operation, so a letter whose zero-based alphabet index is i needs
	// (26 - i) % 26 operations of its own to reach 'a'. Driving the
	// letter with the largest remaining distance lets slower letters
	// catch up, merge, and ride along, so nothing beyond that largest
	// distance is ever paid.
	best := 0
	for _, ch := range s {
		if need := (26 - int(ch-'a')) % 26; need > best {
			best = need
		}
	}
	return best
}
