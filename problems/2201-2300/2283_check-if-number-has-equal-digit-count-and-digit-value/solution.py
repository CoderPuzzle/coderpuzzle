class Solution:
    def digitCount(self, num: str) -> bool:
        # One counting pass fills a fixed ten-slot tally; every index then
        # checks the tally against the digit recorded there.
        counts = [0] * 10
        for character in num:
            counts[int(character)] += 1
        return all(counts[i] == int(num[i]) for i in range(len(num)))
