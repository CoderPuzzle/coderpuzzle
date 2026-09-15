class Solution:
    def kthCharacter(self, k: int) -> str:
        # Simulate the operation directly: each pass appends a copy of the
        # current word with every letter advanced to its next character
        # (wrapping z back to a), so the length doubles. Nine passes already
        # exceed k = 500 since 2**9 = 512, and characters never change once
        # written, so when the word first reaches length k the character at
        # index k - 1 is the answer.
        word = ["a"]
        while len(word) < k:
            word += [chr((ord(c) - ord("a") + 1) % 26 + ord("a")) for c in word]
        return word[k - 1]
