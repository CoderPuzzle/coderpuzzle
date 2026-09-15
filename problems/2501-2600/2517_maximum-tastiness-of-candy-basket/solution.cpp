class Solution {
  public:
    int maximumTastiness(vector<int> &price, int k) {
        // In a sorted selection the minimum pairwise gap always occurs between
        // adjacent picks, so sorting once reduces the problem to chain gaps.
        vector<int> p(price);
        sort(p.begin(), p.end());
        auto feasible = [&](int x) {
            // Leftmost greedy: take the first candy, then each candy at least x
            // above the last taken one. Postponing a pick can only shrink the
            // room for later picks, so this maximizes how many candies fit.
            int count = 1;
            int last = p[0];
            for (size_t i = 1; i < p.size(); i++) {
                if (p[i] - last >= x) {
                    count++;
                    last = p[i];
                }
            }
            return count >= k;
        };
        // "Every gap >= x is achievable" is monotone in x, so binary search
        // the largest feasible x over [0, max-min]; the upper-mid +1 keeps
        // lo = mid from stalling. Identical prices converge to lo = 0.
        int lo = 0, hi = p.back() - p[0];
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(mid))
                lo = mid;
            else
                hi = mid - 1;
        }
        return lo;
    }
};
