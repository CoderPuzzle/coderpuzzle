class Solution {

    public String smallestNumber(String num, long t) {
        // A product of nonzero digits only ever carries the primes 2, 3, 5
        // and 7, so any other prime factor in t makes the request impossible.
        int[] primes = { 2, 3, 5, 7 };
        int[] need = new int[4];
        for (int idx = 0; idx < 4; idx++) {
            while (t % primes[idx] == 0) {
                t /= primes[idx];
                need[idx]++;
            }
        }
        if (t != 1) {
            return "-1";
        }
        // Per-digit exponent vectors over the primes (2, 3, 5, 7).
        int[][] vec = new int[10][4];
        for (int d = 2; d <= 9; d++) {
            for (int idx = 0; idx < 4; idx++) {
                for (int rest = d; rest % primes[idx] == 0; rest /= primes[idx]) {
                    vec[d][idx]++;
                }
            }
        }
        int n = num.length();
        // A kept 0 would poison the product, so nothing at or past the first
        // zero can be retained; the prefix sums cover the zero-free head.
        int firstZero = n;
        for (int i = 0; i < n; i++) {
            if (num.charAt(i) == '0') {
                firstZero = i;
                break;
            }
        }
        int[][] prefix = new int[firstZero + 1][4];
        for (int i = 0; i < firstZero; i++) {
            int[] add = vec[num.charAt(i) - '0'];
            for (int k = 0; k < 4; k++) {
                prefix[i + 1][k] = prefix[i][k] + add[k];
            }
        }
        if (firstZero == n && covered(prefix[n], need)) {
            return num;
        }
        // Keep the longest possible prefix and raise exactly one digit: a
        // longer kept prefix always wins, then a smaller raised digit, then
        // a minimal suffix. The shortfall shrinks as the split moves left
        // while the free suffix grows, so the first workable split is the
        // answer, and only a handful of splits near the end can fail.
        for (int i = Math.min(n - 1, firstZero); i >= 0; i--) {
            int free = n - 1 - i;
            for (int d = num.charAt(i) - '0' + 1; d <= 9; d++) {
                int[] r = new int[4];
                for (int k = 0; k < 4; k++) {
                    r[k] = Math.max(0, need[k] - prefix[i][k] - vec[d][k]);
                }
                if (minDigits(r) <= free) {
                    return num.substring(0, i) + (char) ('0' + d) + build(free, r, vec);
                }
            }
        }
        // No same-length number works: the smallest longer zero-free number
        // is leading 1s with just enough covering digits at the very end.
        return build(Math.max(n + 1, minDigits(need)), need, vec);
    }

    // Fewest digits whose product covers r: a 5 or a 7 in r always burns a
    // dedicated digit; among twos and threes, eights carry three twos, nines
    // two threes, and a six trades one of each, and that trade only pays for
    // the first couple of leftovers, so a short scan finds the minimum.
    private int minDigits(int[] r) {
        int best = r[2] + r[3] + (r[0] + 2) / 3 + (r[1] + 1) / 2;
        for (int z = 1; z <= Math.min(Math.min(r[0], r[1]), 5); z++) {
            best = Math.min(best, r[2] + r[3] + z + (r[0] - z + 2) / 3 + (r[1] - z + 1) / 2);
        }
        return best;
    }

    // Lexicographically smallest zero-free string of exactly this length
    // covering r: place the smallest digit that leaves a remainder the
    // positions still open can cover.
    private String build(int length, int[] r, int[][] vec) {
        StringBuilder out = new StringBuilder();
        for (int pos = 0; pos < length; pos++) {
            for (int d = 1; d <= 9; d++) {
                int[] nxt = new int[4];
                for (int k = 0; k < 4; k++) {
                    nxt[k] = Math.max(0, r[k] - vec[d][k]);
                }
                if (minDigits(nxt) <= length - pos - 1) {
                    out.append((char) ('0' + d));
                    r = nxt;
                    break;
                }
            }
        }
        return out.toString();
    }

    private boolean covered(int[] have, int[] need) {
        for (int k = 0; k < 4; k++) {
            if (have[k] < need[k]) {
                return false;
            }
        }
        return true;
    }
}
