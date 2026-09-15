from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def constructFromPrePost(self, preorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        # Value -> postorder index: makes the left subtree's size an O(1)
        # lookup instead of a scan. Values are unique, so a hit names the
        # one place the left subtree's postorder segment ends.
        index = {value: i for i, value in enumerate(postorder)}

        # build(low, high, post_low) raises the subtree over the preorder
        # range [low, high); its postorder segment starts at post_low. The
        # 30-node ceiling bounds the nesting at 30 calls, so plain
        # recursion is safe in this judge's every runtime.
        def build(low: int, high: int, post_low: int) -> Optional[TreeNode]:
            if low >= high:
                # An empty range is a missing subtree.
                return None
            node = TreeNode(preorder[low])
            if high - low == 1:
                # The subtree is a lone leaf: no child split to find.
                return node
            # The value right behind the root roots the subtree that
            # follows. Postorder ends that subtree with its own root, so
            # [post_low, index[...]] is exactly the left subtree and its
            # size is one past that position.
            left_size = index[preorder[low + 1]] + 1 - post_low
            node.left = build(low + 1, low + 1 + left_size, post_low)
            # Whatever remains is the right subtree. When the root really
            # has one child, the left range swallowed the whole remainder
            # and this range comes back empty -- the only child stays on
            # the left, the required answer, with no branch needed.
            node.right = build(low + 1 + left_size, high, post_low + left_size)
            return node

        return build(0, len(preorder), 0)
