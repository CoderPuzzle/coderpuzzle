class Solution {
  public:
    vector<vector<int>> permute(vector<int> &nums) {
        // Sort in place: trying candidates in ascending order makes the walk
        // emit lexicographic order directly.
        sort(nums.begin(), nums.end());
        vector<vector<int>> permutations;
        vector<int> current;
        vector<bool> used(nums.size(), false);
        walk(nums, used, current, permutations);
        return permutations;
    }

  private:
    // A leaf has one chosen element per position: a full permutation. Marks
    // replace an O(n) membership scan.
    void walk(vector<int> &values, vector<bool> &used, vector<int> &current, vector<vector<int>> &permutations) {
        if (current.size() == values.size()) {
            // Copy: current is the shared buffer for the next branch.
            permutations.push_back(current);
            return;
        }
        for (size_t index = 0; index < values.size(); index++) {
            if (used[index])
                continue;
            used[index] = true;
            current.push_back(values[index]);
            walk(values, used, current, permutations);
            current.pop_back();
            used[index] = false;
        }
    }
};
