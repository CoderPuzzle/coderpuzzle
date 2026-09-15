#include <string>

class Solution {
  public:
    std::string generateTheString(int n) {
        std::string out(n, 'a');
        if (n % 2 == 0)
            out[n - 1] = 'b';
        return out;
    }
};
