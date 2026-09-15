class Solution:
    def canTransform(self, start: str, result: str) -> bool:
        # Walk both strings with two pointers, skipping the X's. The i-th
        # letter of start must be the i-th letter of result — L's and R's
        # never cross and never change kind — and each must move legally:
        # an L only ever moves left onto an X, an R only right onto an X.
        i, j = 0, 0
        n, m = len(start), len(result)
        while True:
            while i < n and start[i] == "X":
                i += 1
            while j < m and result[j] == "X":
                j += 1
            if i == n or j == m:
                return i == n and j == m
            if start[i] != result[j]:
                return False
            if start[i] == "L" and j > i:
                return False  # this L would have to move right
            if start[i] == "R" and j < i:
                return False  # this R would have to move left
            i += 1
            j += 1
