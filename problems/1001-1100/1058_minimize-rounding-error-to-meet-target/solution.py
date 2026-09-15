from typing import List


class Solution:
    def minimizeError(self, prices: List[str], target: int) -> str:
        # Work entirely in integer thousandths so nothing ever touches a
        # float: "1.500" splits into an integer part (the floor) and a
        # 3-digit fractional part (in [0, 1000)).
        sum_floors = 0
        fracs = []  # fractional part (thousandths) of every non-integer price
        for price in prices:
            int_part, frac_part = price.split(".")
            floor_val = int(int_part)
            frac_val = int(frac_part)
            sum_floors += floor_val
            if frac_val != 0:
                fracs.append(frac_val)

        count_nonint = len(fracs)
        sum_ceils = sum_floors + count_nonint
        if target < sum_floors or target > sum_ceils:
            return "-1"

        # Flooring everything reaches sum_floors; each fractional price
        # switched to its ceiling adds exactly 1, so exactly k of them
        # must switch.
        k = target - sum_floors

        # Switching a price with fractional part f changes its error
        # contribution from f to (1000 - f): cheapest for the largest f.
        # Flip the k largest fractions first.
        base_error = sum(fracs)
        fracs.sort(reverse=True)
        sum_flip = sum(fracs[:k])
        total_error = base_error + k * 1000 - 2 * sum_flip

        return f"{total_error // 1000}.{total_error % 1000:03d}"
