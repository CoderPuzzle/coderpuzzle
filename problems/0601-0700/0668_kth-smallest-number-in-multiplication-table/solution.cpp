class Solution {
  public:
    int findKthNumber(int m, int n, int k) {
        // Smallest x whose count reaches k; it must be an actual table entry,
        // otherwise x - 1 would satisfy the predicate too.
        long long lo = 1, hi = (long long)m * n;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (countAtMost(mid, m, n, k)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

  private:
    // The table is too big to build; its values are orderly enough to count.
    // Row i holds multiples i, 2i, ..., ni — min(x / i, n) of them are <= x.
    bool countAtMost(long long x, int m, int n, int k) {
        long long total = 0;
        for (int i = 1; i <= m; i++) {
            total += min(x / i, (long long)n);
            // Early exit once the count already reaches k.
            if (total >= k) {
                return true;
            }
        }
        return total >= k;
    }
};
