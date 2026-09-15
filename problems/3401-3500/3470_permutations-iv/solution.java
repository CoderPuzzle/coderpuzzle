class Solution {

    public int[] permute(int n, long k) {
        // Counts only ever face comparison against k (<= 1e15), so the
        // factorials may saturate at a cap above 1e15: a saturated count
        // still reads as "more permutations than k needs".
        final long cap = 2_000_000_000_000_000L;
        int half = (n + 1) / 2;
        long[] fact = new long[half + 1];
        for (int i = 0; i <= half; ++i) {
            fact[i] = 1L;
        }
        for (int i = 2; i <= half; ++i) {
            fact[i] = mulCap(fact[i - 1], i, cap);
        }
        int[] result = new int[n];
        // One flag per value: the greedy consumes each of 1..n at most once.
        boolean[] used = new boolean[n + 1];
        int oddsLeft = (n + 1) / 2;
        int evensLeft = n / 2;
        int lastParity = -1;
        for (int depth = 0; depth < n; ++depth) {
            // Ascending candidates: skip past the ones whose completion
            // count is too small to still hold k, reducing k by their size.
            boolean placed = false;
            for (int value = 1; value <= n; ++value) {
                if (used[value] || value % 2 == lastParity) {
                    continue;
                }
                int odd = oddsLeft - (value % 2);
                int even = evensLeft - (1 - (value % 2));
                // Once this value lands, the remaining parity pattern is
                // forced: the slots alternate starting with the opposite
                // parity, so the count is odd! * even! exactly when the
                // leftover values fit that pattern, and 0 otherwise.
                int rest = n - depth - 1;
                int oddSlots = (rest + 1 - (value % 2)) / 2;
                long ways = 0;
                if (oddSlots == odd && rest - oddSlots == even) {
                    ways = mulCap(fact[odd], fact[even], cap);
                }
                if (ways >= k) {
                    used[value] = true;
                    result[depth] = value;
                    if (value % 2 == 1) {
                        --oddsLeft;
                    } else {
                        --evensLeft;
                    }
                    lastParity = value % 2;
                    placed = true;
                    break;
                }
                k -= ways;
            }
            if (!placed) {
                // Fewer than k alternating permutations exist.
                return new int[] {};
            }
        }
        return result;
    }

    // Saturating product: a result above the cap is indistinguishable from
    // the cap itself, so the guard avoids overflowing long before multiplying.
    private static long mulCap(long a, long b, long cap) {
        return a > cap / b ? cap : a * b;
    }
}
