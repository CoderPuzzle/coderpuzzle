class Solution {
  public:
    vector<vector<int>> permuteUnique(vector<int> &nums) {
        // Sort in place: every position chooses among the remaining values in
        // ascending order, so the finished permutations emerge in
        // lexicographic order.
        sort(nums.begin(), nums.end());
        vector<vector<int>> permutations;
        vector<int> current;
        // One flag per slot: each element is consumed at most once per
        // permutation, cleared again on the way back up.
        vector<bool> used(nums.size(), false);
        backtrack(nums, used, current, permutations);
        return permutations;
    }

  private:
    void backtrack(vector<int> &arr, vector<bool> &used, vector<int> &current, vector<vector<int>> &result) {
        if (current.size() == arr.size()) {
            // Every position filled: snapshot the finished permutation.
            result.push_back(current);
            return;
        }
        for (int i = 0; i < (int)arr.size(); i++) {
            if (used[i])
                continue;
            // A value equal to the one just abandoned at this depth would
            // rebuild the same permutation, so skip runs of equal values: a
            // duplicate may only be placed once its left twin is used.
            if (i > 0 && arr[i] == arr[i - 1] && !used[i - 1])
                continue;
            used[i] = true;
            current.push_back(arr[i]);
            backtrack(arr, used, current, result);
            current.pop_back();
            used[i] = false;
        }
    }
};
