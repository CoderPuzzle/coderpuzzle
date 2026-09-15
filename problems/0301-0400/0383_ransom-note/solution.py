class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        # The magazine is a budget: tally its letters, one slot per letter
        # of the alphabet, then spend the note against that budget.
        counts = [0] * 26
        for ch in magazine:
            counts[ord(ch) - ord("a")] += 1
        # A slot dipping below zero means the magazine cannot supply that
        # letter often enough — each of its letters is usable only once.
        for ch in ransomNote:
            counts[ord(ch) - ord("a")] -= 1
            if counts[ord(ch) - ord("a")] < 0:
                return False
        return True
