from typing import List, Optional
from collections import defaultdict


class Solution:
    def countInterestingSubarrays(self, nums: List[int], modulo: int, k: int) -> int:
        # Only whether nums[i] % modulo == k matters, so track pref: the
        # number of hits among the prefix. A subarray is interesting iff its
        # hit count has residue k — prefix-sum counting, applied to residues.
        count = defaultdict(int)
        # Seed residue 0 for the empty prefix so subarrays starting at
        # index 0 are counted.
        count[0] = 1
        pref = 0
        ans = 0
        for x in nums:
            if x % modulo == k:
                pref += 1
            # Right endpoint at i pairs with every earlier boundary l where
            # pref[right] - pref[l] = k (mod modulo), i.e. pref[l] has this
            # residue. Consult before inserting so each pair counts once.
            need = (pref - k) % modulo
            ans += count[need]
            count[pref % modulo] += 1
        return ans
