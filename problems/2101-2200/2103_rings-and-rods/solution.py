class Solution:
    def countPoints(self, rings: str) -> int:
        masks = [0] * 10
        bits = {"R": 1, "G": 2, "B": 4}
        for index in range(0, len(rings), 2):
            masks[int(rings[index + 1])] |= bits[rings[index]]
        return masks.count(7)
