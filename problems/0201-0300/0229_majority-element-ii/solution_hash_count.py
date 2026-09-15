from typing import List


class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        # A hash map counts every occurrence directly: one sweep tallies each
        # value into a table keyed by the value itself, and the map ends up
        # holding each distinct value's exact frequency.
        counts = {}
        for value in nums:
            counts[value] = counts.get(value, 0) + 1
        # At most two values can clear the n // 3 bar, so one selection pass
        # over the entries finds the only two tallies that can matter: a
        # strictly greater tally takes the top slot, demoting the leader, and
        # ties keep the earlier entry — harmless, since equal tallies qualify
        # or fail together.
        threshold = len(nums) // 3
        best_value, best_count = 0, 0
        second_value, second_count = 0, 0
        for value, count in counts.items():
            if count > best_count:
                second_value, second_count = best_value, best_count
                best_value, best_count = value, count
            elif count > second_count:
                second_value, second_count = value, count
        # Selection only nominates; the threshold check is where an
        # exactly-n/3 value is excluded and an unfilled slot — a tally of
        # zero — fails. Map keys are distinct, so the slots cannot collide.
        result = []
        if best_count > threshold:
            result.append(best_value)
        if second_count > threshold:
            result.append(second_value)
        # At most two answers survive; sorting pins the ascending order the
        # examples show.
        return sorted(result)
