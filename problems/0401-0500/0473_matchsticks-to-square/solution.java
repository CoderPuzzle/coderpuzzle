import java.util.*;

class Solution {

    public boolean makesquare(int[] matchsticks) {
        long total = 0;
        for (int v : matchsticks) total += v;
        // A square is 4 equal-length groups: the total must split evenly
        // and no single stick may exceed the side.
        if (total % 4 != 0) return false;
        long side = total / 4;
        // Descending order places the most constrained sticks first, so a
        // dead end appears after only a few branches.
        Integer[] sticks = new Integer[matchsticks.length];
        for (int i = 0; i < matchsticks.length; i++) sticks[i] = matchsticks[i];
        Arrays.sort(sticks, Collections.reverseOrder());
        if (sticks.length == 0 || sticks[0] > side) return false;
        long[] sides = new long[4];
        return dfs(sticks, sides, side, 0);
    }

    private boolean dfs(Integer[] sticks, long[] sides, long side, int i) {
        if (i == sticks.length) {
            // Guaranteed by the capacity checks + total = 4 * side; kept
            // as a final safety assertion.
            return sides[0] == side && sides[1] == side && sides[2] == side && sides[3] == side;
        }
        long value = sticks[i];
        long[] tried = new long[4];
        int triedCount = 0;
        for (int j = 0; j < 4; j++) {
            // Sides with equal current length are interchangeable — trying
            // one per distinct length skips symmetric states.
            boolean dup = false;
            for (int t = 0; t < triedCount; t++) {
                if (tried[t] == sides[j]) {
                    dup = true;
                    break;
                }
            }
            if (dup) continue;
            tried[triedCount++] = sides[j];
            // Place/recurse/undo on every side with room left.
            if (sides[j] + value <= side) {
                sides[j] += value;
                if (dfs(sticks, sides, side, i + 1)) return true;
                sides[j] -= value;
            }
        }
        return false;
    }
}
