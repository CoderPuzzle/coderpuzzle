class Solution:
    def stringHash(self, s: str, k: int) -> str:
        # The chunks are the fixed windows of k characters because n is a
        # multiple of k: each pass reads one window, adds up its characters'
        # alphabet indices, and appends the letter at index sum % 26. The
        # running total never exceeds 25 * 100 = 2500, so ordinary integers
        # suffice, and one linear pass visits every character exactly once.
        result = []
        for base in range(0, len(s), k):
            total = 0
            for c in s[base : base + k]:
                total += ord(c) - ord("a")
            result.append(chr(ord("a") + total % 26))
        return "".join(result)
