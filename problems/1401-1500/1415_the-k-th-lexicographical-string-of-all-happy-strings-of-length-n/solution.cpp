#include <string>
#include <vector>

class Solution {
  public:
    std::string getHappyString(int n, int k) {
        int total = 3 * (1 << (n - 1));
        if (k > total) {
            return "";
        }
        const std::string letters = "abc";
        std::string result;
        int block = total / 3;
        int rank = k - 1;
        for (int i = 0; i < n; i++) {
            std::vector<char> candidates;
            if (i == 0) {
                for (char c : letters) {
                    candidates.push_back(c);
                }
            } else {
                char previous = result.back();
                for (char c : letters) {
                    if (c != previous) {
                        candidates.push_back(c);
                    }
                }
            }
            int index = rank / block;
            rank %= block;
            result.push_back(candidates[index]);
            block /= 2;
        }
        return result;
    }
};
