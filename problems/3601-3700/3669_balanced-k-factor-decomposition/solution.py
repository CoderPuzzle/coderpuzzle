from typing import List


class Solution:
    def minDifference(self, n: int, k: int) -> List[int]:
        # Trial division up to sqrt(n) gathers each divisor pair (d, n // d);
        # sorted ascending, they are the only values a decomposition can use.
        divs = []
        d = 1
        while d * d <= n:
            if n % d == 0:
                divs.append(d)
                if d * d != n:
                    divs.append(n // d)
            d += 1
        divs.sort()

        # Building factors in nondecreasing order makes the search visit
        # complete splits in lexicographic order, so replacing the best only
        # on a strictly smaller spread pins the lexicographically smallest
        # optimal split.
        best: List[int] = []

        def dfs(start: int, slots: int, prod: int, path: List[int]) -> None:
            nonlocal best
            if slots == 1:
                # The last factor is forced to carry the product up to n; it
                # completes a nondecreasing split exactly when it reaches the
                # last pick. Both ends of the spread then sit on the path.
                last = n // prod
                if prod * last == n and (not path or last >= path[-1]):
                    if not best or last - path[0] < best[-1] - best[0]:
                        best = path + [last]
                return
            for i in range(start, len(divs)):
                dv = divs[i]
                if dv * prod > n:
                    break
                dfs(i, slots - 1, dv * prod, path + [dv])

        dfs(0, k, 1, [])
        return best
