class Solution {
  public:
    int countSymmetricIntegers(int low, int high) {
        // An even-length decimal string is symmetric exactly when its two
        // halves have equal digit sums; odd-length numbers are never
        // symmetric. Digit counts stay below 6 on the constraint domain.
        int count = 0;
        for (int value = low; value <= high; value++) {
            std::string digits = std::to_string(value);
            int n = static_cast<int>(digits.size());
            if (n % 2 != 0) {
                continue;
            }
            int half = n / 2;
            int firstSum = 0;
            int lastSum = 0;
            for (int i = 0; i < half; i++) {
                firstSum += digits[i] - '0';
                lastSum += digits[half + i] - '0';
            }
            if (firstSum == lastSum) {
                count++;
            }
        }
        return count;
    }
};
