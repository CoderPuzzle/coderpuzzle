class Solution:
    def betterCompression(self, compressed: str) -> str:
        counts = [0] * 26
        i = 0
        n = len(compressed)
        while i < n:
            letter = ord(compressed[i]) - ord("a")
            i += 1
            freq = 0
            while i < n and "0" <= compressed[i] <= "9":
                freq = freq * 10 + (ord(compressed[i]) - ord("0"))
                i += 1
            counts[letter] += freq
        pieces = []
        for letter in range(26):
            if counts[letter] > 0:
                pieces.append(chr(ord("a") + letter) + str(counts[letter]))
        return "".join(pieces)
