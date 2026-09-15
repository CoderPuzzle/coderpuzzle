from typing import List


class Solution:
    def maximumStrongPairXor(self, nums: List[int]) -> int:
        # Sorted sweep with a sliding window [ceil(y/2), y]: one hash map
        # keyed on the values' bit prefixes (top bit down, each key carrying
        # a leading 1 bit that pins its length), each key counting how many
        # live window values pass through it, answers "best XOR partner of y
        # in the window" greedily. The left pointer retires values whose
        # doubling falls below y.
        nums.sort()
        BITS = 20  # nums[i] <= 2^20 - 1
        prefixes = {}  # marked prefix -> live window values carrying it
        best = 0
        left = 0
        for y in nums:
            # insert y: one key per prefix length, top bit down
            for b in range(BITS - 1, -1, -1):
                key = (1 << (BITS - b)) | (y >> b)
                prefixes[key] = prefixes.get(key, 0) + 1
            # retire x from the left while 2 * x < y (window is [ceil(y/2), y])
            while 2 * nums[left] < y:
                x = nums[left]
                for b in range(BITS - 1, -1, -1):
                    key = (1 << (BITS - b)) | (x >> b)
                    remaining = prefixes[key] - 1
                    if remaining:
                        prefixes[key] = remaining
                    else:
                        del prefixes[key]
                left += 1
            # query: greedily flip each of y's bits while some live prefix
            # allows it; y's own keys keep every level reachable
            p = 1  # the leading 1 bit, then no value bits yet
            res = 0
            for b in range(BITS - 1, -1, -1):
                d = (y >> b) & 1
                want = (p << 1) | (d ^ 1)
                if want in prefixes:
                    res |= 1 << b
                    p = want
                else:
                    p = (p << 1) | d
            if res > best:
                best = res
        return best
