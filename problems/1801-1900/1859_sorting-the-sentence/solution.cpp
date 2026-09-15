#include <sstream>
#include <string>
#include <vector>

class Solution {
  public:
    // The trailing digit is the 1-indexed slot; drop each word into its
    // slot and rejoin.
    std::string sortSentence(std::string s) {
        std::istringstream in(s);
        std::vector<std::string> out(9);
        int count = 0;
        std::string w;
        while (in >> w) {
            out[w.back() - '1'] = w.substr(0, w.size() - 1);
            count++;
        }
        std::string result;
        for (int i = 0; i < count; i++) {
            if (i) {
                result += ' ';
            }
            result += out[i];
        }
        return result;
    }
};
