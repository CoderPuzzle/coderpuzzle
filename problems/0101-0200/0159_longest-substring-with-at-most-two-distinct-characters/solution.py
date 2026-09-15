class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        # Sliding window with a character count map. The map never holds more
        # than two entries, so the window is always a valid substring and the
        # answer is simply the largest width it ever reaches.
        counts = {}
        best = 0
        left = 0
        for right, ch in enumerate(s):
            counts[ch] = counts.get(ch, 0) + 1
            # A third distinct character broke the rule: shrink from the left
            # until one character's count drains to zero and leaves the map.
            while len(counts) > 2:
                leftmost = s[left]
                counts[leftmost] -= 1
                if counts[leftmost] == 0:
                    del counts[leftmost]
                left += 1
            best = max(best, right - left + 1)
        return best
