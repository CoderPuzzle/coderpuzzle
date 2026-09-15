class Solution:
    def removeAlmostEqualCharacters(self, word: str) -> int:
        # Scan left to right. Each almost-equal neighbor pair needs one
        # change; by rewriting word[i] to a letter almost-equal to neither
        # neighbor (always available: each neighbor forbids at most 3 of
        # 26 letters) one change settles both the pair behind and the pair
        # ahead of i, so the scan skips two positions after a change.
        ops = 0
        i = 1
        while i < len(word):
            if abs(ord(word[i]) - ord(word[i - 1])) <= 1:
                ops += 1
                i += 2
            else:
                i += 1
        return ops
