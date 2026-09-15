class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        # Triples are collected by their three sorted values, so a value
        # triple that closes at several positions arrives several times but
        # is kept once.
        triples = set()
        # Pin each distinct value once, at its first occurrence: the suffix
        # behind the first occurrence is a superset of every later one, so
        # no distinct triple is lost and identical re-scans are skipped.
        pinned = set()
        for i in range(len(nums) - 2):
            first = nums[i]
            if first in pinned:
                continue
            pinned.add(first)
            # Values already passed in this suffix. A complement found here
            # sits strictly between i and the closing element, so the three
            # values occupy three different positions.
            seen = set()
            for later in nums[i + 1 :]:
                complement = -(first + later)
                if complement in seen:
                    triples.add(tuple(sorted((first, complement, later))))
                seen.add(later)
        # The hash walk has no order of its own, so one final sort buys what
        # the sorted walk gives the two-pointer variant for free: each
        # triple's values ascending, the triples themselves lexicographic.
        return [list(triple) for triple in sorted(triples)]
