from typing import List


class Solution:
    def getSum(self, nums: List[int]) -> int:
        # Per-value chain-sum DP over four hash maps keyed by value. For
        # each direction, inc_cnt/dec_cnt count the chains seen so far that
        # end at an element of a value and inc_sum/dec_sum carry their total
        # element-sum; buckets accumulate across duplicate occurrences, so
        # element x extends every earlier chain ending at x-1 (or x+1) —
        # subsequence semantics, not substring. New chains ending here have
        # count cnt + 1 (the singleton [x]) and sum sum + cnt * x + x (each
        # extending chain gains one tail worth x). The singleton lives in
        # both directions but is counted once: step contribution
        # inc_sum' + dec_sum' - x. Reduced mod 10**9 + 7 every update, so
        # intermediates are cnt * x < ~10**14 — inside Python ints anyway.
        mod = 10**9 + 7
        inc_cnt, inc_sum = {}, {}
        dec_cnt, dec_sum = {}, {}
        total = 0
        for x in nums:
            ci = inc_cnt.get(x - 1, 0)
            si = inc_sum.get(x - 1, 0)
            cd = dec_cnt.get(x + 1, 0)
            sd = dec_sum.get(x + 1, 0)
            ni = ci + 1
            nsi = (si + ni * x) % mod
            nd = cd + 1
            nsd = (sd + nd * x) % mod
            total = (total + nsi + nsd - x) % mod
            inc_cnt[x] = inc_cnt.get(x, 0) + ni
            inc_sum[x] = (inc_sum.get(x, 0) + nsi) % mod
            dec_cnt[x] = dec_cnt.get(x, 0) + nd
            dec_sum[x] = (dec_sum.get(x, 0) + nsd) % mod
        return total
