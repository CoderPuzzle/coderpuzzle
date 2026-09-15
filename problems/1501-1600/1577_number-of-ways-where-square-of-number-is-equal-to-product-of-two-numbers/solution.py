from typing import List, Optional


class Solution:
    def numTriplets(self, nums1: List[int], nums2: List[int]) -> int:
        def count_type(a: List[int], b: List[int]) -> int:
            # Frequency map of b's values, plus the distinct values sorted
            # ascending so the divisor scan below can stop early.
            freq = {}
            for v in b:
                freq[v] = freq.get(v, 0) + 1
            distinct = sorted(freq)

            total = 0
            for x in a:
                # Squares reach up to (1e5)^2 = 1e10, outside 32-bit range,
                # so this stays in Python's arbitrary-precision ints.
                target = x * x
                for v in distinct:
                    if v * v > target:
                        break
                    if target % v != 0:
                        continue
                    other = target // v
                    if other == v:
                        # Both factors come from the same value: choose 2
                        # distinct indices out of freq[v] occurrences.
                        total += freq[v] * (freq[v] - 1) // 2
                    elif other in freq:
                        total += freq[v] * freq[other]
            return total

        return count_type(nums1, nums2) + count_type(nums2, nums1)
