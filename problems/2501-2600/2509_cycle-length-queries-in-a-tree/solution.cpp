#include <vector>

class Solution {
  public:
    std::vector<int> cycleLengthQueries(int n, std::vector<std::vector<int>> &queries) {
        // Adding edge (a, b) closes exactly one cycle: the unique tree path
        // between a and b plus the new edge. Walking the deeper endpoint up
        // one parent (v / 2) at a time until both endpoints meet visits
        // exactly the edges of that path, so the answer is one more than
        // the number of steps taken. Values stay below 2^30, so each walk
        // is at most 30 steps.
        std::vector<int> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            int a = query[0];
            int b = query[1];
            int steps = 1;
            while (a != b) {
                if (a > b) {
                    a >>= 1;
                } else {
                    b >>= 1;
                }
                ++steps;
            }
            answer.push_back(steps);
        }
        return answer;
    }
};
