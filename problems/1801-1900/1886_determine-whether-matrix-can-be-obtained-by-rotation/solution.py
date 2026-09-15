class Solution:
    def findRotation(self, mat: List[List[int]], target: List[List[int]]) -> bool:
        # Try each of the four orientations. Clockwise rotation:
        # new[r][c] = old[n-1-c][r].
        n = len(mat)
        cur = mat
        for _ in range(4):
            if cur == target:
                return True
            cur = [[cur[n - 1 - c][r] for c in range(n)] for r in range(n)]
        return False
