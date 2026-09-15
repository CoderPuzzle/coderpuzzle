class Solution {
  public:
    // A group is happy when the donut count before it is 0 mod batchSize,
    // so the ordering matters only through remainders. Remainder-0 groups
    // are always happy, complementary remainders pair into zero-sum
    // blocks, and the memoized DP places what is left. Each remainder
    // class count fits 5 bits (n <= 30), so a packed state key fits
    // comfortably in a long long.
    int maxHappyGroups(int batchSize, vector<int> &groups) {
        int k = batchSize;
        vector<int> freq(k, 0);
        for (int g : groups) {
            freq[g % k]++;
        }
        int ans = freq[0];
        freq[0] = 0;
        for (int i = 1, j = k - 1; i < j; i++, j--) {
            int m = min(freq[i], freq[j]);
            ans += m;
            freq[i] -= m;
            freq[j] -= m;
        }
        if (k % 2 == 0) {
            int h = k / 2;
            ans += freq[h] / 2;
            freq[h] %= 2;
        }
        long long state = 0;
        for (int c = 1; c < k; c++) {
            state |= (long long)freq[c] << (5 * (c - 1));
        }
        unordered_map<long long, int> memo;
        return ans + dp(memo, state, 0, k);
    }

  private:
    int dp(unordered_map<long long, int> &memo, long long state, int r, int k) {
        if (state == 0) {
            return 0;
        }
        long long key = (state << 4) | r;
        auto it = memo.find(key);
        if (it != memo.end()) {
            return it->second;
        }
        int best = 0;
        for (int c = 1; c < k; c++) {
            int count = (int)((state >> (5 * (c - 1))) & 31);
            if (count > 0) {
                int gain = r == 0 ? 1 : 0;
                int cand = gain + dp(memo, state - (1LL << (5 * (c - 1))), (r + c) % k, k);
                best = max(best, cand);
            }
        }
        memo[key] = best;
        return best;
    }
};
