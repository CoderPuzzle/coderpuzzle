class Solution {
  public:
    ListNode *insertGreatestCommonDivisors(ListNode *head) {
        // Original nodes only ever gain a successor, so one cursor splices each
        // gcd in place: rethread cur.next to a fresh node carrying the pair's
        // gcd, then hop to that untouched successor so the next original pair
        // is examined next and the walk stops on the final original node.
        ListNode *cur = head;
        while (cur->next != nullptr) {
            ListNode *next = cur->next;
            ListNode *node = new ListNode(std::gcd(cur->val, next->val));
            node->next = next;
            cur->next = node;
            cur = next;
        }
        return head;
    }
};
