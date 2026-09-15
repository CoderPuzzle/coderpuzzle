class Solution {
  public:
    // Treat the line as a graph whose nodes are (position, back) pairs, back
    // marking that the previous jump went backward — the state that forbids
    // a second consecutive backward jump. Breadth-first search by jump count
    // reaches home in the fewest jumps; the line only needs to be explored
    // up to max(x, max(forbidden)) + a + b, because above that line there is
    // nothing to land on that matters, and each backward jump must be paid
    // for by a following forward jump, so a useful overshoot tops out one
    // forward step plus one backward reach higher.
    int minimumJumps(vector<int> &forbidden, int a, int b, int x) {
        int highest = x;
        for (int position : forbidden) {
            highest = max(highest, position);
        }
        int limit = highest + a + b;
        vector<char> blocked(limit + 1, 0);
        for (int position : forbidden) {
            blocked[position] = 1;
        }
        // seen[position][back] — back == 1 means the previous jump was backward
        vector<array<char, 2>> seen(limit + 1);
        seen[0][0] = 1;
        queue<pair<int, int>> frontier;
        frontier.push({0, 0});
        int jumps = 0;
        while (!frontier.empty()) {
            for (int size = frontier.size(); size > 0; --size) {
                auto [position, back] = frontier.front();
                frontier.pop();
                if (position == x) {
                    return jumps;
                }
                int forward = position + a;
                if (forward <= limit && !blocked[forward] && !seen[forward][0]) {
                    seen[forward][0] = 1;
                    frontier.push({forward, 0});
                }
                if (!back) {
                    int backward = position - b;
                    if (backward >= 0 && !blocked[backward] && !seen[backward][1]) {
                        seen[backward][1] = 1;
                        frontier.push({backward, 1});
                    }
                }
            }
            ++jumps;
        }
        return -1;
    }
};
