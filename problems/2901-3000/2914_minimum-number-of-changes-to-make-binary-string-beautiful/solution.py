class Solution:
    def minChanges(self, s: str) -> int:
        # Every beautiful partition refines into length-2 uniform blocks:
        # split each even uniform part down to pairs. So the answer is the
        # number of aligned pairs that are not already uniform, and each
        # such pair costs exactly one change (align both to one value).
        return sum(s[i] != s[i + 1] for i in range(0, len(s), 2))
