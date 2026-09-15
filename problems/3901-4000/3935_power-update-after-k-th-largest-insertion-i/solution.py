from bisect import bisect_left
from typing import List


class Solution:
    def powerUpdate(self, nums: List[int], p: int, queries: List[List[int]]) -> List[int]:
        values = sorted(set(nums + [query[0] for query in queries]))
        tree = [0] * (len(values) + 1)

        def add(index: int) -> None:
            index += 1
            while index < len(tree):
                tree[index] += 1
                index += index & -index

        def kth(rank: int) -> int:
            index = 0
            step = 1 << (len(values).bit_length() - 1)
            while step:
                nxt = index + step
                if nxt < len(tree) and tree[nxt] < rank:
                    index = nxt
                    rank -= tree[nxt]
                step >>= 1
            return values[index]

        for value in nums:
            add(bisect_left(values, value))
        answer = []
        size = len(nums)
        modulus = 1_000_000_007
        for value, k in queries:
            add(bisect_left(values, value))
            size += 1
            exponent = kth(size - k + 1)
            p = pow(p, exponent, modulus)
            answer.append(p)
        return answer
