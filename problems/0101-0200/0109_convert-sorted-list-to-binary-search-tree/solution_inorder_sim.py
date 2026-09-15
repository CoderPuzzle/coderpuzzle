from typing import List, Optional


class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        # One sizing pass first: the recursion needs each subtree's node
        # count to pick the same middles the midpoint walk would.
        count = 0
        node = head
        while node is not None:
            count += 1
            node = node.next
        # The cursor walks the list in original order; the recursion claims
        # nodes exactly where an inorder insertion would place them.
        current = head

        def build(lo: int, hi: int) -> Optional[TreeNode]:
            nonlocal current
            if lo >= hi:
                return None
            # The left subtree is the first half of [lo, hi) — the same
            # tie-break as the midpoint walk, so both variants build the
            # identical tree.
            mid = (lo + hi) // 2
            left = build(lo, mid)
            # Inorder position: after the left subtree, the next node in
            # original order is the root; the cursor hands it over and
            # steps forward, then the right subtree takes what remains.
            root = TreeNode(current.val)
            current = current.next
            root.left = left
            root.right = build(mid + 1, hi)
            return root

        return build(0, count)
