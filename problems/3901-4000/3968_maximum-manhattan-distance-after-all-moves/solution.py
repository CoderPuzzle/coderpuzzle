class Solution:
    def maxDistance(self, moves: str) -> int:
        x = moves.count("R") - moves.count("L")
        y = moves.count("U") - moves.count("D")
        return abs(x) + abs(y) + moves.count("_")
