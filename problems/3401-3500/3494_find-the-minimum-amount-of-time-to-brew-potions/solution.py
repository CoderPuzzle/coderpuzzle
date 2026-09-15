from typing import List, Optional


class Solution:
    def minTime(self, skill: List[int], mana: List[int]) -> int:
        # No waiting means a potion's passage is rigid: once potion j starts
        # at wizard 0 at time s_j, wizard i finishes it at exactly
        # s_j + mana[j] * pref[i], with pref[i] = skill[0] + ... + skill[i-1].
        # Wizard i accepts potion j only after finishing potion j-1, so the
        # earliest feasible starts obey, with prev = mana[j-1], cur = mana[j],
        #   s_j - s_{j-1} = max_i ( prev * skill[i] + (prev - cur) * pref[i] ),
        # and choosing each s_j minimally is globally optimal since every
        # constraint grows monotonically with earlier starts. The maximand
        # is the upper envelope of the lines skill[i] + t * pref[i] queried
        # at t = (prev - cur) / prev; pref is strictly increasing, so the
        # hull builds in one pass and each query binary-searches it with
        # exact integer cross-multiplications. Times reach ~6.25 * 10^14,
        # past 32 bits — Python integers are exact regardless.
        n = len(skill)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + skill[i]

        hull_s, hull_p = [], []
        for i in range(n):
            # Pop the top line while it is never strictly above its
            # neighbours: skill >= 1 keeps every slope distinct.
            while len(hull_p) >= 2 and (hull_s[-2] - skill[i]) * (hull_p[-1] - hull_p[-2]) <= (
                hull_s[-2] - hull_s[-1]
            ) * (pref[i] - hull_p[-2]):
                hull_s.pop()
                hull_p.pop()
            hull_s.append(skill[i])
            hull_p.append(pref[i])

        total = 0
        previous = mana[0]
        for j in range(1, len(mana)):
            current = mana[j]
            p, q = previous - current, previous
            # Line b beats line a at t = p/q iff q*(s_b - s_a) >= p*(p_a - p_b).
            lo, hi = 0, len(hull_s) - 1
            while lo < hi:
                mid = (lo + hi) // 2
                if q * (hull_s[mid + 1] - hull_s[mid]) >= p * (hull_p[mid] - hull_p[mid + 1]):
                    lo = mid + 1
                else:
                    hi = mid
            total += hull_s[lo] * q + hull_p[lo] * p
            previous = current
        return total + pref[n] * mana[-1]
