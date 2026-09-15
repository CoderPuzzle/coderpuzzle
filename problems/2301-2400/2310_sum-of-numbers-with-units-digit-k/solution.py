class Solution:
    def minimumNumbers(self, num: int, k: int) -> int:
        if num == 0:
            return 0
        base = 10 if k == 0 else k
        count = 1
        while count * base <= num:
            if (num - count * base) % 10 == 0:
                return count
            count += 1
        return -1
