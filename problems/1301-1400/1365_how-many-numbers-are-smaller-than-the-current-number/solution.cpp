#include <vector>

class SmallerNumbersThanCurrent {
  public:
    std::vector<int> smallerNumbersThanCurrent(const std::vector<int> &nums) {
        std::vector<int> counts(101, 0);
        for (int v : nums)
            counts[v] += 1;
        for (int v = 1; v <= 100; v++)
            counts[v] += counts[v - 1];
        std::vector<int> below(101, 0);
        for (int v = 1; v <= 100; v++)
            below[v] = counts[v - 1];
        std::vector<int> answer;
        answer.reserve(nums.size());
        for (int v : nums)
            answer.push_back(below[v]);
        return answer;
    }
};
