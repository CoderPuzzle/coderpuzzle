from typing import List


class Solution:
    def maxScore(self, nums: List[int], maxVal: int) -> int:
        maximum = max(max(nums), maxVal)
        frequency = [0] * (maximum + 1)
        for value in nums:
            frequency[value] += 1
        divisible = [0] * (maximum + 1)
        for divisor in range(1, maximum + 1):
            divisible[divisor] = sum(frequency[multiple] for multiple in range(divisor, maximum + 1, divisor))
        smallest = list(range(maximum + 1))
        for prime in range(2, int(maximum**0.5) + 1):
            if smallest[prime] == prime:
                for multiple in range(prime * prime, maximum + 1, prime):
                    if smallest[multiple] == multiple:
                        smallest[multiple] = prime

        answer = -(10**9)
        for value in range(1, maximum + 1):
            if frequency[value] == 0 and value > maxVal:
                continue
            factors = []
            current = value
            while current > 1:
                prime = smallest[current]
                factors.append(prime)
                while current % prime == 0:
                    current //= prime
            bad = 0
            for mask in range(1, 1 << len(factors)):
                product = 1
                bits = 0
                for i, prime in enumerate(factors):
                    if mask >> i & 1:
                        product *= prime
                        bits += 1
                bad += divisible[product] if bits % 2 else -divisible[product]
            if frequency[value]:
                cost = bad - (value > 1)
            else:
                cost = max(1, bad)
            answer = max(answer, value - cost)
        return answer
