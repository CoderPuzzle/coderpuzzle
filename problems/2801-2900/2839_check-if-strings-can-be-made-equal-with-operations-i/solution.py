class Solution:
    def canBeEqual(self, s1: str, s2: str) -> bool:
        # A legal swap joins indices exactly 2 apart, so it exchanges only
        # the slots {0, 2} or only the slots {1, 3}: no letter can ever
        # cross between the two pairs, and repeating a swap just undoes it.
        # Both strings are therefore stuck reshuffling inside their own two
        # pairs, and they can be made equal exactly when each pair already
        # carries the same two letters in either order — compare unordered.
        for a in (0, 1):
            if sorted([s1[a], s1[a + 2]]) != sorted([s2[a], s2[a + 2]]):
                return False
        return True
