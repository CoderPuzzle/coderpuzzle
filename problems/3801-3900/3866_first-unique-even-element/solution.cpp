class Solution {
  public:
    int firstUniqueEven(vector<int> &nums) {
        // A value qualifies only when it is even and its count in nums is
        // exactly one. Counting all values first turns each "is this the
        // first unique even?" test into a constant-time lookup, so a single
        // left-to-right scan over nums returns the earliest match.
        unordered_map<int, int> counts;
        for (int value : nums) {
            counts[value]++;
        }
        for (int value : nums) {
            if (value % 2 == 0 && counts[value] == 1) {
                return value;
            }
        }
        return -1;
    }
};
