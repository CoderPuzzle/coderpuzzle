class Solution:
    def minWindow(self, s1: str, s2: str) -> str:
        n, m = len(s1), len(s2)
        # nxt[i][c] answers "where is the first character c at or after i?" in
        # one lookup. A backward sweep builds it: row i copies row i+1 and
        # overwrites the column of the character sitting at i; row n is all
        # sentinels, so every failed jump lands on n and ends the walk.
        nxt = [[n] * 26 for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            row = nxt[i + 1][:]
            row[ord(s1[i]) - 97] = i
            nxt[i] = row
        # A minimum window must open on s2[0] — otherwise its head could be
        # cut for a strictly shorter valid window — so walking from every such
        # opening and always jumping to the earliest continuation visits every
        # candidate. Scanning openings left to right and keeping only strictly
        # shorter windows leaves the leftmost one among equal-length winners.
        codes = [ord(c) - 97 for c in s2]
        best_len = n + 1
        best_start = -1
        for i in range(n):
            if s1[i] != s2[0]:
                continue
            pos = i
            for k in range(1, m):
                pos = nxt[pos + 1][codes[k]]
                if pos == n:
                    pos = -1
                    break
            if pos >= 0 and pos - i + 1 < best_len:
                best_len = pos - i + 1
                best_start = i
                if best_len == m:  # |s2| is the unavoidable lower bound
                    break
        return s1[best_start : best_start + best_len] if best_start >= 0 else ""
