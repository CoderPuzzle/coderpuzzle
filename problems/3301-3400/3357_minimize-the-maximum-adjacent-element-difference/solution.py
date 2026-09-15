from typing import List


class Solution:
    def minDifference(self, nums: List[int]) -> int:
        # Binary search the answer d and probe feasibility. A probe first
        # checks the adjacent known pairs, then every maximal run of -1s.
        # Order the chosen pair as x <= y: a run between lo <= hi accepts
        # x alone, y alone (a value within d of both ends), or — when the
        # run has two or more missing cells — a straddle, x within d of lo
        # and y within d of hi. "Far" mode asks whether two free values
        # stab every run's both-end interval; "close" mode slides a pair
        # with y - x <= d over candidate positions and intersects the one
        # interval each run leaves. All interval values stay within ~4e9
        # in magnitude — exact in JS Number terms (< 2**53), but past
        # 32-bit, so fixed-width languages carry them in wider ints.
        knowns = [v for v in nums if v != -1]
        if len(knowns) < 2:
            return 0  # fill everything with the single known value (or 1)
        # runs: (lo, hi, one_sided, length); one-sided runs touch an array
        # end, so lo == hi is their single known neighbour
        runs = []
        prev, run = 0, 0
        for v in nums:
            if v == -1:
                run += 1
                continue
            if run:
                if prev:
                    runs.append((min(prev, v), max(prev, v), False, run))
                else:
                    runs.append((v, v, True, run))
                run = 0
            prev = v
        if run:
            runs.append((prev, prev, True, run))
        # unchangeable adjacent known pairs: one fixed lower bound on d
        known_adj = max(
            (abs(a - b) for a, b in zip(nums, nums[1:]) if a != -1 and b != -1),
            default=0,
        )

        def feasible(d: int) -> bool:
            if d < known_adj:
                return False
            # FAR: two stabbers for the both-end interval of every run
            ivs = []
            for lo, hi, one, _ in runs:
                a, b = (lo - d, lo + d) if one else (hi - d, lo + d)
                if a > b:
                    ivs = None
                    break
                ivs.append((a, b))
            if ivs is not None:
                if not ivs:
                    return True  # no runs: known pairs were the only bound
                ivs.sort(key=lambda t: t[1])
                p = ivs[0][1]  # classic right-endpoint stab
                rest = [t for t in ivs if not (t[0] <= p <= t[1])]
                if not rest:
                    return True
                q = rest[0][1]
                if all(a <= q <= b for a, b in rest):
                    return True
            # CLOSE: y - x <= d; each run leaves y one interval once x is
            # fixed, so intersect them over candidate x positions
            cand = {1}
            for lo, hi, one, _ in runs:
                for a, b in ((lo - d, lo + d), (hi - d, hi + d)):
                    cand |= {a, b, a - d}
            for x in sorted(cand):
                if x < 1:
                    continue
                glo, ghi = 1, 4 * 10**9
                ok = True
                for lo, hi, one, ln in runs:
                    jlo, jhi = (hi - d, lo + d) if not one else (lo - d, lo + d)
                    if jlo <= x <= jhi:
                        continue  # x alone covers this run
                    if not one and ln >= 2 and lo - d <= x <= lo + d:
                        alo, ahi = hi - d, hi + d  # straddle: y takes hi
                    else:
                        alo, ahi = jlo, jhi  # y must cover both ends
                    if alo > ahi:
                        ok = False
                        break
                    glo, ghi = max(glo, alo), min(ghi, ahi)
                    if glo > ghi:
                        ok = False
                        break
                if ok and glo <= x + d and ghi >= x:
                    return True
            return False

        lo, hi = 0, max(knowns) - min(knowns)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
