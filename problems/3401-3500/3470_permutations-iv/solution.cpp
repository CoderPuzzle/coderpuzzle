class Solution {
  public:
    vector<int> permute(int n, long long k) {
        // Counts only ever face comparison against k (<= 1e15), so the
        // factorials may saturate at a cap above 1e15: a saturated count
        // still reads as "more permutations than k needs".
        const long long cap = 2000000000000000LL;
        int half = (n + 1) / 2;
        vector<long long> fact(half + 1, 1);
        for (int i = 2; i <= half; ++i) {
            fact[i] = mulCap(fact[i - 1], i, cap);
        }
        vector<int> result;
        // One flag per value: the greedy consumes each of 1..n at most once.
        vector<bool> used(n + 1, false);
        int odds_left = (n + 1) / 2;
        int evens_left = n / 2;
        int last_parity = -1;
        for (int depth = 0; depth < n; ++depth) {
            // Ascending candidates: skip past the ones whose completion
            // count is too small to still hold k, reducing k by their size.
            bool placed = false;
            for (int value = 1; value <= n; ++value) {
                if (used[value] || value % 2 == last_parity) {
                    continue;
                }
                int odd = odds_left - (value % 2);
                int even = evens_left - (1 - value % 2);
                // Once this value lands, the remaining parity pattern is
                // forced: the slots alternate starting with the opposite
                // parity, so the count is odd! * even! exactly when the
                // leftover values fit that pattern, and 0 otherwise.
                int rest = n - depth - 1;
                int odd_slots = (rest + 1 - value % 2) / 2;
                long long ways = 0;
                if (odd_slots == odd && rest - odd_slots == even) {
                    ways = mulCap(fact[odd], fact[even], cap);
                }
                if (ways >= k) {
                    used[value] = true;
                    result.push_back(value);
                    if (value % 2 == 1) {
                        --odds_left;
                    } else {
                        --evens_left;
                    }
                    last_parity = value % 2;
                    placed = true;
                    break;
                }
                k -= ways;
            }
            if (!placed) {
                // Fewer than k alternating permutations exist.
                return {};
            }
        }
        return result;
    }

  private:
    // Saturating product: a result above the cap is indistinguishable from
    // the cap itself, so the guard avoids overflowing long long first.
    static long long mulCap(long long a, long long b, long long cap) { return a > cap / b ? cap : a * b; }
};
