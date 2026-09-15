import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int[] minDifference(int n, int k) {
        // Trial division up to sqrt(n) gathers each divisor pair (d, n / d);
        // sorted ascending, they are the only values a decomposition can use.
        List<Integer> divs = new ArrayList<>();
        for (long d = 1; d * d <= n; d++) {
            if (n % d == 0) {
                divs.add((int) d);
                if (d * d != n) {
                    divs.add(n / (int) d);
                }
            }
        }
        Collections.sort(divs);

        // Building factors in nondecreasing order makes the search visit
        // complete splits in lexicographic order, so replacing the best only
        // on a strictly smaller spread pins the lexicographically smallest
        // optimal split.
        int[] best = new int[k];
        int[] path = new int[Math.max(k - 1, 1)];
        long[] bestSpread = { Long.MAX_VALUE };
        dfs(divs, best, path, bestSpread, n, k, 0, 0, 1);
        return best;
    }

    private void dfs(
        List<Integer> divs,
        int[] best,
        int[] path,
        long[] bestSpread,
        int n,
        int slots,
        int depth,
        int start,
        long prod
    ) {
        if (slots == 1) {
            // The last factor is forced to carry the product up to n; it
            // completes a nondecreasing split exactly when it reaches the
            // last pick. Both ends of the spread then sit on the path.
            int last = (int) (n / prod);
            if (prod * last == n && (depth == 0 || last >= path[depth - 1])) {
                long spread = depth == 0 ? 0 : last - path[0];
                if (spread < bestSpread[0]) {
                    bestSpread[0] = spread;
                    System.arraycopy(path, 0, best, 0, depth);
                    best[depth] = last;
                }
            }
            return;
        }
        for (int i = start; i < divs.size(); i++) {
            int dv = divs.get(i);
            if (prod * dv > n) {
                break;
            }
            path[depth] = dv;
            dfs(divs, best, path, bestSpread, n, slots - 1, depth + 1, i, prod * dv);
        }
    }
}
