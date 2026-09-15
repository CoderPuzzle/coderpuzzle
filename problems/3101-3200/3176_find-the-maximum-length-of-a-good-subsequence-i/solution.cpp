class Solution {
  public:
    int maximumLength(vector<int> &nums, int k) {
        // One row per change budget: row[v][a] is the longest good
        // subsequence using exactly a changes and ending on value v;
        // endsAll[a] mirrors the best over all endings. Same-valued
        // tails extend for free, everything else spends one budget
        // step, and both reads use stats frozen before this element.
        unordered_map<int, vector<int>> ends;
        vector<int> endsAll(k + 1, 0);
        int best = 0;
        for (int x : nums) {
            auto it = ends.find(x);
            if (it == ends.end())
                it = ends.emplace(x, vector<int>(k + 1, 0)).first;
            vector<int> &row = it->second;
            vector<int> computed(k + 1);
            for (int a = 0; a <= k; ++a)
                computed[a] = max(row[a], a ? endsAll[a - 1] : 0) + 1;
            for (int a = 0; a <= k; ++a) {
                if (computed[a] > row[a])
                    row[a] = computed[a];
                if (computed[a] > endsAll[a])
                    endsAll[a] = computed[a];
                best = max(best, endsAll[a]);
            }
        }
        return best;
    }
};
