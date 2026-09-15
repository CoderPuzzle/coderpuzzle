class Solution {
  public:
    int getLargestOutlier(vector<int> &nums) {
        // With specials summing to S and outlier o, the array total is
        // 2*S + o (hint 1), so a candidate outlier c is potential exactly
        // when total - c is even and s = (total - c) / 2 occurs at another
        // index — two copies when s equals c (hint 2). Values are bounded
        // (+/-1000, n <= 10^5), so |total| <= 10^8 fits an int.
        int total = 0;
        unordered_map<int, int> count;
        for (int v : nums) {
            total += v;
            count[v]++;
        }
        int best = -2000; // strictly below every legal value
        for (int c : nums) {
            int rest = total - c;
            if (rest % 2 != 0)
                continue;
            int s = rest / 2;
            int need = s == c ? 2 : 1;
            auto it = count.find(s);
            if (it != count.end() && it->second >= need && c > best)
                best = c;
        }
        return best;
    }
};
