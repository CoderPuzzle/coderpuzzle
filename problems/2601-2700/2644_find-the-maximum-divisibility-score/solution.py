from typing import List


class Solution:
    def maxDivScore(self, nums: List[int], divisors: List[int]) -> int:
        # Brute-force scoring straight from the statement: for every divisor
        # walk all of nums once. At most 1000 * 1000 = 10^6 modulo checks,
        # which fits the limits with room to spare.
        best_score = -1
        best_divisor = 0
        for divisor in divisors:
            score = 0
            for value in nums:
                if value % divisor == 0:
                    score += 1
            # Strictly larger wins outright; equal scores go to the smaller
            # divisor, which is exactly what `<` checks here.
            if score > best_score or (score == best_score and divisor < best_divisor):
                best_score = score
                best_divisor = divisor
        return best_divisor
