class Solution:
    def truncateSentence(self, s: str, k: int) -> str:
        # Cut right after the k-th word: each space closes one word, so the
        # k-th space (when it exists) sits exactly at the cut point.
        count = 0
        for i, ch in enumerate(s):
            if ch == " ":
                count += 1
                if count == k:
                    return s[:i]
        return s
