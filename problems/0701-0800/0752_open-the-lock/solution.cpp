class Solution {
  public:
    int openLock(vector<string> &deadends, string target) {
        // BFS over the 10,000 four-digit lock states, one edge per wheel
        // turn: layer order equals turn count, so reaching the target
        // first is optimal.
        unordered_set<string> dead(deadends.begin(), deadends.end());
        string start = "0000";
        // A deadend start means the wheels can never move.
        if (dead.count(start))
            return -1;
        unordered_set<string> seen;
        seen.insert(start);
        queue<pair<string, int>> q;
        q.push({start, 0});
        while (!q.empty()) {
            auto [state, steps] = q.front();
            q.pop();
            if (state == target)
                return steps;
            for (int i = 0; i < 4; i++) {
                for (int delta : {1, -1}) {
                    // Turn wheel i up or down, wrapping 0..9.
                    int digit = ((state[i] - '0') + delta + 10) % 10;
                    string nxt = state;
                    nxt[i] = (char)('0' + digit);
                    // Mark seen at enqueue time so each state enters
                    // the queue once; never step on a deadend.
                    if (!seen.count(nxt) && !dead.count(nxt)) {
                        seen.insert(nxt);
                        q.push({nxt, steps + 1});
                    }
                }
            }
        }
        // Queue exhausted: every neighbor is seen or dead, so the lock
        // cannot be opened.
        return -1;
    }
};
