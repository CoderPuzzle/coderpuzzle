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
        // Floyd's tortoise and hare: slow advances one node per step, fast two.
        ListNode *slow = nodes[0];
        ListNode *fast = nodes[0];
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            // fast gains one node per lap on slow, so inside a cycle it must
            // catch slow within a single lap: meeting proves the cycle.
            if (slow == fast) {
                for (ListNode *n : nodes) {
                    delete n;
                }
                return true;
            }
        }
        for (ListNode *n : nodes) {
            delete n;
        }
        return false;
    }
};
