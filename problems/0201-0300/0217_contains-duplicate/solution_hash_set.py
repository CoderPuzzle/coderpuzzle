class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        # One pass with a set of already-visited values.
        seen = set()
        for value in nums:
            # Check before inserting so the first copy is never a false hit.
            if value in seen:
                return True
            seen.add(value)
        # Loop finished: every element was distinct at insertion time.
        return False
