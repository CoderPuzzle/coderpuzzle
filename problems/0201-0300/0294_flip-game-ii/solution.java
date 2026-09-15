import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public boolean canWin(String currentState) {
        // The player to move wins exactly when some flip of a "++" hands the
        // opponent a position from which they cannot win; a position with no
        // "++" left is a loss. A flip never crosses a '-', so the game
        // decomposes into independent '+'-runs: memoize on the sorted lengths
        // of the live runs (>= 2), which alone decide the position.
        Map<List<Integer>, Boolean> memo = new HashMap<>();
        List<Integer> runs = new ArrayList<>();
        for (String run : currentState.split("-", -1)) {
            if (!run.isEmpty()) runs.add(run.length());
        }
        return canWin(runs, memo);
    }

    private boolean canWin(List<Integer> runs, Map<List<Integer>, Boolean> memo) {
        List<Integer> live = new ArrayList<>();
        for (int run : runs) {
            if (run >= 2) live.add(run);
        }
        Collections.sort(live);
        Boolean cached = memo.get(live);
        if (cached != null) return cached;
        boolean winner = false;
        for (int index = 0; index < live.size() && !winner; ++index) {
            int run = live.get(index);
            List<Integer> others = new ArrayList<>(live);
            others.remove(index);
            // Flipping spot i inside `run` leaves runs i and run-2-i; the
            // mirror split makes the same successor, so half the range.
            for (int i = 0; i <= (run - 2) / 2 && !winner; ++i) {
                List<Integer> next = new ArrayList<>(others);
                if (i >= 2) next.add(i);
                if (run - 2 - i >= 2) next.add(run - 2 - i);
                if (!canWin(next, memo)) winner = true;
            }
        }
        memo.put(live, winner);
        return winner;
    }
}
