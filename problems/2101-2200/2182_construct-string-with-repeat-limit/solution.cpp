#include <string>
#include <vector>

class Solution {
  public:
    std::string repeatLimitedString(std::string s, int repeatLimit) {
        // Greedy: always emit the largest letter still available; when it
        // exhausts its allowed run, spend one unit of the next largest as
        // a separator, then resume.
        std::vector<int> counts(26, 0);
        for (char ch : s) {
            ++counts[ch - 'a'];
        }
        std::string out;
        out.reserve(s.size());
        int i = 25;
        while (true) {
            while (i >= 0 && counts[i] == 0) {
                --i;
            }
            if (i < 0) {
                break;
            }
            int run = std::min(repeatLimit, counts[i]);
            out.append(run, static_cast<char>('a' + i));
            counts[i] -= run;
            if (counts[i] == 0) {
                continue;
            }
            int j = i - 1;
            while (j >= 0 && counts[j] == 0) {
                --j;
            }
            if (j < 0) {
                break;
            }
            out.push_back(static_cast<char>('a' + j));
            --counts[j];
        }
        return out;
    }
};
