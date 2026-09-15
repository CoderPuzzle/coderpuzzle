class Solution {
  private:
    struct ListNode {
        int val;
        ListNode *next;
        ListNode(int v) : val(v), next(nullptr) {}
    };

  public:
    bool hasCycle(vector<int> &values, int pos) {
        if (values.empty()) {
            // Empty input is acyclic by convention.
            return false;
        }
        // Materialize the wire form: one node per value, then link in order.
        vector<ListNode *> nodes;
        nodes.reserve(values.size());
        for (int v : values) {
            nodes.push_back(new ListNode(v));
        }
        for (size_t i = 0; i + 1 < nodes.size(); i++) {
            nodes[i]->next = nodes[i + 1];
        }
        // Point the tail back at index pos to close the cycle.
        if (pos != -1) {
            nodes.back()->next = nodes[pos];
        }
        // Walk from the head remembering every node by address; a cycle
        // traps the walk, so the first node to come around a second time
        // proves it.
        unordered_set<ListNode *> seen;
        ListNode *node = nodes[0];
        while (node != nullptr) {
            if (seen.count(node)) {
                for (ListNode *n : nodes) {
                    delete n;
                }
                return true;
            }
            seen.insert(node);
            node = node->next;
        }
        // The walk ran off the end of the list: no cycle.
        for (ListNode *n : nodes) {
            delete n;
        }
        return false;
    }
};
