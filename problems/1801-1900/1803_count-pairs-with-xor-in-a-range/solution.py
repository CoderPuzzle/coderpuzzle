from typing import List, Optional


class Solution:
    def countPairs(self, nums: List[int], low: int, high: int) -> int:
        def pairs_le(k: int) -> int:
            # Count pairs (i, j), i < j, with nums[i] ^ nums[j] <= k, using a
            # binary trie over 16-bit values (values < 2^16).
            COUNT = "#"
            BITS = 16
            root = {}
            total = 0
            for x in nums:
                # Query the trie of previously inserted numbers.
                node = root
                for b in range(BITS - 1, -1, -1):
                    if node is None:
                        break
                    xb = (x >> b) & 1
                    if (k >> b) & 1:
                        child = node.get(xb)
                        if child is not None:
                            total += child[COUNT]
                        node = node.get(1 - xb)
                    else:
                        node = node.get(xb)
                if node is not None:
                    total += node[COUNT]
                # Insert x.
                node = root
                node[COUNT] = node.get(COUNT, 0) + 1
                for b in range(BITS - 1, -1, -1):
                    d = (x >> b) & 1
                    nxt = node.get(d)
                    if nxt is None:
                        nxt = {COUNT: 0}
                        node[d] = nxt
                    node = nxt
                    node[COUNT] = node.get(COUNT, 0) + 1
            return total

        below = pairs_le(low - 1) if low > 0 else 0
        return pairs_le(high) - below
