from typing import List


class Solution:
    def subsequencesWithMiddleMode(self, nums: List[int]) -> int:
        # Fix the middle index m of the size-5 subsequence and count the
        # (left pair, right pair) combinations where x = nums[m] is the
        # unique mode. If x is picked a+b more times on the sides, its
        # frequency is 1+a+b: with a+b >= 2 no other value (at most
        # 4-a-b picks) can tie, so those patterns need no checking.
        MOD = 10**9 + 7
        n = len(nums)
        ids = {}
        comp = []
        for v in nums:
            comp.append(ids.setdefault(v, len(ids)))
        d = len(ids)
        cntL = [0] * d
        cntR = [0] * d
        # pair sums sum C(count, 2) per side, maintained as counts move
        S_L = 0
        S_R = 0
        for i in range(1, n):
            c = cntR[comp[i]]
            S_R += c
            cntR[comp[i]] = c + 1
        ans = 0
        for m in range(n):
            x = comp[m]
            if m:
                # advance: nums[m-1] joins the left, nums[m] leaves the right
                y = comp[m - 1]
                c = cntL[y]
                S_L += c
                cntL[y] = c + 1
                c = cntR[x]
                cntR[x] = c - 1
                S_R -= c - 1
            l, r = cntL[x], cntR[x]
            ml, mr = m - l, n - 1 - m - r
            cl = l * (l - 1) // 2
            cr = r * (r - 1) // 2
            # pair sums over non-x values only: x contributes cl / cr itself
            SL = S_L - cl
            SR = S_R - cr
            # exactly one side copy of x: the 3 non-x picks must differ, so
            # the right pair avoids the left pick's value (T_R), or mirrored
            T_R = 0
            for u in range(d):
                lu = cntL[u]
                if lu and u != x:
                    cR = cntR[u]
                    t = mr - cR
                    T_R += lu * (t * (t - 1) // 2 - SR + cR * (cR - 1) // 2)
            T_L = 0
            for u in range(d):
                ru = cntR[u]
                if ru and u != x:
                    cL = cntL[u]
                    t = ml - cL
                    T_L += ru * (t * (t - 1) // 2 - SL + cL * (cL - 1) // 2)
            total = (
                cl * (mr * (mr - 1) // 2)
                + cl * r * mr
                + cl * cr
                + l * ml * r * mr
                + l * ml * cr
                + (ml * (ml - 1) // 2) * cr
                + l * T_R
                + r * T_L
            )
            ans = (ans + total) % MOD
        return ans
