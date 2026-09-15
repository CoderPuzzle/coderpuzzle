class Solution:
    def maxNumberOfApples(self, weight: List[int]) -> int:
        # Lightest apples first: any optimal packing can be assumed to
        # consist of them, so a sorted greedy prefix is exactly optimal.
        total = 0
        for count, w in enumerate(sorted(weight)):
            if total + w > 5000:
                return count
            total += w
        return len(weight)
