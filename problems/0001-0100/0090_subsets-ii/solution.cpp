class Solution {
  public:
    vector<vector<int>> subsetsWithDup(vector<int> &nums) {
        // Sort in place: each branch chooses among the remaining values in
        // ascending order, so the subsets emerge in the pinned ascending
        // lexicographic order.
        sort(nums.begin(), nums.end());
        vector<vector<int>> subsets;
        vector<int> current;
        backtrack(nums, 0, current, subsets);
        return subsets;
    }

  private:
    void backtrack(vector<int> &arr, int start, vector<int> &current, vector<vector<int>> &subsets) {
        // Every node of the walk is itself a subset: the root is [].
        subsets.push_back(current);
        for (int i = start; i < (int)arr.size(); i++) {
            // A value equal to the sibling just tried at this level would
            // rebuild the same subset, so skip runs of equal values: only the
            // first copy of a run may open a branch here.
            if (i > start && arr[i] == arr[i - 1])
                continue;
            current.push_back(arr[i]);
            backtrack(arr, i + 1, current, subsets);
            current.pop_back();
        }
    }
};
