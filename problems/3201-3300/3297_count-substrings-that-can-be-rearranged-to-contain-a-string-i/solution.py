from collections import Counter


class Solution:
    def validSubstringCount(self, word1: str, word2: str) -> int:
        # need[c] is how many copies of c a valid window must contain, and
        # missing counts the distinct letters whose quota is not yet met.
        need = Counter(word2)
        missing = len(need)
        window = [0] * 26
        total = 0
        left = 0
        for right, ch in enumerate(word1):
            ci = ord(ch) - 97
            window[ci] += 1
            if window[ci] == need.get(ch, 0):
                missing -= 1
            if missing == 0:
                # Shrink while the left character is not load-bearing: its
                # removal leaves every quota intact. When this stops,
                # [left..right] is the minimal covering window ending at
                # right, so starts 0..left all yield valid substrings.
                lc = word1[left]
                li = ord(lc) - 97
                while window[li] - 1 >= need.get(lc, 0):
                    window[li] -= 1
                    left += 1
                    lc = word1[left]
                    li = ord(lc) - 97
                total += left + 1
        return total
