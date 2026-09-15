from typing import List, Optional


class Solution:
    def shiftingLetters(self, s: str, shifts: List[List[int]]) -> str:
        n = len(s)
        # Shifts commute, so only the net shift per position matters.
        # Extra slot at n keeps every end+1 marker in bounds.
        diff = [0] * (n + 1)
        for start, end, direction in shifts:
            delta = 1 if direction == 1 else -1
            # +delta at start, -delta just past end: an O(1) range update.
            diff[start] += delta
            diff[end + 1] -= delta
        chars = []
        shift = 0
        for i, c in enumerate(s):
            # Prefix sum turns the difference array into the net shift;
            # Python's % is non-negative, so wraps both ways are handled.
            shift += diff[i]
            chars.append(chr((ord(c) - 97 + shift) % 26 + 97))
        return "".join(chars)
