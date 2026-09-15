class Solution:
    def checkPartitioning(self, s: str) -> bool:
        n = len(s)
        # is_pal[l][r] == 1 iff s[l..r] is a palindrome. bytearray rows
        # keep the table compact at n = 2000.
        is_pal = [bytearray(n) for _ in range(n)]
        for i in range(n):
            is_pal[i][i] = 1
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                is_pal[i][i + 1] = 1
        for length in range(3, n + 1):
            for l in range(n - length + 1):
                r = l + length - 1
                if s[l] == s[r] and is_pal[l + 1][r - 1]:
                    is_pal[l][r] = 1
        # Three non-empty parts are fixed by two cuts i and j; every cut
        # pair is tried against the table.
        for i in range(1, n - 1):
            if not is_pal[0][i - 1]:
                continue
            for j in range(i + 1, n):
                if is_pal[i][j - 1] and is_pal[j][n - 1]:
                    return True
        return False
