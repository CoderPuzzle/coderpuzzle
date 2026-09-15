#include <string>
#include <vector>

class Solution {
  public:
    std::vector<std::string> cellsInRange(std::string s) {
        // Columns outer, rows inner produces exactly the required order.
        std::vector<std::string> out;
        for (char col = s[0]; col <= s[3]; ++col) {
            for (char row = s[1]; row <= s[4]; ++row) {
                out.push_back(std::string() + col + row);
            }
        }
        return out;
    }
};
