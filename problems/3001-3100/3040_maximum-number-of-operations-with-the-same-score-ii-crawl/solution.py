from typing import List


class Solution:
    def maxOperations(self, nums: List[int]) -> int:
        # The first operation fixes the score, and its pair is one of three:
        # the two head elements, the two tail elements, or both end elements.
        def best_for_score(target):
            # Every operation deletes exactly two elements, so a window keeps
            # its width parity; roll one dp layer per reachable width.
            # previous[l]: best count for the width - 2 window starting at l.
            n = len(nums)
            previous = [0] * (n + 2)
            for width in range(2 + n % 2, n + 1, 2):
                offset = width - 1
                # Delete both end elements -> inner window starts at l + 1.
                both_ends = [
                    count + 1 if x + y == target else 0 for x, y, count in zip(nums, nums[offset:], previous[1:])
                ]
                # Delete the first two -> next window starts at l + 2.
                first_two = [count + 1 if x + y == target else 0 for x, y, count in zip(nums, nums[1:], previous[2:])]
                # Delete the last two -> next window starts at l.
                last_two = [
                    count + 1 if x + y == target else 0
                    for x, y, count in zip(nums[offset - 1 :], nums[offset:], previous)
                ]
                previous = list(map(max, first_two, last_two, both_ends))
            return previous[0]

        return max(best_for_score(score) for score in {nums[0] + nums[1], nums[0] + nums[-1], nums[-2] + nums[-1]})
