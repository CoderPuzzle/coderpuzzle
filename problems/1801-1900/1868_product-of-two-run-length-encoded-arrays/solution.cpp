#include <vector>

class Solution {
  public:
    // Walk both encodings with running remainders; each step consumes
    // min(remaining1, remaining2) positions and emits one product run,
    // merging into the previous run when the product repeats.
    std::vector<std::vector<long long>> findRLEArray(std::vector<std::vector<int>> &encoded1,
                                                     std::vector<std::vector<int>> &encoded2) {
        std::vector<std::vector<long long>> out;
        int i = 0, j = 0;
        long long rem1 = encoded1[0][1];
        long long rem2 = encoded2[0][1];
        while (true) {
            long long take = rem1 < rem2 ? rem1 : rem2;
            long long val = (long long)encoded1[i][0] * encoded2[j][0];
            if (!out.empty() && out.back()[0] == val) {
                out.back()[1] += take;
            } else {
                out.push_back({val, take});
            }
            rem1 -= take;
            rem2 -= take;
            if (rem1 == 0) {
                i++;
                if (i == (int)encoded1.size()) {
                    break;
                }
                rem1 = encoded1[i][1];
            }
            if (rem2 == 0) {
                j++;
                if (j == (int)encoded2.size()) {
                    break;
                }
                rem2 = encoded2[j][1];
            }
        }
        return out;
    }
};
