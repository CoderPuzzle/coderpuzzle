# Bundle-provided types (assembled with this submission):
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def minimumLevel(self, root: Optional[TreeNode]) -> int:
        # One breadth-first pass groups nodes level by level; each level's
        # sum competes against the running minimum with a strict
        # less-than, so on a tie the earliest — lowest — level stays the
        # answer. An explicit queue, never recursion: a skewed tree runs
        # 10^5 nodes deep. Level sums reach 10^5 * 10^9 = 10^14, which
        # Python integers absorb without widening.
        best_level = 1
        best_sum = None
        level = 1
        pending = [root]
        while pending:
            total = 0
            nxt = []
            for node in pending:
                total += node.val
                if node.left is not None:
                    nxt.append(node.left)
                if node.right is not None:
                    nxt.append(node.right)
            if best_sum is None or total < best_sum:
                best_sum = total
                best_level = level
            pending = nxt
            level += 1
        return best_level
