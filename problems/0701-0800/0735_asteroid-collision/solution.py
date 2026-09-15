from typing import List, Optional


class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        # The stack holds survivors — internally stable, all collisions resolved.
        stack: List[int] = []
        for asteroid in asteroids:
            alive = True
            # A newcomer can only fight the top, and only when it moves left
            # against a right-moving survivor; other pairs never meet.
            while alive and stack and asteroid < 0 < stack[-1]:
                top = stack[-1]
                if top < -asteroid:
                    # Top explodes; the newcomer continues against the new top.
                    stack.pop()
                elif top == -asteroid:
                    # Equal sizes: both explode.
                    stack.pop()
                    alive = False
                else:
                    # Top is larger: the newcomer explodes.
                    alive = False
            if alive:
                stack.append(asteroid)
        return stack
