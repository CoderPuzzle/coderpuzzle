from typing import List


class Solution:
    def minDamage(self, power: int, damage: List[int], health: List[int]) -> int:
        n = len(damage)
        # Enemy i needs ceil(health/power) seconds of focused attack to die.
        times = [(h + power - 1) // power for h in health]
        # Exchange argument on adjacent kills a, b: only damage_a * t_b versus
        # damage_b * t_a differs between the two orders, so killing in
        # descending damage/time ratio order is globally optimal.
        order = sorted(range(n), key=lambda i: -damage[i] / times[i])
        remaining = sum(damage)
        answer = 0
        for i in order:
            # While enemy i spends times[i] seconds dying, every enemy still
            # alive (i included) keeps dealing its damage each second.
            answer += remaining * times[i]
            remaining -= damage[i]
        return answer
