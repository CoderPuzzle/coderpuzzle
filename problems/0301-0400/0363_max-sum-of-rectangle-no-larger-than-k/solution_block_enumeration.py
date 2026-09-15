class Solution:
    def maxSumSubmatrix(self, matrix: list[list[int]], k: int) -> int:
        m = len(matrix)
        n = len(matrix[0])
        # prefix[r][c] = sum of the r x c rectangle in the top-left corner;
        # any block is four lookups against this table.
        prefix = [[0] * (n + 1) for _ in range(m + 1)]
        for r in range(1, m + 1):
            row = matrix[r - 1]
            for c in range(1, n + 1):
                prefix[r][c] = prefix[r - 1][c] + prefix[r][c - 1] - prefix[r - 1][c - 1] + row[c - 1]
        best = None
        # Walk every block by its four corner coordinates and keep the
        # largest total that respects the cap.
        for top in range(m):
            for bottom in range(top, m):
                for left in range(n):
                    pt = prefix[top]
                    pb = prefix[bottom + 1]
                    for right in range(left, n):
                        total = pb[right + 1] - pt[right + 1] - pb[left] + pt[left]
                        if total <= k and (best is None or total > best):
                            best = total
        return best
