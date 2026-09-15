class Solution:
    def reverseWords(self, s: str) -> str:
        # Python strings are immutable, so the scan runs on a char list — the
        # honest equivalent of the in-place algorithm.
        chars = list(s)
        n = len(chars)
        start = 0
        while start < n:
            end = start
            while end < n and chars[end] != " ":
                end += 1
            # chars[start:end] is one word: reverse it with two pointers.
            lo, hi = start, end - 1
            while lo < hi:
                chars[lo], chars[hi] = chars[hi], chars[lo]
                lo += 1
                hi -= 1
            start = end + 1
        return "".join(chars)
