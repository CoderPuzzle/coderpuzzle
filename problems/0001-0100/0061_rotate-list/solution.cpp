class Solution {
  public:
    ListNode *rotateRight(ListNode *head, int k) {
        // An empty list has nothing to rotate — and no length to mod by.
        if (head == nullptr) {
            return nullptr;
        }
        // One walk measures the list and ends on its tail; linking the tail
        // back onto the head closes a ring, so rotation becomes pointer
        // arithmetic rather than node surgery.
        int n = 1;
        ListNode *tail = head;
        while (tail->next != nullptr) {
            tail = tail->next;
            ++n;
        }
        tail->next = head;
        // Rotate by the remainder only; the new tail stands n - k steps
        // around the ring from the head (k = 0 lands on the old tail, and
        // the cut below simply restores the original list).
        k %= n;
        ListNode *newTail = head;
        for (int i = 0; i < n - k - 1; ++i) {
            newTail = newTail->next;
        }
        ListNode *newHead = newTail->next;
        newTail->next = nullptr;
        return newHead;
    }
};
