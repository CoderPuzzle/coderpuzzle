class Solution {
  public:
    int findNumbers(vector<int> &nums) {
        // Each division by 10 sheds one digit; the step count is the digit
        // count. Even tallies are what we count.
        int even = 0;
        for (int value : nums) {
            int digits = 0;
            while (value > 0) {
                value /= 10;
                ++digits;
            }
            if (digits % 2 == 0)
                ++even;
        }
        return even;
    }
};
