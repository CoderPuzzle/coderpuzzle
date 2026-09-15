class Solution {
  public:
    vector<vector<int>> permute(int n) {
        vector<vector<int>> results;
        vector<int> current;
        // One flag per value: each of 1..n is consumed at most once per
        // permutation, cleared again on the way back up.
        vector<bool> used(n + 1, false);
        walk(n, current, used, results);
        return results;
    }

  private:
    // Ascending candidates make the walk emit lexicographic order directly;
    // the parity test prunes a branch the moment it would place two adjacent
    // elements both odd or both even.
    void walk(int n, vector<int> &current, vector<bool> &used, vector<vector<int>> &results) {
        // Every position filled: snapshot the finished permutation.
        if ((int)current.size() == n) {
            // Copy: current is the shared buffer for the next branch.
            results.push_back(current);
            return;
        }
        for (int value = 1; value <= n; ++value) {
            if (used[value]) {
                continue;
            }
            if (!current.empty() && value % 2 == current.back() % 2) {
                continue;
            }
            used[value] = true;
            current.push_back(value);
            walk(n, current, used, results);
            current.pop_back();
            used[value] = false;
        }
    }
};
