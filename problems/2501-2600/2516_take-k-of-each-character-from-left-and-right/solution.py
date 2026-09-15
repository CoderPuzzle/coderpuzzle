class Solution:
    def takeCharacters(self, s: str, k: int) -> int:
        # Equivalently: keep the longest middle stretch whose letter counts
        # stay at or under total - k; the ends taken to delete it are then
        # k of each letter or more. Answer = n - that longest window.
        n = len(s)
        total = [0] * 3
        for ch in s:
            total[ord(ch) - ord("a")] += 1
        if any(c < k for c in total):
            return -1
        window = [0] * 3
        left = 0
        best = 0
        for right, ch in enumerate(s):
            window[ord(ch) - ord("a")] += 1
            while any(window[c] > total[c] - k for c in range(3)):
                window[ord(s[left]) - ord("a")] -= 1
                left += 1
            best = max(best, right - left + 1)
        return n - best
