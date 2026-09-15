class Solution {
  public:
    vector<int> transformArray(vector<int> &arr) {
        vector<int> current = arr;
        while (true) {
            // Whole day from a snapshot: neighbors are yesterday's values.
            vector<int> next = current;
            for (size_t i = 1; i + 1 < current.size(); ++i) {
                if (current[i] < current[i - 1] && current[i] < current[i + 1]) {
                    next[i] = current[i] + 1;
                } else if (current[i] > current[i - 1] && current[i] > current[i + 1]) {
                    next[i] = current[i] - 1;
                }
            }
            if (next == current)
                return current;
            current = std::move(next);
        }
    }
};
