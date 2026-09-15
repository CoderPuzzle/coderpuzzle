class Solution {
  public:
    vector<vector<int>> findSubsequences(vector<int> &nums) {
        // One decision per index — take the value or skip it — so every leaf
        // of the tree is exactly one subset of indices. A leaf holding at
        // least two non-decreasing values is one answer; equal values reach
        // the same value sequence through different index subsets, so a set
        // absorbs those duplicates. A set of vectors keeps them in
        // lexicographic order already, so copying it out emits the pinned
        // sorted order directly.
        set<vector<int>> found;
        vector<int> current;
        walk(nums, 0, current, found);
        return vector<vector<int>>(found.begin(), found.end());
    }

  private:
    void walk(const vector<int> &nums, int index, vector<int> &current, set<vector<int>> &found) {
        if (index == static_cast<int>(nums.size())) {
            if (current.size() >= 2) {
                found.insert(current);
            }
            return;
        }
        // Take nums[index] when it does not decrease.
        if (current.empty() || nums[index] >= current.back()) {
            current.push_back(nums[index]);
            walk(nums, index + 1, current, found);
            current.pop_back();
        }
        // Skip nums[index].
        walk(nums, index + 1, current, found);
    }
};
