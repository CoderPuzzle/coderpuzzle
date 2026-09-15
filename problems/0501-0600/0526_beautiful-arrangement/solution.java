import java.util.ArrayList;
import java.util.List;

class Solution {

    public int countArrangement(int n) {
        // candidates[p]: the values position p admits — the divisors of p
        // and the multiples of p up to n, the only values that can satisfy
        // either divisibility condition at that position.
        List<List<Integer>> candidates = new ArrayList<>();
        for (int p = 0; p <= n; ++p) candidates.add(new ArrayList<>());
        for (int p = 1; p <= n; ++p) {
            for (int v = 1; v <= n; ++v) {
                if (v % p == 0 || p % v == 0) candidates.get(p).add(v);
            }
        }
        return fill(1, n, candidates, new boolean[n + 1]);
    }

    // Every position holds a value: one complete beautiful arrangement.
    private int fill(int pos, int n, List<List<Integer>> candidates, boolean[] used) {
        if (pos > n) return 1;
        int total = 0;
        for (int v : candidates.get(pos)) {
            if (!used[v]) {
                used[v] = true;
                total += fill(pos + 1, n, candidates, used);
                used[v] = false;
            }
        }
        return total;
    }
}
