class Solution:
    def sumOfNumberAndReverse(self, num: int) -> bool:
        # Hint 1 is the whole story: the domain of candidates x with
        # 0 <= x <= num holds at most 100001 values, so a direct scan
        # settles every input. Each trial reverses x arithmetically --
        # leading zeros need no special case, since they simply add
        # nothing ("041" contributes 41). The sum x + rev(x) is at most
        # 2 * 10^5, far inside any integer width.
        for x in range(num + 1):
            reversed_x = 0
            v = x
            while v > 0:
                reversed_x = reversed_x * 10 + v % 10
                v //= 10
            if x + reversed_x == num:
                return True
        return False
