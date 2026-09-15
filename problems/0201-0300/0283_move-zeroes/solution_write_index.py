class Solution:
    def moveZeroes(self, nums: list[int]) -> list[int]:
        # Invariant: nums[:write] is the stabilized prefix of non-zero
        # values in their original order. write never passes the read
        # position, so copying forward cannot clobber an unread value.
        write = 0
        for value in nums:
            if value != 0:
                nums[write] = value
                write += 1
        # Slots from write onward are settled by decree rather than by
        # exchange: overwrite the whole tail with zeros.
        for index in range(write, len(nums)):
            nums[index] = 0
        return nums
