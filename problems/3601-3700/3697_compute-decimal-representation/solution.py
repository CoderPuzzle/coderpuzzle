from typing import List


class Solution:
    def decimalRepresentation(self, n: int) -> List[int]:
        # Each nonzero digit contributes exactly one base-10 component --
        # its digit times the place it sits at -- and this count is optimal:
        # adding terms can only merge nonzero positions, never create them.
        components = []
        place = 1
        while n > 0:
            digit = n % 10
            if digit > 0:
                components.append(digit * place)
            n //= 10
            place *= 10
        # Peeled from the ones place up, so reverse into descending order.
        components.reverse()
        return components
