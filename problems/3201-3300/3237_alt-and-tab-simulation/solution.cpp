class Solution {
  public:
    vector<int> simulationResult(vector<int> &windows, vector<int> &queries) {
        // The final stack lists windows by their most recent last touch,
        // with never-queried windows keeping their original order below.
        // Reading the queries backwards and appending each window not yet
        // appended emits exactly that: last touches newest-first, earlier
        // presses skipped because only the final press sets a window's
        // height. The second pass over windows appends the untouched rest
        // in its original order.
        vector<char> seen(windows.size() + 1, 0);
        vector<int> result;
        result.reserve(windows.size());
        for (int i = (int)queries.size() - 1; i >= 0; --i) {
            if (!seen[queries[i]]) {
                seen[queries[i]] = 1;
                result.push_back(queries[i]);
            }
        }
        for (int window : windows) {
            if (!seen[window]) {
                seen[window] = 1;
                result.push_back(window);
            }
        }
        return result;
    }
};
