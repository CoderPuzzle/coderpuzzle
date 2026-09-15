from typing import List


class Solution:
    def lastVisitedIntegers(self, nums: List[int]) -> List[int]:
        # seen holds the positives with the most recent one at the front; k
        # counts consecutive -1s and every positive resets it, so each -1
        # either reads the k-th element from the front of seen — the k-th
        # most recent positive — or appends -1 when seen is too short.
        seen: List[int] = []
        ans: List[int] = []
        k = 0
        for num in nums:
            if num != -1:
                seen.insert(0, num)
                k = 0
            else:
                k += 1
                ans.append(seen[k - 1] if k <= len(seen) else -1)
        return ans
