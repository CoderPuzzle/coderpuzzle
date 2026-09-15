#include <queue>
#include <vector>

class Solution {
  public:
    int maximumProduct(vector<int> &nums, int k) {
        priority_queue<long long, vector<long long>, greater<long long>> heap(nums.begin(), nums.end());
        for (int i = 0; i < k; i++) {
            long long smallest = heap.top();
            heap.pop();
            heap.push(smallest + 1);
        }
        long long product = 1;
        while (!heap.empty()) {
            product = product * heap.top() % 1'000'000'007;
            heap.pop();
        }
        return static_cast<int>(product);
    }
};
