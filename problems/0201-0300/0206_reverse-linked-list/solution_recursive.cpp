class Solution {
  public:
    ListNode *reverseList(ListNode *head) {
        // A missing head or a last node is already reversed: it is its own
        // new head and terminates the recursion.
        if (head == nullptr || head->next == nullptr) {
            return head;
        }
        // Reverse the tail first: the recursion returns the head of the
        // already-reversed remainder.
        ListNode *newHead = reverseList(head->next);
        // head trails that reversed chain; point its own successor back at
        // it, then sever head's forward link so it becomes the tail.
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};
