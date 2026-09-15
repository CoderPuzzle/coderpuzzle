#include <queue>
#include <string>
#include <utility>

class Solution {
  public:
    string predictPartyVictory(string senate) {
        // Two queues of senator indices, filled in string order: the fronts
        // are the earliest still-living senator of each party in the current
        // wrap-around pass.
        int n = static_cast<int>(senate.size());
        queue<int> radiant, dire;
        for (int i = 0; i < n; ++i) {
            (senate[i] == 'R' ? radiant : dire).push(i);
        }
        // Each step the two fronts fight: the smaller index acts first, bans
        // the loser (popped for good), and re-enqueues itself at index + n,
        // its position in the next round's pass. Every fight removes one
        // senator permanently, so at most n - 1 fights decide the senate.
        while (!radiant.empty() && !dire.empty()) {
            int r = radiant.front();
            radiant.pop();
            int d = dire.front();
            dire.pop();
            if (r < d) {
                radiant.push(r + n);
            } else {
                dire.push(d + n);
            }
        }
        return radiant.empty() ? "Dire" : "Radiant";
    }
};
