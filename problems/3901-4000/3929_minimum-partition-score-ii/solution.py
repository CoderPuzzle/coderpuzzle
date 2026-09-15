from typing import List


class Solution:
    def minPartitionScore(self, nums: List[int], k: int) -> int:
        prefix = []
        total = 0
        for value in nums:
            total += value
            prefix.append(total)

        def run(penalty: int) -> tuple[int, int]:
            # Lines are (slope, intercept, block_count, first_integer_x).
            hull = [(0, 0, 0, -(10**30))]
            head = 0
            cost = count = 0
            for x in prefix:
                while head + 1 < len(hull) and hull[head + 1][3] <= x:
                    head += 1
                slope, intercept, previous_count, _ = hull[head]
                cost = x * x + penalty + slope * x + intercept
                count = previous_count + 1

                new_slope = -2 * x
                new_intercept = cost + x * x
                start = -(10**30)
                while hull:
                    old_slope, old_intercept, old_count, old_start = hull[-1]
                    difference = new_intercept - old_intercept
                    denominator = old_slope - new_slope
                    if count > old_count:
                        start = -((-difference) // denominator)
                    else:
                        start = difference // denominator + 1
                    if start > old_start:
                        break
                    hull.pop()
                    head = min(head, len(hull) - 1)
                if not hull:
                    start = -(10**30)
                    head = 0
                hull.append((new_slope, new_intercept, count, start))
            return cost, count

        low, high = 0, total * total
        while low < high:
            middle = (low + high + 1) // 2
            if run(middle)[1] >= k:
                low = middle
            else:
                high = middle - 1
        relaxed, _ = run(low)
        squared_sum = relaxed - low * k
        return (squared_sum + total) // 2
