#include <unordered_map>

/**
 * Definition for singly-linked list. struct ListNode { int val; ListNode
 * *next; ListNode() : val(0), next(nullptr) {} ListNode(int x) : val(x),
 * next(nullptr) {} ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
  public:
    ListNode *deleteDuplicatesUnsorted(ListNode *head) {
        // Two passes: count every value, then keep only the values whose
        // count is exactly one. A dummy node makes deleting the head a
        // non-case.
        unordered_map<int, int> count;
        for (ListNode *node = head; node; node = node->next) {
            count[node->val]++;
        }
        ListNode dummy(0);
        ListNode *tail = &dummy;
        for (ListNode *node = head; node; node = node->next) {
            if (count[node->val] == 1) {
                tail->next = node;
                tail = tail->next;
            }
        }
        tail->next = nullptr;
        return dummy.next;
    }
};
