class Solution {
  public:
    int countRangeSum(vector<int> &nums, int lower, int upper) {
        int n = (int)nums.size();
        // Range sums become pairs: count i < j with
        // prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // Fenwick tree over the coordinate-compressed prefix values: rank r
        // (1-based) counts how many inserted prefixes carry ranks[r - 1].
        vector<long long> ranks(prefix);
        sort(ranks.begin(), ranks.end());
        ranks.erase(unique(ranks.begin(), ranks.end()), ranks.end());
        int m = (int)ranks.size();
        vector<int> tree(m + 1, 0);
        auto add = [&](long long value) {
            int rank = (int)(lower_bound(ranks.begin(), ranks.end(), value) - ranks.begin()) + 1;
            for (; rank <= m; rank += rank & -rank) {
                tree[rank]++;
            }
        };
        auto countUpto = [&](long long bound) {
            // How many inserted prefixes are at most bound.
            int rank = (int)(upper_bound(ranks.begin(), ranks.end(), bound) - ranks.begin());
            int total = 0;
            for (; rank > 0; rank -= rank & -rank) {
                total += tree[rank];
            }
            return total;
        };
        long long count = 0;
        add(prefix[0]);
        for (int j = 1; j <= n; j++) {
            long long p = prefix[j];
            // An earlier prefix e qualifies when lower <= p - e <= upper,
            // i.e. e lies in [p - upper, p - lower]; both bounds come off
            // the tree as rank-prefix counts.
            count += countUpto(p - lower) - countUpto(p - upper - 1);
            // Insert only after querying, so a prefix never pairs itself.
            add(p);
        }
        return (int)count;
    }
};
