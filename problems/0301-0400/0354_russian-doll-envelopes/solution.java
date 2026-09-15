import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxEnvelopes(int[][] envelopes) {
        List<int[]> sorted = new ArrayList<>();
        for (int[] e : envelopes) sorted.add(e);
        // Width ascending, height descending on ties: a chain needs strictly
        // increasing widths, so at most one envelope per width fits, and the
        // descending tie-break keeps equal widths from chaining among
        // themselves — the task reduces to LIS on heights.
        sorted.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(b[1], a[1]));
        // Patience sorting: tails[i] = min height ending a chain of length i+1.
        List<Integer> tails = new ArrayList<>();
        for (int[] e : sorted) {
            int x = e[1];
            // Lower-bound search enforces STRICT increase (rejects equal
            // heights); extend the longest chain or replace the first >=
            // tail — safe, it only helps future extensions.
            int lo = 0,
                hi = tails.size();
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails.get(mid) < x) lo = mid + 1;
                else hi = mid;
            }
            if (lo == tails.size()) tails.add(x);
            else tails.set(lo, x);
        }
        return tails.size();
    }
}
