from typing import List, Optional


class Solution:
    def minCost(self, arr: List[int], brr: List[int], k: int) -> int:
        # Splitting into singleton blocks already realizes any permutation,
        # so one paid rearrangement is all Operation 1 can offer; matching
        # sorted to sorted then minimizes sum |a - b| over permutations.
        # The answer is the cheaper of leaving arr put and paying k plus
        # that matched cost. Costs reach 4 * 10^10, past 32-bit range.
        direct = 0
        for a, b in zip(arr, brr):
            d = a - b
            direct += d if d >= 0 else -d
        matched = k
        for a, b in zip(sorted(arr), sorted(brr)):
            d = a - b
            matched += d if d >= 0 else -d
        return min(direct, matched)
