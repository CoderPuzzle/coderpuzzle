from typing import List


class Solution:
    def subsequencesWithMiddleMode(self, nums: List[int]) -> int:
        mod = 10**9 + 7
        n = len(nums)
        total = {}
        for x in nums:
            total[x] = total.get(x, 0) + 1
        # Exact power-sum aggregates over left-side counts lw, kept as true
        # integers (bounded by n^3 <= 1e15) so every division by 2 below
        # happens on a genuine integer.
        left = {}
        S1 = S2 = S3 = 0  # sum lw, sum lw^2, sum lw^3
        T1 = T2 = T3 = 0  # sum lw*cnt, sum lw*cnt^2, sum lw^2*cnt
        SC2 = sum(c * c for c in total.values())

        def c2(x):
            return x * (x - 1) // 2 if x >= 2 else 0

        def m(x):
            return x % mod

        def cm(a, b):
            return m(a) * m(b) % mod

        answer = 0
        for i, v in enumerate(nums):
            cntv = total[v]
            l = left.get(v, 0)
            r = cntv - l - 1  # the middle occurrence belongs to neither side
            L = i
            R = n - 1 - i
            NL = L - l  # non-v elements left of i
            NR = R - r  # non-v elements right of i

            # Per-value sums over w != v, rebuilt from the aggregates.
            # For v itself the moment value cnt - l still contains the
            # middle element, so its exclusion squares (r + 1).
            sum_lw2 = S2 - l * l
            sum_lw = S1 - l
            sum_rw2 = SC2 - 2 * T1 + S2 - (r + 1) * (r + 1)
            sum_rw = R - r
            sum_lw_rw = (T1 - l * cntv) - sum_lw2
            sum_lw_rw2 = (T2 - l * cntv * cntv) - 2 * (T3 - l * l * cntv) + (S3 - l**3)
            sum_lw2_rw = (T3 - l * l * cntv) - (S3 - l**3)
            sum_c2rw = (sum_rw2 - sum_rw) // 2
            sum_c2lw = (sum_lw2 - sum_lw) // 2
            # sum_w lw*rw*(NR - rw) and sum_w rw*lw*(NL - lw)
            d10 = NR * sum_lw_rw - sum_lw_rw2
            d01 = NL * sum_lw_rw - sum_lw2_rw

            # Count by f, the frequency of v inside the subsequence. With
            # f >= 3 no other value can catch up, so only f = 2 needs the
            # inclusion-exclusion on the three non-v fills.
            val = cm(c2(l), c2(r))  # f = 5
            val += (cm(l, c2(r)) * NL + cm(c2(l), r) * NR) % mod  # f = 4
            val += cm(c2(r), c2(NL)) + cm(cm(l, r), NL * NR) + cm(c2(l), c2(NR))  # f = 3
            # f = 2: one more v on the left (or right), the three non-v
            # fills pairwise distinct.
            g10 = (NL * c2(NR) - NL * sum_c2rw - d10) % mod
            val += l * g10 % mod
            g01 = (c2(NL) * NR - NR * sum_c2lw - d01) % mod
            val += r * g01 % mod

            answer = (answer + val) % mod

            # nums[i] joins the left side for every later middle.
            old = left.get(v, 0)
            S1 += 1
            S2 += 2 * old + 1
            S3 += 3 * old * old + 3 * old + 1
            T1 += cntv
            T2 += cntv * cntv
            T3 += cntv * (2 * old + 1)
            left[v] = old + 1

        return answer
