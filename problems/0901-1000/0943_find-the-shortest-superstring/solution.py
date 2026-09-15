from typing import List, Optional


class Solution:
    def shortestSuperstring(self, words: List[str]) -> str:
        k = len(words)
        overlap = [[0] * k for _ in range(k)]
        for i in range(k):
            for j in range(k):
                if i == j:
                    continue
                best = 0
                limit = min(len(words[i]), len(words[j]))
                for size in range(1, limit + 1):
                    if words[i][-size:] == words[j][:size]:
                        best = size
                overlap[i][j] = best

        # dp[mask][j] = (length, string, index-sequence) for the best superstring
        # covering `mask` and ending with word j.
        dp = [[None] * k for _ in range(1 << k)]
        for i in range(k):
            dp[1 << i][i] = (len(words[i]), words[i], (i,))

        for mask in range(1 << k):
            for j in range(k):
                cur = dp[mask][j]
                if cur is None:
                    continue
                cur_len, cur_str, cur_seq = cur
                for nxt in range(k):
                    if (mask >> nxt) & 1:
                        continue
                    cand_len = cur_len + len(words[nxt]) - overlap[j][nxt]
                    cand_str = cur_str + words[nxt][overlap[j][nxt] :]
                    cand_seq = cur_seq + (nxt,)
                    new_mask = mask | (1 << nxt)
                    existing = dp[new_mask][nxt]
                    if (
                        existing is None
                        or cand_len < existing[0]
                        or (cand_len == existing[0] and cand_seq < existing[2])
                    ):
                        dp[new_mask][nxt] = (cand_len, cand_str, cand_seq)

        full = (1 << k) - 1
        best = min(
            (dp[full][j] for j in range(k) if dp[full][j] is not None),
            key=lambda entry: (entry[0], entry[2]),
        )
        return best[1]
