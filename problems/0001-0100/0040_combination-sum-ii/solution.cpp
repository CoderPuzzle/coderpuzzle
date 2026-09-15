class Solution {
  public:
    vector<vector<int>> combinationSum2(vector<int> &candidates, int target) {
        // Sort in place: every emitted combination is ascending, and growing
        // combinations left to right emits them in lexicographic order.
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> combinations;
        vector<int> current;
        // start moves past each picked index, so every candidate number is
        // used at most once.
        backtrack(candidates, 0, target, current, combinations);
        return combinations;
    }

  private:
    void backtrack(vector<int> &arr, int start, int remaining, vector<int> &current, vector<vector<int>> &result) {
        if (remaining == 0) {
            // Hit the target exactly: snapshot the current path.
            result.push_back(current);
            return;
        }
        for (int i = start; i < (int)arr.size(); i++) {
            // A value equal to the one just abandoned at this depth would
            // rebuild the same combination, so skip runs of equal values.
            if (i > start && arr[i] == arr[i - 1])
                continue;
            // Sorted order means the first value too large to fit ends the
            // loop: every later value is at least as large.
            if (arr[i] > remaining)
                break;
            current.push_back(arr[i]);
            // i + 1, not i: every candidate number may be used only once.
            backtrack(arr, i + 1, remaining - arr[i], current, result);
            current.pop_back();
        }
    }
};
