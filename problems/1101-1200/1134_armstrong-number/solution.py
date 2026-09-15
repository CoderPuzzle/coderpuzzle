class Solution:
    def isArmstrong(self, n: int) -> bool:
        k = len(str(n))
        total = 0
        remaining = n
        while remaining:
            total += (remaining % 10) ** k
            remaining //= 10
        return total == n
