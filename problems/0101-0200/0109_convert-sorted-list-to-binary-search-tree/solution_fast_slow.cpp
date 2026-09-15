class Solution {
  public:
    TreeNode *sortedListToBST(ListNode *head) { return build(head); }

  private:
    TreeNode *build(ListNode *node) {
        if (node == nullptr) {
            return nullptr;
        }
        // A one-node segment is a leaf. Doing this before the pointer walk
        // also keeps the cut below safe: with a single node prev would
        // still be null when it happens.
        if (node->next == nullptr) {
            return new TreeNode(node->val);
        }
        // Slow/fast midpoint: slow steps one node, fast two, so when fast
        // runs past the end slow has stopped on the midpoint. The guard
        // leaves slow on the SECOND of two middles for even lengths,
        // matching the required tie-break.
        ListNode *prev = nullptr;
        ListNode *slow = node;
        ListNode *fast = node;
        while (fast != nullptr && fast->next != nullptr) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        // prev trails slow, so this cut splits the segment in two; the
        // recursion then treats node and slow.next as independent heads.
        prev->next = nullptr;
        // The middle element is the only root making both sides BSTs of
        // near-equal size; nodes before it form the left subtree, after it
        // the right, so the result stays height-balanced.
        TreeNode *root = new TreeNode(slow->val);
        root->left = build(node);
        root->right = build(slow->next);
        return root;
    }
};
