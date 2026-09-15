from typing import List


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        def costs(parity):
            counts = [0] * k
            for i in range(parity, len(nums), 2):
                counts[nums[i] % k] += 1
            triple = counts * 3
            prefix_count = [0]
            prefix_sum = [0]
            for i, count in enumerate(triple):
                prefix_count.append(prefix_count[-1] + count)
                prefix_sum.append(prefix_sum[-1] + count * i)
            result = [0] * k
            half = k // 2
            for target in range(k):
                center = target + k
                left, right = center - half, center + (k - 1 - half)
                lc = prefix_count[center + 1] - prefix_count[left]
                ls = prefix_sum[center + 1] - prefix_sum[left]
                rc = prefix_count[right + 1] - prefix_count[center + 1]
                rs = prefix_sum[right + 1] - prefix_sum[center + 1]
                result[target] = center * lc - ls + rs - center * rc
            return result

        even, odd = costs(0), costs(1)
        order = sorted(range(k), key=lambda remainder: odd[remainder])[:2]
        return min(even[x] + odd[order[0] if order[0] != x else order[1]] for x in range(k))
