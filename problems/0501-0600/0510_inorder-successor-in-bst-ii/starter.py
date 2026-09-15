from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None
#   NodeWithNext:  .val int, .left/.right/.next/.parent NodeWithNext | None


class Solution:
    def inorderSuccessor(self, tree: Optional[NodeWithNext], node: int) -> Optional[NodeWithNext]:
        raise NotImplementedError("TODO")
