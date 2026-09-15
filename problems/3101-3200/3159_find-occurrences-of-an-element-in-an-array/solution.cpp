#include <vector>

class Solution {
  public:
    std::vector<int> occurrencesOfElement(std::vector<int> &nums, std::vector<int> &queries, int x) {
        // One sweep records every index where x occurs, in order. Query k
        // then reads straight off that list: the k-th occurrence exists
        // exactly when k does not overrun it. Indices are 1-based ranks
        // into a 0-based list, hence the k - 1.
        std::vector<int> positions;
        for (int index = 0; index < static_cast<int>(nums.size()); ++index) {
            if (nums[index] == x)
                positions.push_back(index);
        }
        int total = static_cast<int>(positions.size());
        std::vector<int> answer;
        answer.reserve(queries.size());
        for (int k : queries) {
            if (k <= total)
                answer.push_back(positions[k - 1]);
            else
                answer.push_back(-1);
        }
        return answer;
    }
};
