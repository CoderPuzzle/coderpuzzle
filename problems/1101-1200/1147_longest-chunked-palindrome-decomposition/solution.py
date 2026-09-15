from typing import List, Optional


class Solution:
    def longestDecomposition(self, text: str) -> int:
        n = len(text)
        count = 0
        left = 0
        right = n
        while left < right:
            size = 1
            matched = False
            # prefix and suffix of equal size must not overlap
            while left + size <= right - size:
                if text[left : left + size] == text[right - size : right]:
                    # shortest matching pair first: an exchange argument shows
                    # splitting a longer pair here never lowers the count
                    count += 2
                    left += size
                    right -= size
                    matched = True
                    break
                size += 1
            if not matched:
                # no size pairs: the entire remainder is one final chunk
                count += 1
                break
        return count
