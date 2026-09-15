#include <string>

class Solution {
  public:
    bool validDigit(int n, int x) {
        string digits = to_string(n);
        char target = (char)('0' + x);
        return digits.find(target) != string::npos && digits[0] != target;
    }
};
