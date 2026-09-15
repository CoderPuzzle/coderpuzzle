import java.util.Arrays;

class Solution {

    public int findContentChildren(int[] g, int[] s) {
        // Both sorted ascending, the least greedy unfed child faces the
        // smallest unassigned cookie: the cheapest pairing worth trying.
        Arrays.sort(g);
        Arrays.sort(s);
        int child = 0;
        for (int cookie : s) {
            // A cookie too small for the least greedy remaining child is too
            // small for everyone remaining — skip it. Otherwise feed it.
            if (child < g.length && cookie >= g[child]) {
                ++child;
            }
        }
        return child;
    }
}
