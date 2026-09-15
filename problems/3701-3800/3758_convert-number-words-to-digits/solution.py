class Solution:
    def convertNumber(self, s: str) -> str:
        # Left-to-right greedy scan: at most one digit word can start at any
        # position (no word is a prefix of another), so taking the first hit
        # is unambiguous. Lengths 3, 4, 5 cover all ten words.
        words = {
            "zero": "0",
            "one": "1",
            "two": "2",
            "five": "5",
            "three": "3",
            "four": "4",
            "nine": "9",
            "six": "6",
            "seven": "7",
            "eight": "8",
        }
        digits = []
        i = 0
        n = len(s)
        while i < n:
            for length in (3, 4, 5):
                piece = s[i : i + length]
                if len(piece) == length and piece in words:
                    digits.append(words[piece])
                    i += length
                    break
            else:
                i += 1
        return "".join(digits)
