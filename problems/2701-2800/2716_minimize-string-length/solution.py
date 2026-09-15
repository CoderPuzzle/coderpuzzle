class Solution:
    def minimizedStringLength(self, s: str) -> int:
        seen = [False] * 26
        for ch in s:
            seen[ord(ch) - ord("a")] = True
        count = 0
        for present in seen:
            if present:
                count += 1
        return count
