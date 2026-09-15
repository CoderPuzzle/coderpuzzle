from typing import List, Optional


class Solution:
    def distinctEchoSubstrings(self, text: str) -> int:
        n = len(text)
        # An echo is exactly an even-length substring whose two halves are
        # identical, so each one is characterized by a half length and a
        # start index — enumerate every such (half, i) pair.
        seen = set()
        for half in range(1, n // 2 + 1):
            # Start positions with room for the full doubled substring.
            for i in range(n - 2 * half + 1):
                # Direct half comparison: no non-echo can pass, and every
                # echo appears for exactly its own (half, i).
                if text[i : i + half] == text[i + half : i + 2 * half]:
                    # The set silently discards repeats — equal substrings
                    # hash/compare identically — so its size is the answer.
                    seen.add(text[i : i + 2 * half])
        return len(seen)
