class Solution {
  public:
    vector<vector<int>> combinationSum(vector<int> &candidates, int target) {
        // Candidate value -> position, so the ways can be reported in the
        // order the backtracking search would meet them.
        unordered_map<int, int> position;
        for (int index = 0; index < (int)candidates.size(); ++index) {
            position[candidates[index]] = index;
        }
        // table[amount] holds every way of reaching that amount with the
        // candidates processed so far. Owing nothing has exactly one way --
        // the empty one -- which seeds the sweep.
        vector<vector<vector<int>>> table(target + 1);
        table[0].push_back({});
        for (int value : candidates) {
            for (int amount = value; amount <= target; ++amount) {
                // Extend every way that is exactly `value` short. A way may
                // already contain this candidate: that is the unlimited
                // reuse, falling out of ascending amounts within one pass.
                for (const vector<int> &way : table[amount - value]) {
                    vector<int> extended = way;
                    extended.push_back(value);
                    table[amount].push_back(std::move(extended));
                }
            }
        }
        // Candidate-outer passes pin each way to one order (its values grouped
        // by candidate position), but the table fills in amount order, so a
        // final lexicographic sort by position restores the discovery order.
        vector<vector<int>> &ways = table[target];
        sort(ways.begin(), ways.end(), [&](const vector<int> &a, const vector<int> &b) {
            size_t shared = min(a.size(), b.size());
            for (size_t i = 0; i < shared; ++i) {
                int pa = position[a[i]];
                int pb = position[b[i]];
                if (pa != pb)
                    return pa < pb;
            }
            return a.size() < b.size();
        });
        return ways;
    }
};
