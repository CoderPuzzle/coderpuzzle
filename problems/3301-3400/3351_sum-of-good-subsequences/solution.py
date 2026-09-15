from typing import List, Optional


class Solution:
    def sumOfGoodSubsequences(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        # cnt[v] / sm[v]: number of, and total element sum of, the good
        # subsequences seen so far that end in value v. The differ-by-one
        # constraint only involves the last value, so this is enough state.
        cnt = {}
        sm = {}
        total = 0
        for v in nums:
            # New subsequences ending at v: the singleton [v] plus every
            # recorded subsequence ending in v-1 or v+1 extended by v.
            c_prev = cnt.get(v - 1, 0)
            c_next = cnt.get(v + 1, 0)
            s_prev = sm.get(v - 1, 0)
            s_next = sm.get(v + 1, 0)
            new_cnt = (1 + c_prev + c_next) % MOD
            # Each of the new_cnt subsequences gains one copy of v; the
            # elements already inside carry their sums forward.
            new_sum = (v * new_cnt + s_prev + s_next) % MOD
            cnt[v] = (cnt.get(v, 0) + new_cnt) % MOD
            sm[v] = (sm.get(v, 0) + new_sum) % MOD
            # A subsequence's sum is folded in when its last element is
            # appended, so every good subsequence is counted exactly once.
            total = (total + new_sum) % MOD
        return total
