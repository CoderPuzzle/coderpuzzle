class Solution {
  public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> combinations;
        vector<int> current;
        walk(n, k, 1, current, combinations);
        return combinations;
    }

  private:
    // Ascending start values make each combination ascending and the walk
    // emit lexicographic order directly.
    void walk(int n, int k, int start, vector<int> &current, vector<vector<int>> &combinations) {
        // A full pick of k numbers is one combination.
        if ((int)current.size() == k) {
            // Copy: current is the shared buffer for the next branch.
            combinations.push_back(current);
            return;
        }
        // The bound keeps only values that leave enough larger numbers to
        // fill the rest of the combination.
        int last = n - (k - (int)current.size()) + 1;
        for (int value = start; value <= last; value++) {
            current.push_back(value);
            walk(n, k, value + 1, current, combinations);
            current.pop_back();
        }
    }
};
