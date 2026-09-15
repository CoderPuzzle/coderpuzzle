class Solution:
    def findContestMatch(self, n: int) -> str:
        # One string per surviving side of the bracket, in round order. Each
        # round folds the list against its own reverse: side i meets side
        # m-1-i, the strong-vs-weak pairing, recorded as "(a,b)" with a bare
        # comma and no space.
        sides = [str(i) for i in range(1, n + 1)]
        while len(sides) > 1:
            m = len(sides)
            sides = ["(" + sides[i] + "," + sides[m - 1 - i] + ")" for i in range(m // 2)]
        return sides[0]
