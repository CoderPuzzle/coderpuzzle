class Solution:
    def clumsy(self, n: int) -> int:
        # The rotation is *, /, +, - repeating. * and / bind tighter, so they
        # only ever fold into the term on top of the stack; + and - always
        # start a fresh term (pushed with its own sign already applied).
        stack = [n]
        ops = ["*", "/", "+", "-"]
        op_idx = 0
        for i in range(n - 1, 0, -1):
            op = ops[op_idx % 4]
            op_idx += 1
            if op == "*":
                stack[-1] *= i
            elif op == "/":
                # A prior '-' push can leave the top negative, and the next
                # rotation's '*' can carry that sign into this division. Python's
                # // floors, so a negative top is truncated toward zero by hand
                # to match every other language's native integer division.
                top = stack[-1]
                stack[-1] = -(-top // i) if top < 0 else top // i
            elif op == "+":
                stack.append(i)
            else:
                stack.append(-i)
        return sum(stack)
