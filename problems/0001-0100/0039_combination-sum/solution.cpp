class Solution {
  public:
    vector<vector<int>> combinationSum(vector<int> &candidates, int target) {
        vector<vector<int>> results;
        vector<int> path;
        backtrack(candidates, 0, target, path, results);
        return results;
    }

  private:
    void backtrack(vector<int> &candidates, int start, int remaining, vector<int> &path, vector<vector<int>> &results) {
        // remaining = target minus the sum of the path so far; when it hits 0
        // the path is a valid combination, recorded by value (a copy).
        if (remaining == 0) {
            results.push_back(path);
            return;
        }
        // Loop from start onward: everything before start stays forbidden.
        for (int i = start; i < (int)candidates.size(); i++) {
            int value = candidates[i];
            // Oversized candidate: let the branch die now rather than one layer
            // deeper. A skip, not a break, since input is unsorted.
            if (value > remaining)
                continue;
            path.push_back(value);
            // Recurse with i, not i + 1: a candidate may be reused without
            // limit. This pins every combination to nondecreasing candidate
            // order, so (2, 3, 2) can never form while (2, 2, 3) is found once.
            backtrack(candidates, i, remaining - value, path, results);
            path.pop_back();
        }
    }
};
