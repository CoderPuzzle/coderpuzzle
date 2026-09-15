func canIWin(maxChoosableInteger int, desiredTotal int) bool {
	// Target already reached before any move: the first player wins.
	if desiredTotal <= 0 {
		return true
	}
	// The whole pool cannot reach the target, so nobody ever wins.
	if maxChoosableInteger*(maxChoosableInteger+1)/2 < desiredTotal {
		return false
	}
	// State = bitmask of used integers (m <= 20 keeps it to 2^m states);
	// `remaining` is derived from the mask, so memoizing on it suffices.
	memo := make([]int8, 1<<uint(maxChoosableInteger))
	for i := range memo {
		memo[i] = -1
	}

	var canWin func(state int, remaining int) bool
	canWin = func(state int, remaining int) bool {
		if memo[state] != -1 {
			return memo[state] == 1
		}
		for choice := 1; choice <= maxChoosableInteger; choice++ {
			bit := 1 << uint(choice-1)
			if state&bit != 0 {
				continue
			}
			// Immediate win on reaching the target, else the move wins
			// exactly when it strands the opponent in a losing state.
			if choice >= remaining || !canWin(state|bit, remaining-choice) {
				memo[state] = 1
				return true
			}
		}
		memo[state] = 0
		return false
	}

	return canWin(0, desiredTotal)
}
