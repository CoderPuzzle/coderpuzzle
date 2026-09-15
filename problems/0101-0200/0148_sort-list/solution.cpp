class Solution {
    ListNode *merge(ListNode *a, ListNode *b) {
        // Merge by pure relinking through a dummy head.
        ListNode dummy(0);
        ListNode *tail = &dummy;
        while (a && b) {
            // <= takes from the first half on ties, keeping the sort stable.
            if (a->val <= b->val) {
                tail->next = a;
                a = a->next;
            } else {
                tail->next = b;
                b = b->next;
            }
            tail = tail->next;
        }
        // Splice on whichever half still has nodes.
        tail->next = a ? a : b;
        return dummy.next;
    }

  public:
    ListNode *sortList(ListNode *head) {
        // Base case: an empty or single-node list is already sorted.
        if (head == nullptr || head->next == nullptr) {
            return head;
        }
        // Halve with slow/fast pointers; fast starts one node ahead so slow
        // finishes on the last node of the left half — both halves are then
        // strictly shorter, which makes the recursion terminate.
        ListNode *slow = head;
        ListNode *fast = head->next;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode *mid = slow->next;
        slow->next = nullptr;
        ListNode *left = sortList(head);
        ListNode *right = sortList(mid);
        return merge(left, right);
    }
};
