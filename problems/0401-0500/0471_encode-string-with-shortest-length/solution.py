from typing import List, Optional


class Solution:
    def encode(self, s: str) -> str:
        n = len(s)
        # dp[i][j] = shortest encoding of s[i..j]; growing interval lengths
        # guarantee every subinterval is solved before it is needed.
        dp = [[""] * n for _ in range(n)]
        for length in range(1, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                substr = s[i : j + 1]
                # Candidate 1: keep the substring verbatim.
                best = substr
                # Candidate 2: split in two, concatenate optimal encodings.
                for k in range(i, j):
                    candidate = dp[i][k] + dp[k + 1][j]
                    if len(candidate) < len(best):
                        best = candidate
                compression = None
                # Candidate 3: k[pattern] when a period divides the interval.
                # Embedding the pattern's own encoding (not raw text) gives
                # nested forms like 4[2[a]] for free.
                for p in range(1, length):
                    if length % p == 0:
                        pattern = s[i : i + p]
                        if pattern * (length // p) == substr:
                            encoded = str(length // p) + "[" + dp[i][i + p - 1] + "]"
                            if compression is None or len(encoded) < len(compression):
                                compression = encoded
                # Encode only if strictly shorter — or tied against an
                # already-encoded best; a tie with the raw text keeps the
                # text ("aaa" stays "aaa", "aaaaa" becomes "5[a]").
                if compression is not None:
                    if len(compression) < len(best) or (len(compression) == len(best) and best != substr):
                        best = compression
                dp[i][j] = best
        return dp[0][n - 1]
