import java.util.Arrays;

class Solution {

    public int maximumTastiness(int[] price, int k) {
        // In a sorted selection the minimum pairwise gap always occurs between
        // adjacent picks, so sorting once reduces the problem to chain gaps.
        int[] p = price.clone();
        Arrays.sort(p);
        // "Every gap >= x is achievable" is monotone in x, so binary search
        // the largest feasible x over [0, max-min]; the upper-mid +1 keeps
        // lo = mid from stalling. Identical prices converge to lo = 0.
        int lo = 0,
            hi = p[p.length - 1] - p[0];
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(p, k, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean feasible(int[] p, int k, int x) {
        // Leftmost greedy: take the first candy, then each candy at least x
        // above the last taken one. Postponing a pick can only shrink the room
        // left for later picks, so this maximizes how many candies fit.
        int count = 1;
        int last = p[0];
        for (int i = 1; i < p.length; i++) {
            if (p[i] - last >= x) {
                count++;
                last = p[i];
            }
        }
        return count >= k;
    }
}
