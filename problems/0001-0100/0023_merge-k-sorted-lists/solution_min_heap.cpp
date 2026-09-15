class Solution {
  public:
    // Heap entry: value, input position (tie-break), and the head itself.
    struct Entry {
        int val;
        int position;
        ListNode *node;
    };
    // "Greater" comparison turns priority_queue's max-heap into a min-heap.
    struct Later {
        bool operator()(const Entry &a, const Entry &b) const {
            if (a.val != b.val)
                return a.val > b.val;
            return a.position > b.position;
        }
    };

    ListNode *mergeKLists(vector<ListNode *> &lists) {
        // Min-heap holding each surviving list's current head, keyed by
        // (value, input position): the next node of the output is always the
        // smallest head, and each list keeps exactly one entry in the heap.
        priority_queue<Entry, vector<Entry>, Later> heap;
        for (int position = 0; position < (int)lists.size(); ++position) {
            if (lists[position] != nullptr) {
                heap.push(Entry{lists[position]->val, position, lists[position]});
            }
        }
        // Dummy head: every attachment happens the same way and the real
        // head falls out as dummy.next.
        ListNode dummy(0);
        ListNode *tail = &dummy;
        while (!heap.empty()) {
            Entry smallest = heap.top();
            heap.pop();
            tail->next = smallest.node;
            tail = smallest.node;
            // The node's own list continues through its successor, which
            // re-enters the heap as that list's new single entry.
            if (smallest.node->next != nullptr) {
                ListNode *next = smallest.node->next;
                heap.push(Entry{next->val, smallest.position, next});
            }
        }
        // Every list ran dry inside the loop, so the last attached node
        // already ends with nullptr and the chain is complete.
        return dummy.next;
    }
};
