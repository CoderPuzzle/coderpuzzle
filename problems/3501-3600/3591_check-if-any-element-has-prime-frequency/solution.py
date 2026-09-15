from typing import List


class Solution:
    def checkPrimeFrequency(self, nums: List[int]) -> bool:
        # One pass counts each distinct value's frequency in a hash map,
        # then every frequency is tested for primality by trial division:
        # a factor with divisor * divisor <= frequency refutes it, 0 and 1
        # fail outright, and any frequency surviving the scan is prime.
        # Frequencies never exceed nums.length <= 100, so the checks are a
        # handful of divisions each.
        counts = {}
        for value in nums:
            counts[value] = counts.get(value, 0) + 1
        for frequency in counts.values():
            if frequency < 2:
                continue
            is_prime = True
            divisor = 2
            while divisor * divisor <= frequency:
                if frequency % divisor == 0:
                    is_prime = False
                    break
                divisor += 1
            if is_prime:
                return True
        return False
