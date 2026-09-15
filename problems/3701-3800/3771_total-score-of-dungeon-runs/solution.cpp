#include <algorithm>
#include <vector>

class Solution {
  public:
    long long totalScore(int hp, vector<int> &damage, vector<int> &requirement) {
        // pref[i] = total damage of rooms 1..i (pref[0] = 0). Starting at
        // room a+1, room b (b >= a+1) pays a point iff
        // hp - (pref[b] - pref[a]) >= requirement[b], i.e.
        // pref[a] >= requirement[b] - hp + pref[b]. Over all n(n+1)/2
        // subarrays this is a dominance count, done per b with a Fenwick
        // tree over compressed prefix sums holding pref[0..b-1]; failing
        // pairs (pref[a] < threshold) are subtracted from the total. Prefix
        // sums reach 1e9 and the answer n(n+1)/2 ~ 5e9, so long long is
        // used.
        int n = (int)damage.size();
        vector<long long> pref(n + 1, 0);
        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + damage[i];
        }
        vector<long long> values = pref;
        sort(values.begin(), values.end());
        values.erase(unique(values.begin(), values.end()), values.end());
        int m = (int)values.size();
        vector<int> bit(m + 1, 0);
        auto add = [&](int pos) {
            for (int i = pos + 1; i <= m; i += i & -i) {
                bit[i]++;
            }
        };
        auto prefix = [&](int pos) {
            long long total = 0;
            for (int i = pos; i > 0; i -= i & -i) {
                total += bit[i];
            }
            return total;
        };
        auto lower = [&](long long x) { return (int)(lower_bound(values.begin(), values.end(), x) - values.begin()); };
        add(lower(pref[0]));
        long long failing = 0;
        for (int b = 1; b <= n; b++) {
            long long threshold = (long long)requirement[b - 1] - hp + pref[b];
            // Number of inserted pref[a] with pref[a] < threshold.
            failing += prefix(lower(threshold));
            add(lower(pref[b]));
        }
        return (long long)n * (n + 1) / 2 - failing;
    }
};
