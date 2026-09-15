class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        # The three legal usages differ only in how many capitals the word
        # holds and where they sit, so one sweep that counts capitals in the
        # ASCII upper range captures everything there is to check.
        capitals = 0
        for ch in word:
            if "A" <= ch <= "Z":
                capitals += 1
        # No capitals is the all-lowercase word, every character a capital
        # is the all-caps word, and a lone capital is legal only when it
        # leads the word.
        first = word[0]
        return capitals == 0 or capitals == len(word) or (capitals == 1 and "A" <= first <= "Z")
