class Solution:
    def minimumPushes(self, word: str) -> int:
        # Distinct letters make frequency irrelevant: dealing them
        # round-robin over the 8 keys costs the p-th letter p // 8 + 1.
        return sum(position // 8 + 1 for position in range(len(word)))
