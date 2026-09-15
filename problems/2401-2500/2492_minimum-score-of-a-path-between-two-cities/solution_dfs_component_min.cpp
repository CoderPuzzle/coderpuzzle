#include <vector>

class Solution {
  public:
    int minScore(int n, vector<vector<int>> &roads) {
        // A path may reuse roads, so every road whose two endpoints are
        // reachable from city 1 belongs to some valid path. Discover the
        // component by walking it: build the adjacency list, flood
        // outward from city 1 with an explicit stack, then take the
        // smallest distance among the roads the flood reached.
        vector<vector<int>> adjacency(n + 1);
        for (const vector<int> &r : roads) {
            adjacency[r[0]].push_back(r[1]);
            adjacency[r[1]].push_back(r[0]);
        }
        vector<char> reached(n + 1, 0);
        reached[1] = 1;
        vector<int> stack;
        stack.push_back(1);
        while (!stack.empty()) {
            int city = stack.back();
            stack.pop_back();
            for (int other : adjacency[city]) {
                if (!reached[other]) {
                    reached[other] = 1;
                    stack.push_back(other);
                }
            }
        }
        int best = 1000000000;
        for (const vector<int> &r : roads) {
            if (reached[r[0]] && r[2] < best) {
                best = r[2];
            }
        }
        return best;
    }
};
