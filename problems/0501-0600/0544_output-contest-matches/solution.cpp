#include <string>
#include <utility>
#include <vector>

class Solution {
  public:
    string findContestMatch(int n) {
        // One string per surviving side of the bracket, in round order. Each
        // round folds the list against its own reverse: side i meets side
        // m-1-i, the strong-vs-weak pairing, recorded as "(a,b)" with a bare
        // comma and no space.
        vector<string> sides;
        sides.reserve(n);
        for (int team = 1; team <= n; ++team) {
            sides.push_back(to_string(team));
        }
        while (sides.size() > 1) {
            size_t m = sides.size();
            vector<string> next;
            next.reserve(m / 2);
            for (size_t i = 0; i < m / 2; ++i) {
                next.push_back("(" + sides[i] + "," + sides[m - 1 - i] + ")");
            }
            sides = std::move(next);
        }
        return sides[0];
    }
};
