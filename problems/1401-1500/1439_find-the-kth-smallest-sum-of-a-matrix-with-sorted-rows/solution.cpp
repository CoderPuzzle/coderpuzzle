#include <queue>
#include <set>
#include <vector>

class Solution {
  public:
    int kthSmallest(std::vector<std::vector<int>> &mat, int k) {
        int m = (int)mat.size();
        std::vector<int> first(m, 0);
        int base = 0;
        for (int r = 0; r < m; r++) {
            base += mat[r][0];
        }
        using State = std::pair<int, std::vector<int>>;
        std::priority_queue<State, std::vector<State>, std::greater<State>> heap;
        heap.push({base, first});
        std::set<std::vector<int>> seen;
        seen.insert(first);
        int answer = 0;
        for (int step = 0; step < k; step++) {
            auto [total, indexes] = heap.top();
            heap.pop();
            answer = total;
            for (int r = 0; r < m; r++) {
                if (indexes[r] + 1 < (int)mat[r].size()) {
                    std::vector<int> candidate = indexes;
                    candidate[r] = indexes[r] + 1;
                    if (seen.insert(candidate).second) {
                        int nextTotal = total - mat[r][indexes[r]] + mat[r][indexes[r] + 1];
                        heap.push({nextTotal, candidate});
                    }
                }
            }
        }
        return answer;
    }
};
