class Solution {
  public:
    int minimumCost(vector<int> &cost) {
        vector<int> values = cost;
        sort(values.begin(), values.end(), greater<int>());
        int total = 0;
        for (int index = 0; index < static_cast<int>(values.size()); index++) {
            if (index % 3 != 2) {
                total += values[index];
            }
        }
        return total;
    }
};
