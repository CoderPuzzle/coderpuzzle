import java.util.*;

class Solution {

    public int longestBalanced(String s) {
        int n = s.length();
        // Any single character is balanced, so with n >= 1 the answer is at
        // least 1.
        int best = 1;

        // Case 1 — one distinct letter: balance is vacuous over a run, so
        // track the longest run of equal neighbors.
        int run = 1;
        for (int i = 1; i < n; i++) {
            run = s.charAt(i) == s.charAt(i - 1) ? run + 1 : 1;
            best = Math.max(best, run);
        }

        // Case 2 — two distinct letters x and y: walk the string ignoring
        // the third letter z, keeping the running difference of their counts.
        // Two positions sharing a difference enclose a stretch that balances
        // the pair. Each z restarts the scan (a window through it would carry
        // a third letter), so first-seen slots carry a version stamp that the
        // split bumps instead of clearing the arrays.
        for (int x = 0; x < 3; x++) {
            for (int y = x + 1; y < 3; y++) {
                int z = 3 - x - y;
                int[] first = new int[2 * n + 1];
                int[] stamp = new int[2 * n + 1];
                Arrays.fill(first, -1);
                Arrays.fill(stamp, -1);
                stamp[n] = 0; // difference 0 precedes index 0
                first[n] = -1;
                int version = 0,
                    d = 0;
                for (int i = 0; i < n; i++) {
                    int c = s.charAt(i) - 'a';
                    if (c == z) {
                        version++;
                        d = 0;
                        stamp[n] = version;
                        first[n] = i;
                    } else {
                        d += c == x ? 1 : -1;
                        int v = d + n;
                        if (stamp[v] == version) {
                            best = Math.max(best, i - first[v]);
                        } else {
                            stamp[v] = version;
                            first[v] = i;
                        }
                    }
                }
            }
        }

        // Case 3 — all three letters: hash each prefix's signature
        // (count_b - count_a, count_c - count_a); equal signatures at two
        // prefixes mean the stretch between them changed all three counts by
        // the same amounts. The earliest index per signature maximizes
        // length.
        Map<Long, Integer> sigs = new HashMap<>();
        long width = 2L * n + 1;
        sigs.put((long) n * width + n, -1);
        int ca = 0,
            cb = 0,
            cc = 0;
        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            if (ch == 'a') {
                ca++;
            } else if (ch == 'b') {
                cb++;
            } else {
                cc++;
            }
            long sig = (long) (cb - ca + n) * width + (cc - ca + n);
            Integer j = sigs.get(sig);
            if (j == null) {
                sigs.put(sig, i);
            } else {
                best = Math.max(best, i - j);
            }
        }

        return best;
    }
}
