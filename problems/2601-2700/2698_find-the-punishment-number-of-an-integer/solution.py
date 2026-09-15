class Solution:
    def punishmentNumber(self, n: int) -> int:
        total = 0
        for i in range(1, n + 1):
            digits = str(i * i)
            length = len(digits)
            found = False
            for mask in range(1 << (length - 1)):
                part_sum = 0
                cur = 0
                pruned = False
                for k in range(length):
                    cur = cur * 10 + int(digits[k])
                    if (mask >> k) & 1:
                        part_sum += cur
                        cur = 0
                        if part_sum > i:
                            pruned = True
                            break
                if not pruned and part_sum + cur == i:
                    found = True
                    break
            if found:
                total += i * i
        return total
