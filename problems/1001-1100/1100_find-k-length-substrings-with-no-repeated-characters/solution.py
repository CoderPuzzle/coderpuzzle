class Solution:
    def numKLenSubstrNoRepeats(self, s: str, k: int) -> int:
        # A window of length k is valid exactly when all k positions hold
        # different characters, i.e. distinct == k. Slide in place.
        if k > len(s) or k > 26:
            return 0
        freq = {}
        distinct = 0
        ans = 0
        for i, ch in enumerate(s):
            freq[ch] = freq.get(ch, 0) + 1
            if freq[ch] == 1:
                distinct += 1
            if i >= k:
                left = s[i - k]
                freq[left] -= 1
                if freq[left] == 0:
                    distinct -= 1
            if distinct == k:
                ans += 1
        return ans
