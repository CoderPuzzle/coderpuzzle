class Solution {
  public:
    int numberOfPoints(vector<vector<int>> &nums) {
        // Sorted lexicographically by start point, a car only gains
        // coverage past the rightmost point counted so far — add its
        // uncovered suffix there and extend that reach.
        sort(nums.begin(), nums.end());
        int total = 0;
        int reach = 0;
        for (const vector<int> &car : nums) {
            int start = car[0];
            int end = car[1];
            if (end > reach) {
                total += end - max(start, reach + 1) + 1;
                reach = end;
            }
        }
        return total;
    }
};
