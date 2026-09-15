class Solution:
    def maxOperations(self, s: str) -> int:
        # Each operation sends one '1' across one whole block of 0's, stopping
        # at the next '1' or the end. A pair — a '1' with a block of 0's
        # opening strictly to its right — is spent at most once, because 0's
        # never move and a landed '1' stays past them forever; always taking
        # the lowest legal index spends every such pair exactly once. The
        # answer is therefore just the number of these pairs: sweeping left
        # to right, whenever a fresh block of 0's opens, every '1' seen so
        # far sits to its left and contributes exactly one operation.
        operations = 0
        ones = 0
        for i, c in enumerate(s):
            if c == "1":
                ones += 1
            elif i == 0 or s[i - 1] == "1":
                operations += ones
        return operations
