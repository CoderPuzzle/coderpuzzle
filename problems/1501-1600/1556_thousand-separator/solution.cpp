class Solution {
  public:
    string thousandSeparator(int n) {
        // Reverse the digit string, cut it into runs of three, join with
        // '.', then reverse back — the chunk boundaries land exactly on
        // multiples of three counted from the units digit.
        string digits = to_string(n);
        reverse(digits.begin(), digits.end());
        string result;
        for (size_t i = 0; i < digits.size(); i += 3) {
            if (i > 0) {
                result += '.';
            }
            result += digits.substr(i, 3);
        }
        reverse(result.begin(), result.end());
        return result;
    }
};
