#include <string>
#include <vector>

class Solution {
  public:
    std::string reformat(std::string s) {
        std::vector<char> letters;
        std::vector<char> digits;
        for (char c : s) {
            if (c >= '0' && c <= '9') {
                digits.push_back(c);
            } else {
                letters.push_back(c);
            }
        }
        if ((int)letters.size() - (int)digits.size() > 1 || (int)digits.size() - (int)letters.size() > 1) {
            return "";
        }
        std::vector<char> &first = letters.size() >= digits.size() ? letters : digits;
        std::vector<char> &second = &first == &letters ? digits : letters;
        std::string result;
        result.reserve(s.size());
        for (int i = 0; i < (int)first.size(); i++) {
            result.push_back(first[i]);
            if (i < (int)second.size()) {
                result.push_back(second[i]);
            }
        }
        return result;
    }
};
