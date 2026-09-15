class Solution:
    def calculateTime(self, keyboard: str, word: str) -> int:
        index = {ch: i for i, ch in enumerate(keyboard)}
        total = 0
        position = 0
        for ch in word:
            target = index[ch]
            total += abs(target - position)
            position = target
        return total
