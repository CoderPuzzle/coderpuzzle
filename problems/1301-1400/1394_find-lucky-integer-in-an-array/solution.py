class Solution:
    def findLucky(self, arr: List[int]) -> int:
        # Values are bounded by 500, so a fixed tally array replaces a hash
        # map. Scanning it downward returns the largest value whose count
        # equals the value itself; -1 survives when none matches.
        counts = [0] * 501
        for value in arr:
            counts[value] += 1
        for value in range(500, 0, -1):
            if counts[value] == value:
                return value
        return -1
