from collections import Counter


class Solution:
    def countOddLetters(self, n: int) -> int:
        # Spell every digit as its lowercase word, concatenate in digit
        # order, and count letters: the answer is how many distinct
        # characters end up with an odd frequency.
        words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
        counts = Counter(ch for digit in str(n) for ch in words[int(digit)])
        return sum(1 for count in counts.values() if count % 2 == 1)
