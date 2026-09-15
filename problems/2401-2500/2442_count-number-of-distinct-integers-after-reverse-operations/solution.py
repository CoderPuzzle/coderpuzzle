class Solution:
    def countDistinctIntegers(self, nums: List[int]) -> int:
        # The final array holds the originals plus one reversal per
        # original, so its distinct values are exactly the set
        # {originals} ∪ {reversals}. Reversal never changes the digit
        # count, so every value stays <= 10^6 and no 64-bit arithmetic is
        # needed. Leading zeros vanish because int() re-parses "01" as 1.
        seen = set(nums)
        for value in nums:
            seen.add(int(str(value)[::-1]))
        return len(seen)
