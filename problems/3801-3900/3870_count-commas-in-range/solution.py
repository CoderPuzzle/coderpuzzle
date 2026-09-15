class Solution:
    def countCommas(self, n: int) -> int:
        # In standard formatting a number carries a comma exactly when it has
        # at least four digits, and every number from 1000 to 10^5 (the bound
        # here) carries exactly one comma. So the answer is simply how many
        # integers lie in [1000, n]: n - 999, or 0 when n is smaller.
        return max(0, n - 999)
