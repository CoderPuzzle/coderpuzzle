class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        # Sorting drags equal values next to each other, so a duplicate
        # anywhere in the array turns into a matching neighbouring pair.
        ordered = sorted(nums)
        for i in range(1, len(ordered)):
            # After sorting only neighbours can be equal, so one comparison
            # per gap rules out every pair that might match.
            if ordered[i - 1] == ordered[i]:
                return True
        # Every gap held two different values: nothing repeats.
        return False
