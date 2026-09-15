class Solution {
  private:
    struct ListNode {
        int val;
        ListNode *next;
        ListNode(int v) : val(v), next(nullptr) {}
    };

  public:
    int detectCycle(vector<int> &values, int pos) {
        if (values.empty()) {
            return -1;
        }
        // Materialize the wire form: one node per value, tail back to pos.
        vector<ListNode *> nodes;
        nodes.reserve(values.size());
        for (int v : values) {
            nodes.push_back(new ListNode(v));
        }
        for (size_t i = 0; i + 1 < nodes.size(); i++) {
            nodes[i]->next = nodes[i + 1];
        }
        if (pos != -1) {
            nodes.back()->next = nodes[pos];
        }
        // Phase 1: tortoise-and-hare scan; fast falling off the end means
        // no cycle.
        ListNode *slow = nodes[0];
        ListNode *fast = nodes[0];
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                // Phase 2: with a = head-to-entry, b = entry-to-meeting and
                // c = the rest of the loop, a + 2b + c = 2(a + b) gives c = a,
                // so a finder restarted at the head and slow continuing from
                // the meeting point converge after exactly a steps — on the
                // entry node.
                ListNode *finder = nodes[0];
                while (finder != slow) {
                    finder = finder->next;
                    slow = slow->next;
                }
                // The judge wants an index: count steps from head to entry.
                int index = 0;
                ListNode *entry = nodes[0];
                while (entry != finder) {
                    entry = entry->next;
                    index++;
                }
                for (ListNode *n : nodes) {
                    delete n;
                }
                return index;
            }
        }
        for (ListNode *n : nodes) {
            delete n;
        }
        return -1;
    }
};
