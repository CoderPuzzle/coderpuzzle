#include <queue>
#include <vector>

namespace {
int non_decreasing_cost(const std::vector<int> &values) {
    std::priority_queue<int> heap;
    long long cost = 0;
    for (int v : values) {
        heap.push(v);
        if (heap.top() > v) {
            cost += heap.top() - v;
            heap.pop();
            heap.push(v);
        }
    }
    return static_cast<int>(cost);
}
} // namespace

class Solution {
  public:
    int convertArray(std::vector<int> &nums) {
        int up = non_decreasing_cost(nums);
        std::vector<int> negated(nums.size());
        for (size_t i = 0; i < nums.size(); i++) {
            negated[i] = -nums[i];
        }
        int down = non_decreasing_cost(negated);
        return up < down ? up : down;
    }
};
