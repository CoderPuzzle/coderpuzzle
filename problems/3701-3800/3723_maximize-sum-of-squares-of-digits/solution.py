class Solution:
    def maxSumOfSquares(self, num: int, sum: int) -> str:
        # Even nine in every position falls short: no good integer exists.
        if sum > 9 * num:
            return ""
        # The optimal digits are forced — floor(sum / 9) nines plus at most
        # one leftover r — and descending order is the largest arrangement,
        # so lay them out from the left and pad with zeros.
        q, r = divmod(sum, 9)
        head = "9" * q
        if r:
            head += str(r)
        return head + "0" * (num - len(head))
