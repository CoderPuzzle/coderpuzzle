class Solution:
    def isHappy(self, n: int) -> bool:
        # Sum of the squares of the digits, one digit per iteration.
        def step(m: int) -> int:
            total = 0
            while m:
                m, digit = divmod(m, 10)
                total += digit * digit
            return total

        # The step is a fixed function of its input, so the sequence from n
        # is a tail leading into the fixed point 1 or into a cycle that
        # avoids it — a rho shape. Tortoise and hare settle which, with no
        # memory of past values: the hare gains one position per round, so
        # once both runners are on the cycle it must catch the tortoise.
        slow = step(n)
        fast = step(step(n))
        while slow != fast:
            slow = step(slow)
            fast = step(step(fast))
        # Happy starts park both runners on 1, where they are born equal; an
        # unhappy start meets inside a cycle that never contains 1.
        return slow == 1
