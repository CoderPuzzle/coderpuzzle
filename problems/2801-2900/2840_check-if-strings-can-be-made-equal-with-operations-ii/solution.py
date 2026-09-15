from collections import Counter


class Solution:
    def checkStrings(self, s1: str, s2: str) -> bool:
        # Swapping indices whose distance is even keeps every character inside
        # its own index-parity class, and any two positions of one class are
        # directly swappable, so each class is freely rearrangeable. The strings
        # can therefore be made equal exactly when each parity class holds the
        # same multiset of characters in both strings.
        even_counts = Counter(s1[::2])
        odd_counts = Counter(s1[1::2])
        for position, char in enumerate(s2):
            counts = even_counts if position % 2 == 0 else odd_counts
            counts[char] -= 1
            if counts[char] < 0:
                # s2's parity class needs a copy this character s1 cannot supply.
                return False
        return True
