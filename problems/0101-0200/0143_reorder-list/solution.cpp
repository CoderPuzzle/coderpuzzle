class Solution {
  public:
    ListNode *reorderList(ListNode *head) {
        // Lists of length 0 or 1 are already in the target order.
        if (head == nullptr || head->next == nullptr) {
            return head;
        }
        // Slow steps one node, fast two, so fast falls off the end while
        // slow stands on the last node of the front half.
        ListNode *slow = head;
        ListNode *fast = head;
        while (fast->next != nullptr && fast->next->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        // Unhook the back half and reverse it in place: `prev` ends up as
        // its head, reading the original back half backwards.
        ListNode *back = slow->next;
        slow->next = nullptr;
        ListNode *prev = nullptr;
        while (back != nullptr) {
            ListNode *next = back->next;
            back->next = prev;
            prev = back;
            back = next;
        }
        // Weave: each front node hands its successor to the current back
        // node and takes that node in its place; the back chain, never
        // longer than the front, runs out first.
        ListNode *front = head;
        while (prev != nullptr) {
            ListNode *nextFront = front->next;
            ListNode *nextBack = prev->next;
            front->next = prev;
            prev->next = nextFront;
            front = nextFront;
            prev = nextBack;
        }
        return head;
    }
};
