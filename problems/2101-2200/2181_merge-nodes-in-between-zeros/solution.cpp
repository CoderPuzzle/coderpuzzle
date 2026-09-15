/**
 * Definition for singly-linked list. struct ListNode { int val; ListNode
 * *next; ListNode() : val(0), next(nullptr) {} ListNode(int x) : val(x),
 * next(nullptr) {} ListNode(int x, ListNode *next) : val(x, next) {}
 * };
 */
class Solution {
  public:
    ListNode *mergeNodes(ListNode *head) {
        // One pass: skip the leading 0 sentinel, accumulate values until
        // the next 0, then that sum becomes a result node. The dummy head
        // keeps the first segment ordinary.
        ListNode dummy(0);
        ListNode *tail = &dummy;
        ListNode *node = head->next;
        long long total = 0;
        while (node != nullptr) {
            if (node->val == 0) {
                tail->next = new ListNode(static_cast<int>(total));
                tail = tail->next;
                total = 0;
            } else {
                total += node->val;
            }
            node = node->next;
        }
        return dummy.next;
    }
};
