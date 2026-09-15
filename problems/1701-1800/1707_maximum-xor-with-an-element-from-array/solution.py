from typing import List, Optional


class _Node:
    __slots__ = ("child",)

    def __init__(self):
        self.child = [None, None]


class Solution:
    def maximizeXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        nums = sorted(nums)
        sorted_queries = sorted((mi, xi, idx) for idx, (xi, mi) in enumerate(queries))
        answers = [0] * len(queries)
        root = _Node()
        ptr = 0
        n = len(nums)
        # Offline: with nums and queries both sorted by threshold, the trie
        # holds exactly the values <= mi when a query runs, so the filter
        # costs nothing at query time.
        for mi, xi, idx in sorted_queries:
            # ptr only moves forward — each number enters the trie once.
            while ptr < n and nums[ptr] <= mi:
                node = root
                v = nums[ptr]
                # 30 levels (bit 29 down to 0) cover every value < 2^30.
                for bit in range(29, -1, -1):
                    b = (v >> bit) & 1
                    if node.child[b] is None:
                        node.child[b] = _Node()
                    node = node.child[b]
                ptr += 1
            if ptr == 0:
                # Threshold admits no element yet — no candidate exists.
                answers[idx] = -1
                continue
            node = root
            best = 0
            # Greedy descent from the MSB: prefer the complement child so this
            # result bit becomes 1; settle for the matching child otherwise.
            for bit in range(29, -1, -1):
                xb = (xi >> bit) & 1
                want = 1 - xb
                if node.child[want] is not None:
                    best |= 1 << bit
                    node = node.child[want]
                else:
                    node = node.child[xb]
            answers[idx] = best
        return answers
