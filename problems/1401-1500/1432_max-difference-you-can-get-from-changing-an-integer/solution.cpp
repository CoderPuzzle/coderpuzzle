#include <string>

class Solution {
  public:
    int maxDiff(int num) {
        std::string s = std::to_string(num);

        // Maximum: rewrite the first non-9 digit (and its duplicates) to 9.
        std::string big = s;
        for (char digit : s) {
            if (digit != '9') {
                for (char &c : big) {
                    if (c == digit) {
                        c = '9';
                    }
                }
                break;
            }
        }

        // Minimum: the leading digit goes to 1 when it can, otherwise the
        // first digit > 1 anywhere after goes to 0.
        std::string small = s;
        if (s[0] != '1') {
            char from = s[0];
            for (char &c : small) {
                if (c == from) {
                    c = '1';
                }
            }
        } else {
            for (char digit : s) {
                if (digit != '0' && digit != '1') {
                    for (char &c : small) {
                        if (c == digit) {
                            c = '0';
                        }
                    }
                    break;
                }
            }
        }

        return std::stoi(big) - std::stoi(small);
    }
};
