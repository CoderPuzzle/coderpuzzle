class Solution:
    def maxDifference(self, s: str) -> int:
        # To maximize freq(a1) - freq(a2), take the largest odd frequency
        # and the smallest even one; one counting pass decides both.
        freq = [0] * 26
        for ch in s:
            freq[ord(ch) - 97] += 1
        odd, even = -1, 101
        for f in freq:
            if f == 0:
                continue
            if f & 1:
                odd = max(odd, f)
            else:
                even = min(even, f)
        return odd - even
