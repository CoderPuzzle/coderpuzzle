function canIWin(maxChoosableInteger: number, desiredTotal: number): boolean {
    // Target already reached before any move: the first player wins.
    if (desiredTotal <= 0) {
        return true;
    }
    // The whole pool cannot reach the target, so nobody ever wins.
    if ((maxChoosableInteger * (maxChoosableInteger + 1)) / 2 < desiredTotal) {
        return false;
    }
    // State = bitmask of used integers (m <= 20 keeps it to 2^m states);
    // `remaining` is derived from the mask, so memoizing on it suffices.
    const memo = new Map<number, boolean>();

    const canWin = (state: number, remaining: number): boolean => {
        const cached = memo.get(state);
        if (cached !== undefined) {
            return cached;
        }
        for (let choice = 1; choice <= maxChoosableInteger; choice++) {
            const bit = 1 << (choice - 1);
            if (state & bit) {
                continue;
            }
            // Immediate win on reaching the target, else the move wins
            // exactly when it strands the opponent in a losing state.
            if (choice >= remaining || !canWin(state | bit, remaining - choice)) {
                memo.set(state, true);
                return true;
            }
        }
        memo.set(state, false);
        return false;
    };

    return canWin(0, desiredTotal);
}
