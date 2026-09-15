class Solution:
    def consecutiveSetBits(self, n: int) -> bool:
        pairs = 0
        previous = 0
        while n:
            current = n & 1
            if current and previous:
                pairs += 1
                if pairs > 1:
                    return False
            previous = current
            n >>= 1
        return pairs == 1
