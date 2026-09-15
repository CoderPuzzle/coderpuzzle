class Solution:
    def countOperations(self, num1: int, num2: int) -> int:
        # Straight simulation: the larger value loses a copy of the smaller
        # each round, so the pair strictly shrinks and zero arrives quickly.
        operations = 0
        while num1 != 0 and num2 != 0:
            if num1 >= num2:
                num1 -= num2
            else:
                num2 -= num1
            operations += 1
        return operations
