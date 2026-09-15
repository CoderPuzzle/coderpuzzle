class Solution {
  public:
    int minMaxGame(vector<int> &nums) {
        vector<int> current = nums;
        while (current.size() > 1) {
            vector<int> next_values(current.size() / 2);
            for (int i = 0; i < static_cast<int>(next_values.size()); i++) {
                if (i % 2 == 0) {
                    next_values[i] = min(current[2 * i], current[2 * i + 1]);
                } else {
                    next_values[i] = max(current[2 * i], current[2 * i + 1]);
                }
            }
            current = move(next_values);
        }
        return current[0];
    }
};
