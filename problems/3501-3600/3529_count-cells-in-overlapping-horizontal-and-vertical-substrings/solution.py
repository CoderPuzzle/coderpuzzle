from typing import List


class Solution:
    def countCells(self, grid: List[List[str]], pattern: str) -> int:
        m, n = len(grid), len(grid[0])
        total = m * n
        length = len(pattern)

        # KMP failure function over the pattern.
        fail = [0] * length
        k = 0
        for i in range(1, length):
            while k and pattern[i] != pattern[k]:
                k = fail[k - 1]
            if pattern[i] == pattern[k]:
                k += 1
            fail[i] = k

        def starts(text: str) -> List[int]:
            # Start offsets of every occurrence of pattern in text (KMP).
            found = []
            k = 0
            for i, ch in enumerate(text):
                while k and ch != pattern[k]:
                    k = fail[k - 1]
                if ch == pattern[k]:
                    k += 1
                if k == length:
                    found.append(i - length + 1)
                    k = fail[k - 1]
            return found

        # Horizontal reads = row-major flatten; vertical reads = column-major.
        horizontal = "".join("".join(row) for row in grid)
        vertical = "".join(grid[r][c] for c in range(n) for r in range(m))

        # Difference arrays over the two flatten orders; a match covers
        # positions start .. start + length - 1 in its own flatten order.
        hmark = [0] * (total + 1)
        for start in starts(horizontal):
            hmark[start] += 1
            hmark[start + length] -= 1
        for i in range(total):
            hmark[i + 1] += hmark[i]

        vmark = [0] * (total + 1)
        for start in starts(vertical):
            vmark[start] += 1
            vmark[start + length] -= 1
        for i in range(total):
            vmark[i + 1] += vmark[i]

        # A cell (r, c) sits at row-major position r*n+c and column-major
        # position c*m+r; it counts iff both marks cover it.
        covered = 0
        for r in range(m):
            base = r * n
            for c in range(n):
                if hmark[base + c] > 0 and vmark[c * m + r] > 0:
                    covered += 1
        return covered
