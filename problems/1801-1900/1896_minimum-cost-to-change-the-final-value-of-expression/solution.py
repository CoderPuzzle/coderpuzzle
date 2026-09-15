from typing import List, Optional


class Solution:
    def minOperationsToFlip(self, expression: str) -> int:
        def combine(a, b, op):
            va, ca = a
            vb, cb = b
            if op == "&":
                v = va & vb
                if v == 0:
                    if va == 0 and vb == 0:
                        c = min(ca, cb) + 1
                    elif va == 0:  # 0 & 1
                        c = min(ca, 1)
                    else:  # 1 & 0
                        c = min(cb, 1)
                else:  # 1 & 1
                    c = min(ca, cb)
            else:  # '|'
                v = va | vb
                if v == 0:  # 0 | 0 -> flip one operand to 1
                    c = min(ca, cb)
                elif va == 0:  # 0 | 1 -> flip b to 0 or switch to '&'
                    c = min(cb, 1)
                elif vb == 0:  # 1 | 0 -> flip a to 0 or switch to '&'
                    c = min(ca, 1)
                else:  # 1 | 1 -> both must become 0, or flip one and switch to '&'
                    c = min(ca, cb) + 1
            return (v, c)

        def eval_seq(values, ops):
            result = values[0]
            for i, op in enumerate(ops):
                result = combine(result, values[i + 1], op)
            return result

        stack = []
        for ch in expression:
            if ch == "(":
                stack.append(("op", "("))
            elif ch in "&|":
                stack.append(("op", ch))
            elif ch in "01":
                stack.append(("val", (int(ch), 1)))
            else:  # ')'
                values = []
                ops = []
                while stack and not (stack[-1][0] == "op" and stack[-1][1] == "("):
                    kind, payload = stack.pop()
                    if kind == "op":
                        ops.append(payload)
                    else:
                        values.append(payload)
                stack.pop()  # remove '('
                values.reverse()
                ops.reverse()
                stack.append(("val", eval_seq(values, ops)))
        values = []
        ops = []
        for kind, payload in stack:
            if kind == "op":
                ops.append(payload)
            else:
                values.append(payload)
        return eval_seq(values, ops)[1]
