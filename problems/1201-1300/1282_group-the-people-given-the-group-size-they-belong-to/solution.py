from typing import List


class Solution:
    """Bucket ids by required size, then slice each bucket into chunks of
    exactly that size — the input guarantees each bucket divides evenly."""

    def groupThePeople(self, groupSizes: List[int]) -> List[List[int]]:
        buckets = {}
        for person, size in enumerate(groupSizes):
            buckets.setdefault(size, []).append(person)
        groups = []
        for size, members in buckets.items():
            # A valid grouping exists, so len(members) is a multiple of size.
            for start in range(0, len(members), size):
                groups.append(members[start : start + size])
        return groups
