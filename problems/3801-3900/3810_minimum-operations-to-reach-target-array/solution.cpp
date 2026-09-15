#include <unordered_set>
#include <vector>

using namespace std;

class Solution {
  public:
    int minOperations(vector<int> &nums, vector<int> &target) {
        // Choosing x rewrites exactly the cells whose current value is x
        // (all maximal x-segments land on their target values), so a
        // mismatched cell keeps its value until an operation names that
        // value. Naming a value clears its whole mismatch class; no other
        // cell moves. The answer is the number of classes: distinct
        // nums[i] where it differs from target[i]. The count is at most
        // n <= 1e5, so int is always safe here.
        unordered_set<int> distinct;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (nums[i] != target[i]) {
                distinct.insert(nums[i]);
            }
        }
        return static_cast<int>(distinct.size());
    }
};
