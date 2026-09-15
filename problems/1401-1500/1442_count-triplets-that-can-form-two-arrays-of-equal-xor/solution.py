from typing import List, Optional


class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        # per prefix value: occurrence count and sum of (index+1); seeded
        # with the empty prefix so segments starting at index 0 count too
        count = {0: 1}
        index_sum = {0: 0}
        prefix = 0
        answer = 0
        for j, value in enumerate(arr):
            prefix ^= value
            # equal prefixes at p < j => arr[p+1..j] XORs to 0 and every
            # internal split works: sum over such p of (j - p - 1)
            # telescopes to j * count - index_sum
            if prefix in count:
                answer += j * count[prefix] - index_sum[prefix]
            count[prefix] = count.get(prefix, 0) + 1
            index_sum[prefix] = index_sum.get(prefix, 0) + (j + 1)
        return answer
