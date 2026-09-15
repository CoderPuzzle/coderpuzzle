class Solution {
  public:
    int numberOfWays(int n) {
        // Count first with the unlimited coins {1, 2, 6}: once b six-coins
        // are set aside, the leftover r is filled freely by one- and
        // two-coins, which gives r / 2 + 1 arrangements per r. The value-4
        // coin exists exactly twice, so its contribution is zero, one, or
        // two indistinguishable copies, each leaving a smaller target for
        // the same count. Exact totals pass a billion, so accumulate in
        // 64-bit and fold the modulus once at the end.
        const long long modulo = 1000000007LL;
        long long total = 0;
        const int fourCopies[] = {0, 4, 8};
        for (int option = 0; option < 3; ++option) {
            for (long long rest = n - fourCopies[option]; rest >= 0; rest -= 6) {
                total += rest / 2 + 1;
            }
        }
        return static_cast<int>(total % modulo);
    }
};
