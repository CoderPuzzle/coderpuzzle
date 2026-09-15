from typing import List, Optional


class Solution:
    def survivedRobotsHealths(self, positions: List[int], healths: List[int], directions: str) -> List[int]:
        healths = list(healths)
        n = len(positions)
        order = sorted(range(n), key=lambda i: positions[i])
        # Sweep left to right; every collision is a right-mover meeting a
        # left-mover face to face, so a stack of sweep survivors is the only
        # state needed. Health changes are written into `healths` so
        # survivors keep their decremented values.
        stack = []
        for idx in order:
            if directions[idx] == "R":
                # Right-movers wait on the stack for someone to hit them.
                stack.append(idx)
            else:
                # A left-mover duels right-movers off the stack top until it
                # dies or the right-movers run out (same-direction robots
                # ahead can never collide with it).
                alive = True
                while stack and directions[stack[-1]] == "R":
                    top = stack[-1]
                    # Weaker top dies; the incoming robot loses 1 health and
                    # fights on. Stronger top survives at -1; equal kills both.
                    if healths[top] < healths[idx]:
                        healths[idx] -= 1
                        stack.pop()
                    elif healths[top] > healths[idx]:
                        healths[top] -= 1
                        alive = False
                        break
                    else:
                        stack.pop()
                        alive = False
                        break
                if alive:
                    stack.append(idx)
        # Survivors are exactly the stack, but reported in input order.
        survivors = set(stack)
        return [healths[i] for i in range(n) if i in survivors]
