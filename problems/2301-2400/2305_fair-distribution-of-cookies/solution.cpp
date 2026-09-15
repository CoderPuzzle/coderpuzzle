class Solution {
  public:
    int distributeCookies(vector<int> &cookies, int k) {
        vector<long long> children(k, 0);
        // +inf start guarantees the first complete leaf always improves on best
        long long best = LLONG_MAX;
        backtrack(cookies, children, 0, 0, best, k);
        return (int)best;
    }

  private:
    void backtrack(vector<int> &cookies, vector<long long> &children, int i, long long curMax, long long &best, int k) {
        // bound pruning: the running max only grows, so this branch can no
        // longer beat the best complete distribution found so far
        if (curMax >= best)
            return;
        // all bags placed: the running max is this leaf's unfairness
        if (i == (int)cookies.size()) {
            best = curMax;
            return;
        }
        unordered_set<long long> tried;
        for (int j = 0; j < k; j++) {
            // symmetry: children holding equal totals are interchangeable,
            // so try each distinct total only once
            if (tried.count(children[j]))
                continue;
            tried.insert(children[j]);
            children[j] += cookies[i];
            backtrack(cookies, children, i + 1, max(curMax, children[j]), best, k);
            children[j] -= cookies[i];
        }
    }
};
