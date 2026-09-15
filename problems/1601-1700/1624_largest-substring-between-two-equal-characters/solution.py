class Solution:
    def maxLengthBetweenEqualCharacters(self, s: str) -> int:
        # Only a character's first and last occurrence can bound the widest
        # gap for that character, so a single pass recording first-seen
        # indices is enough.
        first = {}
        best = -1
        for index, char in enumerate(s):
            if char not in first:
                first[char] = index
            else:
                best = max(best, index - first[char] - 1)
        return best
