class Solution:
    def minInsertions(self, s: str) -> int:
        insertions = 0
        # Number of '(' seen so far that are still waiting for their '))'.
        open_count = 0
        i = 0
        n = len(s)
        while i < n:
            if s[i] == "(":
                open_count += 1
                i += 1
                continue
            # A ')' is handled together with the character right after it.
            if i + 1 < n and s[i + 1] == ")":
                # A full '))' pair; consume both characters at once.
                i += 2
            else:
                # A lone ')' with no partner right after it: charge one
                # insertion for the missing ')' and treat the pair as
                # completed on the spot.
                insertions += 1
                i += 1
            # One closing pair has just been accounted for; it must belong
            # to a waiting '('. If none is waiting, the '(' itself is
            # missing.
            if open_count > 0:
                open_count -= 1
            else:
                insertions += 1
        # Every '(' still waiting never got its '))'; each needs a full
        # pair appended.
        insertions += open_count * 2
        return insertions
