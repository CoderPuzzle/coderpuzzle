func generatePossibleNextMoves(currentState string) []string {
	states := []string{}
	// One left-to-right scan: every position whose two characters are
	// both '+' is exactly one legal move, and ascending i emits the
	// states in the pinned order — the earlier flipped pair first.
	for i := 0; i+1 < len(currentState); i++ {
		if currentState[i] == '+' && currentState[i+1] == '+' {
			// Keep both ends of the string, burn only the pair.
			states = append(states, currentState[:i]+"--"+currentState[i+2:])
		}
	}
	// Non-nil from the start, so a board with no "++" serializes as [], not null.
	return states
}
