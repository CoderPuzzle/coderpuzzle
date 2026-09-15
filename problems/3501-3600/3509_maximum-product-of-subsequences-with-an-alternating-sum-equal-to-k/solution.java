import java.util.HashSet;
import java.util.Set;

class Solution {

    // Per (parity, sum) we keep every reachable product <= limit, not just
    // the maximum: a larger product can blow past limit on a later multiply
    // while a smaller one survives. Product-0 reachability is tracked
    // separately, since a 0 can only be reached through a subsequence
    // containing a zero, even via products above the limit.
    public int maxProduct(int[] nums, int k, int limit) {
        int total = 0;
        for (int v : nums) {
            total += v;
        }
        if (Math.abs(k) > total) {
            return -1;
        }
        int width = 2 * total + 1;
        Set<Integer>[][] products = new Set[2][width];
        boolean[][] zero = new boolean[2][width];
        boolean[][] reach = new boolean[2][width];
        for (int p = 0; p < 2; p++) {
            for (int i = 0; i < width; i++) {
                products[p][i] = new HashSet<>();
            }
        }
        for (int x : nums) {
            Set<Integer>[][] np = new Set[2][width];
            boolean[][] nz = new boolean[2][width];
            boolean[][] nr = new boolean[2][width];
            // Skipping x keeps every current state.
            for (int p = 0; p < 2; p++) {
                for (int i = 0; i < width; i++) {
                    np[p][i] = new HashSet<>(products[p][i]);
                    nz[p][i] = zero[p][i];
                    nr[p][i] = reach[p][i];
                }
            }
            // Taking x appends it to the subsequence; its sign follows the
            // parity of the current length (even -> +, odd -> -).
            for (int p = 0; p < 2; p++) {
                int sign = p == 0 ? 1 : -1;
                int q = 1 - p;
                for (int i = 0; i < width; i++) {
                    int s = i - total;
                    int ns = s + sign * x;
                    if (ns < -total || ns > total) {
                        continue;
                    }
                    int j = ns + total;
                    if (reach[p][i]) {
                        nr[q][j] = true;
                        if (x == 0) {
                            nz[q][i] = true;
                        } else {
                            for (int prod : products[p][i]) {
                                int newp = prod * x;
                                if (newp <= limit) {
                                    np[q][j].add(newp);
                                }
                            }
                        }
                    }
                    if (zero[p][i]) {
                        nz[q][j] = true;
                    }
                }
            }
            // A fresh subsequence with x as its single (even-index) element.
            if (x == 0) {
                nz[1][total] = true;
                nr[1][total] = true;
            } else {
                nr[1][x + total] = true;
                if (x <= limit) {
                    np[1][x + total].add(x);
                }
            }
            products = np;
            zero = nz;
            reach = nr;
        }
        int ans = -1;
        int idx = k + total;
        if (idx >= 0 && idx < width) {
            for (int p = 0; p < 2; p++) {
                for (int prod : products[p][idx]) {
                    if (prod > ans) {
                        ans = prod;
                    }
                }
                if (zero[p][idx] && ans < 0) {
                    ans = 0;
                }
            }
        }
        return ans;
    }
}
