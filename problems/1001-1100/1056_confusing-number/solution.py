class Solution:
    def confusingNumber(self, n: int) -> bool:
        # Peeling digits off with % 10 / // 10 already visits them in the
        # order a 180-degree rotation puts them in (units digit first, so
        # it lands most-significant in the rotated value).
        rotate = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
        original = n
        rotated = 0
        while n > 0:
            digit = n % 10
            if digit not in rotate:
                return False
            rotated = rotated * 10 + rotate[digit]
            n //= 10
        return rotated != original
