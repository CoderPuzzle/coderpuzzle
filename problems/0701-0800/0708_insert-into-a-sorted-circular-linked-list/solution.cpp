class Solution {
  public:
    ListNode *insert(ListNode *head, int insertVal) {
        ListNode *node = new ListNode(insertVal);
        if (head == nullptr) {
            node->next = node;
            return node;
        }
        ListNode *previous = head;
        ListNode *current = head->next;
        while (current != head) {
            bool fits = previous->val <= insertVal && insertVal <= current->val;
            bool wraps = previous->val > current->val && (insertVal >= previous->val || insertVal <= current->val);
            if (fits || wraps)
                break;
            previous = current;
            current = current->next;
        }
        previous->next = node;
        node->next = current;
        return head;
    }
};
