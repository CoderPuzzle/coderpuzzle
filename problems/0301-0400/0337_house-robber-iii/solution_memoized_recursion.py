class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rob(self, root: TreeNode | None) -> int:
        # Two independent questions per subtree, each with its own memo
        # table: the best with the root chosen, and the best with the root
        # barred. Asking them separately can re-descend a subtree, but the
        # tables make sure each question is settled once per node.
        take_map = {}
        skip_map = {}

        def take(node):
            if node is None:
                return 0
            if node not in take_map:
                # Taking this node bars both children outright.
                take_map[node] = node.val + skip(node.left) + skip(node.right)
            return take_map[node]

        def skip(node):
            if node is None:
                return 0
            if node not in skip_map:
                # Each child keeps its better option.
                skip_map[node] = max(take(node.left), skip(node.left)) + max(take(node.right), skip(node.right))
            return skip_map[node]

        return max(take(root), skip(root))
