import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean canIWin(int maxChoosableInteger, int desiredTotal) {
        // Target already reached before any move: the first player wins.
        if (desiredTotal <= 0) {
            return true;
        }
        // The whole pool cannot reach the target, so nobody ever wins.
        if (((long) maxChoosableInteger * (maxChoosableInteger + 1)) / 2 < desiredTotal) {
            return false;
        }
        // State = bitmask of used integers (m <= 20 keeps it to 2^m states);
        // `remaining` is derived from the mask, so memoizing on it suffices.
        Map<Integer, Boolean> memo = new HashMap<>();
        return canWin(0, desiredTotal, maxChoosableInteger, memo);
    }

    private boolean canWin(int state, int remaining, int maxChoosableInteger, Map<Integer, Boolean> memo) {
        Boolean cached = memo.get(state);
        if (cached != null) {
            return cached;
        }
        for (int choice = 1; choice <= maxChoosableInteger; choice++) {
            int bit = 1 << (choice - 1);
            if ((state & bit) != 0) {
                continue;
            }
            // Immediate win on reaching the target, else the move wins
            // exactly when it strands the opponent in a losing state.
            if (choice >= remaining || !canWin(state | bit, remaining - choice, maxChoosableInteger, memo)) {
                memo.put(state, true);
                return true;
            }
        }
        memo.put(state, false);
        return false;
    }
}
