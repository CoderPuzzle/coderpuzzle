class Solution {
  public:
    int countHousePlacements(int n) {
        const long long MOD = 1000000007LL;
        long long prev = 1, curr = 2;
        for (int i = 1; i < n; ++i) {
            long long next = (prev + curr) % MOD;
            prev = curr;
            curr = next;
        }
        return static_cast<int>(curr * curr % MOD);
    }
};
