from typing import List


class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        # Each subarray contributes a +max and a -min mark, so at most
        # min(k, n // 2) opposite pairs exist; a pair's credit is its plus
        # mark minus its minus mark -- exactly one subarray's range.
        # On a linear scan the cyclic pairing takes one of two shapes:
        #   phase 0 -- every pair closes inside the array;
        #   phase 1 -- the seam pair opens at the first mark and closes at
        #              the last, while middle marks pair among themselves.
        n = len(nums)
        p = min(k, n // 2)
        neg = float("-inf")
        size = p + 1

        def shift_add(states: List[float], delta: int) -> List[float]:
            # Closing a pair completes it, so the count grows by one.
            out = [neg] * size
            for i in range(1, size):
                if states[i - 1] != neg:
                    out[i] = states[i - 1] + delta
            return out

        def bump(states: List[float], delta: int) -> List[float]:
            return [v + delta if v != neg else v for v in states]

        def merge(a: List[float], b: List[float]) -> List[float]:
            return [x if x >= y else y for x, y in zip(a, b)]

        # Phase 0: closed[j] = j pairs done; op/om = one open pair that was
        # started with a +/- and still owes its opposite sign.
        closed = [neg] * size
        closed[0] = 0
        op = [neg] * size
        om = [neg] * size
        # Phase 1: wp/wm = the seam pair open, started +/-; wXY = seam X and
        # a simultaneously open middle pair Y; fz = the seam pair has closed.
        wp, wm, wpp, wpm, wmp, wmm, fz = ([neg] * size for _ in range(7))

        for a in nums:
            pristine = closed[0]

            n_op = merge(op, bump(closed, a))
            n_om = merge(om, bump(closed, -a))
            n_closed = merge(merge(closed, shift_add(op, -a)), shift_add(om, a))

            n_wp = wp[:]
            if pristine + a > n_wp[0]:
                n_wp[0] = pristine + a  # the seam pair opens at the first mark
            n_wm = wm[:]
            if pristine - a > n_wm[0]:
                n_wm[0] = pristine - a
            n_wpp = merge(wpp, bump(wp, a))
            n_wpm = merge(wpm, bump(wp, -a))
            n_wmp = merge(wmp, bump(wm, a))
            n_wmm = merge(wmm, bump(wm, -a))
            n_wp = merge(n_wp, shift_add(wpp, -a))
            n_wp = merge(n_wp, shift_add(wpm, a))
            n_wm = merge(n_wm, shift_add(wmp, -a))
            n_wm = merge(n_wm, shift_add(wmm, a))
            n_fz = merge(merge(fz, shift_add(wp, -a)), shift_add(wm, a))

            closed, op, om = n_closed, n_op, n_om
            wp, wm, wpp, wpm, wmp, wmm, fz = (
                n_wp,
                n_wm,
                n_wpp,
                n_wpm,
                n_wmp,
                n_wmm,
                n_fz,
            )

        return max(max(closed), max(fz), 0)
