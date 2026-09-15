from typing import List


class Solution:
    def evenSumSubgraphs(self, nums: List[int], edges: List[List[int]]) -> int:
        adjacency = [0] * len(nums)
        for left, right in edges:
            adjacency[left] |= 1 << right
            adjacency[right] |= 1 << left

        answer = 0
        for mask in range(1, 1 << len(nums)):
            parity = 0
            bits = mask
            while bits:
                bit = bits & -bits
                parity ^= nums[bit.bit_length() - 1]
                bits ^= bit
            if parity:
                continue

            reached = mask & -mask
            frontier = reached
            while frontier:
                neighbors = 0
                bits = frontier
                while bits:
                    bit = bits & -bits
                    neighbors |= adjacency[bit.bit_length() - 1]
                    bits ^= bit
                frontier = neighbors & mask & ~reached
                reached |= frontier
            if reached == mask:
                answer += 1
        return answer
