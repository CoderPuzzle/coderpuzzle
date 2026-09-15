class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        # Walk t once, advancing a pointer into s on every match; greedy is
        # safe — matching each character at its earliest legal position in t
        # never hurts a later one.
        i = 0
        for ch in t:
            if i < len(s) and ch == s[i]:
                i += 1
        # All of s was matched in order iff the pointer reached its end.
        return i == len(s)
