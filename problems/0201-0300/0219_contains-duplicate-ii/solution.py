from typing import List


class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        # Hash map from value -> last index seen: of all earlier copies of a
        # value, the most recent one is the nearest, so one lookup answers
        # "was this value within k positions?" in O(1).
        last_index = {}
        for index, value in enumerate(nums):
            earlier = last_index.get(value)
            # Look up before inserting, and compare against the LAST earlier
            # occurrence only: if it is out of range, every older one is too.
            if earlier is not None and index - earlier <= k:
                return True
            # Overwrite so the entry always holds the most recent position —
            # a first-occurrence map would miss later, closer pairs.
            last_index[value] = index
        return False
