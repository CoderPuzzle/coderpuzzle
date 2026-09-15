class Solution {
  public:
    // State: ranks i, j of the two stars in a row of m survivors.
    vector<int> earliestAndLatest(int n, int firstPlayer, int secondPlayer) {
        memo_.clear();
        auto res = dp(firstPlayer, secondPlayer, n);
        return {res.first, res.second};
    }

  private:
    map<tuple<int, int, int>, pair<int, int>> memo_;

    pair<int, int> dp(int i, int j, int m) {
        if (i + j == m + 1)
            return {1, 1};
        if (i > m - j + 1)
            return dp(m - j + 1, m - i + 1, m);
        auto it = memo_.find({i, j, m});
        if (it != memo_.end())
            return it->second;
        int half = (m + 1) / 2;
        vector<pair<int, int>> free;
        for (int k = 1; k <= half; k++) {
            int back = m + 1 - k;
            if (k < back && i != k && i != back && j != k && j != back)
                free.push_back({k, back});
        }
        int lo = INT_MAX, hi = 0;
        for (int mask = 0; mask < (1 << free.size()); mask++) {
            vector<int> survivors;
            for (int k = 1; k <= half; k++) {
                int back = m + 1 - k;
                if (k == back) {
                    survivors.push_back(k);
                } else if (i == k || i == back) {
                    survivors.push_back(i);
                } else if (j == k || j == back) {
                    survivors.push_back(j);
                } else {
                    int idx = find(free.begin(), free.end(), make_pair(k, back)) - free.begin();
                    survivors.push_back(mask >> idx & 1 ? k : back);
                }
            }
            sort(survivors.begin(), survivors.end());
            int nf = find(survivors.begin(), survivors.end(), i) - survivors.begin() + 1;
            int ns = find(survivors.begin(), survivors.end(), j) - survivors.begin() + 1;
            auto sub = dp(nf, ns, survivors.size());
            lo = min(lo, sub.first);
            hi = max(hi, sub.second);
        }
        pair<int, int> res = {lo + 1, hi + 1};
        memo_[{i, j, m}] = res;
        return res;
    }
};
