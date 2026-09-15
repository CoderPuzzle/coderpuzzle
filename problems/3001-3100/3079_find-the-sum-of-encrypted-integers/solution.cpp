class Solution {
  public:
    int sumOfEncryptedInt(vector<int> &nums) {
        // Encrypting x keeps its digit count but replaces every digit with
        // the largest one, so the result is largest * repunit(length). Both
        // fall out of one digit scan: p grows as 1, 11, 111, ... while m
        // tracks the max digit seen.
        int total = 0;
        for (int num : nums) {
            int value = num;
            int largest = 0;
            int repunit = 0;
            while (value > 0) {
                largest = max(largest, value % 10);
                repunit = repunit * 10 + 1;
                value /= 10;
            }
            total += largest * repunit;
        }
        return total;
    }
};
