from typing import List, Set


class Solution:
    def countPairs(self, nums: List[int]) -> int:
        # The family of a value holds every number reachable by
        # exchanging two of its digits at most once, itself included;
        # swapped strings parse back through int(), so leading zeros
        # collapse (30 -> "03" -> 3). A pair qualifies when either side
        # sits in the other's family; one swap may touch one number
        # only, so both directions must be tested.
        def family(value: int) -> Set[int]:
            digits = list(str(value))
            reached = {value}
            for i in range(len(digits)):
                for j in range(i + 1, len(digits)):
                    digits[i], digits[j] = digits[j], digits[i]
                    reached.add(int("".join(digits)))
                    digits[i], digits[j] = digits[j], digits[i]
            return reached

        families = [family(num) for num in nums]
        pairs = 0
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[j] in families[i] or nums[i] in families[j]:
                    pairs += 1
        return pairs
