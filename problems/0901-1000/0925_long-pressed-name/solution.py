class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        # A long press only stretches a character into a run of copies of
        # itself. Walk both strings with two pointers: a typed character
        # equal to the next wanted one consumes it, a typed character equal
        # to its predecessor is a repeat of one already consumed, and
        # anything else cannot occur. Name must be fully consumed at the end.
        i, j = 0, 0
        n, m = len(name), len(typed)
        while j < m:
            if i < n and name[i] == typed[j]:
                i += 1
                j += 1
            elif j > 0 and typed[j] == typed[j - 1]:
                j += 1  # a long press of the previous character
            else:
                return False
        return i == n
