class Solution:
    def removeZeros(self, n: int) -> int:
        # Rebuild the answer while peeling digits off n's least significant
        # end: place tracks the slot the next surviving digit occupies, and
        # zero digits fall through without touching result or place.
        result = 0
        place = 1
        while n > 0:
            digit = n % 10
            if digit != 0:
                result += digit * place
                place *= 10
            n //= 10
        return result
