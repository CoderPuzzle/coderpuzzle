import java.util.HashSet;
import java.util.Set;

class Solution {

    private int n;
    private Set<String> used;
    private int best;

    public int maxUniqueSplit(String s) {
        n = s.length();
        used = new HashSet<>();
        best = 0;
        walk(s, 0, 0);
        return best;
    }

    private void walk(String s, int start, int count) {
        if (start == n) {
            best = Math.max(best, count);
            return;
        }
        // count so far plus the (n - start) characters still left, each
        // contributing at most one more piece: a bound on what this
        // branch could still reach, cheap to check before it is explored.
        if (count + (n - start) <= best) return;
        for (int end = start + 1; end <= n; ++end) {
            String piece = s.substring(start, end);
            if (used.contains(piece)) continue;
            used.add(piece);
            walk(s, end, count + 1);
            // Undo so the next candidate length starts from the same
            // used-substring state as this one did.
            used.remove(piece);
        }
    }
}
