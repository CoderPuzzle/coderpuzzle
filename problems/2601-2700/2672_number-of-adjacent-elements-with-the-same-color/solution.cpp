#include <vector>

class Solution {
  public:
    // Only the painted cell's two neighbor pairs can flip status in one
    // query: score their contribution before the repaint, then after, and
    // slide the running total by the difference. Zero stays "uncolored",
    // so a pair only counts when both sides are non-zero and equal.
    std::vector<int> colorTheArray(int n, std::vector<std::vector<int>> &queries) {
        std::vector<int> colors(n, 0);
        int same = 0;
        std::vector<int> answer;
        answer.reserve(queries.size());
        auto counts_for = [&](int index, int color) {
            int contribution = 0;
            for (int j : {index - 1, index + 1}) {
                if (j >= 0 && j < n && colors[j] != 0 && colors[j] == color) {
                    ++contribution;
                }
            }
            return contribution;
        };
        for (const auto &query : queries) {
            int index = query[0];
            int color = query[1];
            same -= counts_for(index, colors[index]);
            colors[index] = color;
            same += counts_for(index, color);
            answer.push_back(same);
        }
        return answer;
    }
};
