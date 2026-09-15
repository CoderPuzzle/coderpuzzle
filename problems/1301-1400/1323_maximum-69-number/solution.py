class Solution:
    def maximum69Number(self, num: int) -> int:
        # The leftmost 6 carries the most weight, so flipping it is the one
        # best change; no 6 at all means the number is already maximal.
        return int(str(num).replace("6", "9", 1))
