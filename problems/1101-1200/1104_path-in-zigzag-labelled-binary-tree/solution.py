from typing import List


class Solution:
    def pathInZigZagTree(self, label: int) -> List[int]:
        # Walk up level by level using each node's position within its row.
        # The parent of the node at position p sits at position p // 2 in the
        # row above, in every row; only the label-to-position mapping flips
        # direction between rows. Fill the result from the back so the path
        # comes out root-first without a separate reverse.
        level = label.bit_length() - 1
        result = [0] * (level + 1)
        cur = label
        for i in range(level, -1, -1):
            result[i] = cur
            if i == 0:
                break
            low = 1 << i
            high = (1 << (i + 1)) - 1
            position = (cur - low) if i % 2 == 0 else (high - cur)
            parent_position = position // 2
            low = 1 << (i - 1)
            high = (1 << i) - 1
            cur = (low + parent_position) if (i - 1) % 2 == 0 else (high - parent_position)
        return result
