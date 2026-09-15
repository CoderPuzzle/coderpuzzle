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
        // Walk from the head remembering every node by address. The first
        // node to come around a second time is the cycle's entry; running
        // off the end instead means no cycle.
        unordered_set<ListNode *> seen;
        ListNode *node = nodes[0];
        while (node != nullptr && seen.count(node) == 0) {
            seen.insert(node);
            node = node->next;
        }
        if (node == nullptr) {
            for (ListNode *n : nodes) {
                delete n;
            }
            return -1;
        }
        // The judge wants an index: count steps from the head to the entry.
        int index = 0;
        ListNode *entry = nodes[0];
        while (entry != node) {
            entry = entry->next;
            index++;
        }
        for (ListNode *n : nodes) {
            delete n;
        }
        return index;
    }
};
