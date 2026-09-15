#include <unordered_set>

class Solution {
  public:
    int numComponents(ListNode *head, vector<int> &nums) {
        // O(1) membership tests: the set holds every value of nums once.
        unordered_set<int> wanted(nums.begin(), nums.end());
        int components = 0;
        bool previousIn = false;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            bool currentIn = wanted.count(node->val) > 0;
            // A component starts exactly where membership turns on: this
            // node is in nums and its predecessor was not. The initial
            // false flag folds the head into the same rule — no predecessor.
            if (currentIn && !previousIn) {
                ++components;
            }
            previousIn = currentIn;
        }
        return components;
    }
};
