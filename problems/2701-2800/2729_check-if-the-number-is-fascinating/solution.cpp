class Solution {
  public:
    bool isFascinating(int n) {
        string digits = to_string(n) + to_string(2 * n) + to_string(3 * n);
        if (digits.size() != 9)
            return false;

        bool seen[10] = {};
        for (char character : digits) {
            int digit = character - '0';
            if (digit == 0 || seen[digit])
                return false;
            seen[digit] = true;
        }
        return true;
    }
};
