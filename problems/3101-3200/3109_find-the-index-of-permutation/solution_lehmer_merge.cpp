class Solution {
  public:
    int getPermutationIndex(vector<int> &perm) {
        const long long MOD = 1000000007LL;
        int n = perm.size();
        // fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
        vector<long long> fact(n);
        fact[0] = 1;
        for (int i = 1; i < n; i++) {
            fact[i] = fact[i - 1] * i % MOD;
        }

        // Lehmer digit re-read: the values still unused at slot i are exactly
        // the values in later slots, so digit i counts later slots holding
        // smaller values -- a per-position smaller-to-the-right inversion count.
        vector<long long> smaller_after(n, 0);
        // merge-sort workspace of (value, original index) pairs, sorted by value
        vector<pair<int, int>> order(n);
        for (int i = 0; i < n; i++) {
            order[i] = {perm[i], i};
        }
        auto merge_sort = [&](auto &&self, int lo, int hi) {
            if (hi - lo < 2) {
                return;
            }
            int mid = (lo + hi) / 2;
            self(self, lo, mid);
            self(self, mid, hi);
            vector<pair<int, int>> left(order.begin() + lo, order.begin() + mid);
            int i = 0, j = mid, k = lo;
            while (i < (int)left.size() && j < hi) {
                if (left[i].first < order[j].first) {
                    smaller_after[left[i].second] += j - mid; // right-half values already placed below it
                    order[k] = left[i];
                    i++;
                } else {
                    order[k] = order[j];
                    j++;
                }
                k++;
            }
            while (i < (int)left.size()) {
                smaller_after[left[i].second] += j - mid; // the whole right half sits below it
                order[k] = left[i];
                i++;
                k++;
            }
        };
        merge_sort(merge_sort, 0, n);

        long long ans = 0;
        for (int i = 0; i < n; i++) {
            // each later smaller value placed at slot i leads (n - 1 - i)! earlier permutations
            ans = (ans + smaller_after[i] % MOD * fact[n - 1 - i]) % MOD;
        }
        return (int)ans;
    }
};
