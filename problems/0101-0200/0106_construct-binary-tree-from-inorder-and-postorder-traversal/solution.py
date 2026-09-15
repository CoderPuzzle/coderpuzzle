from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        # Value -> inorder index: makes each split lookup O(1) instead of a
        # linear scan. Values are unique, so a hit is exactly one split point.
        index = {value: i for i, value in enumerate(inorder)}
        # Postorder ends with the root, and the reversed array lists root,
        # right subtree, left subtree -- so a cursor walking postorder
        # backwards hands out subtree roots in exactly the order the frames
        # below claim them.
        position = len(postorder) - 1
        # A dummy parent lets the real root pass through the same attach
        # logic as every other node; the answer is dummy.left.
        dummy = TreeNode(0)
        # Frames are (parent, attach_left, low, high) over inorder ranges.
        # Popping a frame claims at most one root value from the cursor, so
        # an explicit stack -- not recursion -- drives the build: the
        # constraint ceiling allows a 3000-node chain, and recursion that
        # deep is not safe in every judge language.
        stack = [(dummy, True, 0, len(inorder))]
        while stack:
            parent, attach_left, low, high = stack.pop()
            if low >= high:
                # Empty inorder range <=> missing subtree.
                continue
            value = postorder[position]
            position -= 1
            node = TreeNode(value)
            if attach_left:
                parent.left = node
            else:
                parent.right = node
            mid = index[value]
            # Inorder visits left, root, right: [low, mid) is the left
            # subtree and [mid + 1, high) the right. Left is pushed first
            # so the right frame pops -- and its root is consumed -- first.
            stack.append((node, True, low, mid))
            stack.append((node, False, mid + 1, high))
        return dummy.left
