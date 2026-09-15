class Solution {
  public:
    long long maximumBooks(vector<int> &books) {
        int n = (int)books.size();
        // dp[i] = best total of a strictly increasing chain ending at i;
        // the rightmost shelf gives everything, so each take is books[i]-(i-x).
        vector<long long> dp(n, 0);
        // Monotonic stack of barrier candidates (nearest j where the chain dies).
        vector<int> stack;
        stack.reserve(n);
        long long best = 0;
        for (int i = 0; i < n; i++) {
            long long bi = books[i];
            // Pop shelves x that still fit the demand books[i] - (i - x):
            // any future chain stopping past them stops at or before i.
            while (!stack.empty() && books[stack.back()] >= bi - (i - stack.back())) {
                stack.pop_back();
            }
            // Remaining top is the nearest barrier j; the chain covers j+1..i.
            int j = stack.empty() ? -1 : stack.back();
            long long length;
            if (j >= 0) {
                length = i - j;
            } else {
                // No barrier: the chain runs to shelf 0, but a shelf cannot
                // demand fewer than one book, so it caps at min(i, books[i])+1.
                length = min((long long)i, bi) + 1; // stop where the sequence would go negative
            }
            // Arithmetic sum of the run, spliced with dp[j]: shelf j tops out
            // strictly below the demanded value, so the two chains join validly.
            long long s = length * bi - length * (length - 1) / 2;
            dp[i] = s + (j >= 0 ? dp[j] : 0);
            if (dp[i] > best) {
                best = dp[i];
            }
            stack.push_back(i);
        }
        return best;
    }
};
