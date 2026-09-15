#include <cstdlib>
#include <string>

using namespace std;

class Solution {
  public:
    int maxDistance(string moves) {
        int x = 0, y = 0, wildcard = 0;
        for (char move : moves) {
            if (move == 'R')
                ++x;
            else if (move == 'L')
                --x;
            else if (move == 'U')
                ++y;
            else if (move == 'D')
                --y;
            else
                ++wildcard;
        }
        return abs(x) + abs(y) + wildcard;
    }
};
