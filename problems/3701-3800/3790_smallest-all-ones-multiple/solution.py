class Solution:
    def minAllOneMultiple(self, k: int) -> int:
        # Only the remainder of the growing repunit matters: appending a
        # digit maps rem -> (rem * 10 + 1) % k, so lengths are walked
        # upward without ever building a number past 10 * k. A nonzero
        # remainder is one of k - 1 values; the seen array flags each
        # visit, and a repeat means the remainders cycle forever -> -1
        # (exactly the k divisible by 2 or 5, since a repunit ends in 1).
        # Every value stays below 1e6 -- Python ints make that a non-issue.
        rem = 1 % k
        length = 1
        seen = [False] * k
        while rem != 0 and not seen[rem]:
            seen[rem] = True
            rem = (rem * 10 + 1) % k
            length += 1
        return length if rem == 0 else -1
