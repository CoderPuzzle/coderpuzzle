class Solution {
  public:
    int countDigitOccurrences(vector<int> &nums, int digit) {
        // Peel each value's decimal digits with repeated division by ten.
        // Every element is at least 1 (never 0), so the loop faithfully
        // covers its digits with no leading-zero special case.
        int total = 0;
        for (int x : nums) {
            while (x > 0) {
                if (x % 10 == digit) {
                    total++;
                }
                x /= 10;
            }
        }
        return total;
    }
};
