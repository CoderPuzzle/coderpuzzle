class Solution:
    def maxConsecutive(self, bottom: int, top: int, special: List[int]) -> int:
        floors = sorted(special)
        best = max(floors[0] - bottom, top - floors[-1])
        for previous, floor in zip(floors, floors[1:]):
            best = max(best, floor - previous - 1)
        return best
