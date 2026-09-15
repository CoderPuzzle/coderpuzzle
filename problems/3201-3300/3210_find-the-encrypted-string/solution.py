class Solution:
    def getEncryptedString(self, s: str, k: int) -> str:
        # The encrypted string is the input rotated left by k positions:
        # position i of the answer reads s[(i + k) % n], the character k
        # places forward with wraparound. The modulo folds completed laps
        # back into range, so k larger than n needs no special case — one
        # linear pass copies every character from its source index.
        n = len(s)
        return "".join(s[(i + k) % n] for i in range(n))
