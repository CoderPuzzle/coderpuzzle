from bisect import bisect_right


class Solution:
    def minWastedSpace(self, packages: List[int], boxes: List[List[int]]) -> int:
        # Per supplier: sorted boxes assign each package its smallest
        # fitting size; waste = count*(box) - range package sum via
        # prefix sums. Skip suppliers whose largest box is too small.
        pkg = sorted(packages)
        n = len(pkg)
        pre = [0] * (n + 1)
        for i, v in enumerate(pkg):
            pre[i + 1] = pre[i] + v
        best = None
        for supplier in boxes:
            s = sorted(supplier)
            if s[-1] < pkg[-1]:
                continue
            waste = 0
            prev = 0
            for b in s:
                cnt = bisect_right(pkg, b)
                if cnt > prev:
                    waste += (cnt - prev) * b - (pre[cnt] - pre[prev])
                    prev = cnt
                if prev == n:
                    break
            if best is None or waste < best:
                best = waste
        return -1 if best is None else best % (10**9 + 7)
