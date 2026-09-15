class Solution {
  public:
    int maxCount(std::vector<int> &banned, int n, int maxSum) {
        // Greedy ascending: the cheapest remaining legal integer always
        // leaves at least as much slack as any alternative, so walking
        // 1..n and taking values while the running sum fits is optimal.
        // Bans outside [1, n] are ignored; the sum stays <= maxSum
        // <= 10^9, inside int range.
        std::vector<char> isBanned(n + 1, 0);
        for (int x : banned) {
            if (x <= n) {
                isBanned[x] = 1;
            }
        }
        int count = 0;
        long long total = 0;
        for (int v = 1; v <= n; ++v) {
            if (isBanned[v]) {
                continue;
            }
            if (total + v > maxSum) {
                break;
            }
            total += v;
            ++count;
        }
        return count;
    }
};
