from typing import List, Optional


class Solution:
    def maxDistance(self, side: int, points: List[List[int]], k: int) -> int:
        L = 4 * side

        def perimeter(x, y):
            if y == 0:
                return x
            if x == side:
                return side + y
            if y == side:
                return 2 * side + (side - x)
            # x == 0
            return 3 * side + (side - y)

        coords = sorted(perimeter(x, y) for x, y in points)
        n = len(coords)
        arr = coords + [c + L for c in coords]

        def feasible(d):
            if d == 0:
                return True
            nxt = [0] * (2 * n)
            for j in range(2 * n):
                lo, hi = j + 1, 2 * n
                target = arr[j] + d
                while lo < hi:
                    m2 = (lo + hi) // 2
                    if arr[m2] < target:
                        lo = m2 + 1
                    else:
                        hi = m2
                nxt[j] = lo
            for i in range(n):
                cnt = 1
                cur = i
                ok = True
                for _ in range(k - 1):
                    j = nxt[cur]
                    if j >= i + n:
                        ok = False
                        break
                    cur = j
                    cnt += 1
                if ok and cnt == k:
                    if arr[cur] + d <= arr[i] + L:
                        return True
            return False

        lo, hi = 0, 2 * side
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
