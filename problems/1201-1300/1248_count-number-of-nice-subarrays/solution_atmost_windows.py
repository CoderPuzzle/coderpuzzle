class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        # "Exactly k odds" resists a direct window: one odd arrival can
        # break the contract with no symmetric way back. "At most cap odds"
        # repairs any breach from the left, and exactly k is the subtraction
        # of one such budget from a slightly larger one.
        def at_most(cap: int) -> int:
            # Counts subarrays holding at most cap odds: with [left, right]
            # inside the budget and left the smallest such start, every
            # opening from left onward qualifies, so right - left + 1
            # subarrays ending here join the total.
            # Never taken under the statement's k >= 1; it lets the helper
            # answer on its own terms.
            if cap < 0:
                return 0
            left = 0
            odds = 0
            total = 0
            for right, x in enumerate(nums):
                odds += x & 1
                # An odd broke the budget: retire odds from the left until
                # it holds again. Both ends only ever advance, so the sweep
                # stays linear.
                while odds > cap:
                    odds -= nums[left] & 1
                    left += 1
                total += right - left + 1
            return total

        return at_most(k) - at_most(k - 1)
