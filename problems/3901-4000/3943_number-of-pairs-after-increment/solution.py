from collections import Counter
from typing import List


class Solution:
    def numberOfPairs(self, nums1: List[int], nums2: List[int], queries: List[List[int]]) -> List[int]:
        block_size = 225
        blocks = (len(nums2) + block_size - 1) // block_size
        values = list(nums2)
        lazy = [0] * blocks
        frequency = [Counter(values[b * block_size : min(len(values), (b + 1) * block_size)]) for b in range(blocks)]
        first = Counter(nums1)

        def rebuild(block):
            start, end = block * block_size, min(len(values), (block + 1) * block_size)
            if lazy[block]:
                for i in range(start, end):
                    values[i] += lazy[block]
                lazy[block] = 0
            frequency[block] = Counter(values[start:end])

        answer = []
        for query in queries:
            if query[0] == 1:
                _, left, right, addition = query
                left_block, right_block = left // block_size, right // block_size
                if left_block == right_block:
                    rebuild(left_block)
                    for i in range(left, right + 1):
                        values[i] += addition
                    rebuild(left_block)
                else:
                    rebuild(left_block)
                    for i in range(left, (left_block + 1) * block_size):
                        values[i] += addition
                    rebuild(left_block)
                    rebuild(right_block)
                    for i in range(right_block * block_size, right + 1):
                        values[i] += addition
                    rebuild(right_block)
                    for block in range(left_block + 1, right_block):
                        lazy[block] += addition
            else:
                total = query[1]
                count = 0
                for value, copies in first.items():
                    wanted = total - value
                    for block in range(blocks):
                        count += copies * frequency[block].get(wanted - lazy[block], 0)
                answer.append(count)
        return answer
