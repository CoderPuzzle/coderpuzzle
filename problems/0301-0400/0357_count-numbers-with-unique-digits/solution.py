class Solution:
    def countNumbersWithUniqueDigits(self, n: int) -> int:
        # f(k): the numbers of exactly k digits, all distinct. f(0) = 1 is
        # x = 0 itself, f(1) = 9 counts 1-9, and past that a leading digit
        # has 9 choices (0 excluded) while each following place has one
        # fewer free digit than the last: f(k) = 9 * 9 * 8 * ... * (9 - k + 2).
        # The answer is the prefix sum f(0) + ... + f(min(n, 10)); at length
        # 11 the falling product reaches 0, with no digit left to place.
        total = 1  # f(0): x = 0 itself
        run = 1  # f(k) so far, one factor per digit place
        for length in range(1, min(n, 10) + 1):
            # place 1 picks 1-9; place k >= 2 finds 11 - k digits still free
            run *= 9 if length == 1 else 11 - length
            total += run
        return total
