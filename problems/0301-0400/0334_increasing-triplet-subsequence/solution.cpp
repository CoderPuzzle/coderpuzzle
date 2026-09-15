class Solution {
  public:
    bool increasingTriplet(vector<int> &nums) {
        long long first = (1LL << 62);
        long long second = (1LL << 62);
        for (int value : nums) {
            if (value <= first) {
                first = value;
            } else if (value <= second) {
                second = value;
            } else {
                return true;
            }
        }
        return false;
    }
};
