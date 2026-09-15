class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        # Sorted copy: the majority's occurrences stand together as one run
        # longer than half the array, and a run that long must cover the
        # middle -- so the value at the halfway index is the majority,
        # whatever the input order was.
        return sorted(nums)[len(nums) // 2]
