from typing import List


class Solution:
    def countGoodSubseq(self, nums: List[int], p: int, queries: List[List[int]]) -> int:
        n = len(nums)
        limit = 50000
        smallest = list(range(limit + 1))
        for value in range(2, int(limit**0.5) + 1):
            if smallest[value] == value:
                for multiple in range(value * value, limit + 1, value):
                    if smallest[multiple] == multiple:
                        smallest[multiple] = value

        def factors(value: int) -> List[int]:
            result = []
            while value > 1:
                prime = smallest[value]
                result.append(prime)
                while value % prime == 0:
                    value //= prime
            return result

        counts = [0] * (limit + 1)
        covered_xor = [0] * (limit + 1)
        histogram = [0] * (n + 1)
        forbidden = [0] * n
        forbidden_distinct = 0
        all_xor = 0
        for index in range(n):
            all_xor ^= index

        def adjust(prime: int, index: int, delta: int) -> None:
            nonlocal forbidden_distinct
            count = counts[prime]
            if count == n - 1:
                missing = all_xor ^ covered_xor[prime]
                forbidden[missing] -= 1
                if forbidden[missing] == 0:
                    forbidden_distinct -= 1
            if count > 0:
                histogram[count] -= 1
            counts[prime] += delta
            covered_xor[prime] ^= index
            count = counts[prime]
            if count > 0:
                histogram[count] += 1
            if count == n - 1:
                missing = all_xor ^ covered_xor[prime]
                if forbidden[missing] == 0:
                    forbidden_distinct += 1
                forbidden[missing] += 1

        active = 0
        nums = list(nums)
        for index, value in enumerate(nums):
            if value % p == 0:
                active += 1
                for prime in factors(value // p):
                    adjust(prime, index, 1)

        answer = 0
        for index, value in queries:
            old = nums[index]
            if old % p == 0:
                for prime in factors(old // p):
                    adjust(prime, index, -1)
                active -= 1
            nums[index] = value
            if value % p == 0:
                active += 1
                for prime in factors(value // p):
                    adjust(prime, index, 1)
            if active > 0:
                if active < n and histogram[active] == 0:
                    answer += 1
                elif active == n and histogram[n] == 0 and forbidden_distinct < n:
                    answer += 1
        return answer
