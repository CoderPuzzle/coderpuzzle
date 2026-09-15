class Solution {
  private:
    // Walks the list in original order while the recursion claims nodes
    // exactly where an inorder insertion would place them.
    ListNode *current = nullptr;

  public:
    TreeNode *sortedListToBST(ListNode *head) {
        // One sizing pass first: the recursion needs each subtree's node
        // count to pick the same middles the midpoint walk would.
        int count = 0;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            count++;
        }
        current = head;
        return build(0, count);
    }

  private:
    TreeNode *build(int lo, int hi) {
        if (lo >= hi) {
            return nullptr;
        }
        // The left subtree is the first half of [lo, hi) — the same
        // tie-break as the midpoint walk, so both variants build the
        // identical tree.
        int mid = (lo + hi) / 2;
        TreeNode *left = build(lo, mid);
        // Inorder position: after the left subtree, the next node in
        // original order is the root; the cursor hands it over and steps
        // forward, then the right subtree takes what remains.
        TreeNode *root = new TreeNode(current->val);
        current = current->next;
        root->left = left;
        root->right = build(mid + 1, hi);
        return root;
    }
};
