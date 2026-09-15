#include <unordered_set>

class Solution {
  public:
    ListNode *modifiedList(vector<int> &nums, ListNode *head) {
        // O(1) membership tests: the set holds every value of nums once.
        unordered_set<int> remove(nums.begin(), nums.end());
        // A dummy head stands in front of the real list, so deleting the
        // original head is an ordinary unlink of somebody's successor.
        ListNode dummy(0);
        dummy.next = head;
        ListNode *current = &dummy;
        while (current->next != nullptr) {
            if (remove.count(current->next->val)) {
                // Skip the matching node. The cursor stays put — the node
                // behind it may match too, and that node is now current.next.
                current->next = current->next->next;
            } else {
                // A keeper: step onto it and look at what follows.
                current = current->next;
            }
        }
        return dummy.next;
    }
};
