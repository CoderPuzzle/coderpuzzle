from typing import List


class Solution:
    def minCost(self, nums: List[int]) -> int:
        # Every operation removes two of the three frontmost elements, so
        # what remains is always an untouched suffix plus at most one
        # element left behind in front of it. Row j holds, at index c + 1,
        # the cheapest finish when nums[c] is that leftover (index 0 =
        # no leftover); computing row j reads only rows j + 2 and j + 3,
        # so a three-row ring bounds the table at O(n) memory.
        n = len(nums)
        if n < 3:
            return max(nums)

        row_n = [0] + nums[:]
        row_nm1 = [nums[-1]] + [max(v, nums[-1]) for v in nums[:-1]]
        row_nm2 = [max(nums[-2], nums[-1])]
        for c in range(n - 2):
            a, b, d = nums[c], nums[-2], nums[-1]
            row_nm2.append(min(max(a, b) + d, max(a, d) + b, max(b, d) + a))

        ring = [row_nm2, row_nm1, row_n]
        for j in range(n - 3, -1, -1):
            r2 = ring[1]
            r3 = ring[2]
            a = nums[j]
            b = nums[j + 1]
            pair = max(a, b)
            # No leftover: nums[j], nums[j+1], nums[j+2] meet one
            # operation and the survivor becomes the next leftover.
            row = [
                min(
                    max(b, nums[j + 2]) + r3[j + 1],
                    max(a, nums[j + 2]) + r3[j + 2],
                    pair + r3[j + 3],
                )
            ]
            # With leftover nums[c]: the front three are nums[c], a, b.
            k1 = r2[j + 2]
            k2 = r2[j + 1]
            row.extend(
                min((v if v > a else a) + k1, (v if v > b else b) + k2, pair + w)
                for v, w in zip(nums[:j], r2[1 : j + 1])
            )
            ring = [row, ring[0], ring[1]]
        return ring[0][0]
