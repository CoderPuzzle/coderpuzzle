from typing import List


class Solution:
    def equalDigitFrequency(self, s: str) -> int:
        # For each start index, extend the substring one digit at a time while
        # tracking digit counts; the running (distinct digits, max frequency)
        # pair tests "every digit appears equally" in O(1) per extension.
        n = len(s)
        seen = set()
        for start in range(n):
            counts = [0] * 10
            distinct = 0
            max_count = 0
            for end in range(start, n):
                digit = ord(s[end]) - ord("0")
                if counts[digit] == 0:
                    distinct += 1
                counts[digit] += 1
                max_count = max(max_count, counts[digit])
                if max_count * distinct == end - start + 1:
                    seen.add(s[start : end + 1])
        return len(seen)
