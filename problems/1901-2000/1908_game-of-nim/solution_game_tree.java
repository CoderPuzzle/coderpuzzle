import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public boolean nimGame(int[] piles) {
        // Game-tree DP: the mover with no stones left to take loses, and a
        // position is won exactly when some move — pick a pile, reduce it —
        // strands the opponent on a lost position. Memoize on the sorted
        // pile vector: pile order never changes the move options, so every
        // distinct position is decided exactly once.
        List<Integer> state = new ArrayList<>();
        for (int p : piles) {
            state.add(p);
        }
        Collections.sort(state);
        return wins(state, new HashMap<>());
    }

    private boolean wins(List<Integer> state, Map<List<Integer>, Boolean> memo) {
        Boolean known = memo.get(state);
        if (known != null) return known;
        for (int i = 0; i < state.size(); ++i) {
            int remain = state.get(i);
            for (int take = 1; take <= remain; ++take) {
                List<Integer> nxt = new ArrayList<>(state);
                nxt.set(i, remain - take);
                Collections.sort(nxt);
                if (!wins(nxt, memo)) {
                    memo.put(state, true);
                    return true;
                }
            }
        }
        memo.put(state, false);
        return false;
    }
}
