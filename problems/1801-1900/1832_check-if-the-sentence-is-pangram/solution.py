class Solution:
    def checkIfPangram(self, sentence: str) -> bool:
        # A sentence is a pangram exactly when its set of distinct characters
        # is the whole lowercase alphabet, so collect the distinct characters
        # and compare the set's size with 26.
        seen = set(sentence)
        return len(seen) == 26
