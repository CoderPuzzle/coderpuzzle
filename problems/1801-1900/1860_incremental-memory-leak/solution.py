class Solution:
    def memLeak(self, memory1: int, memory2: int) -> List[int]:
        # Straight simulation: at most ~93k seconds for 2^31 inputs because
        # the consumed total grows quadratically.
        t = 1
        while True:
            if memory1 >= memory2:
                if memory1 < t:
                    break
                memory1 -= t
            else:
                if memory2 < t:
                    break
                memory2 -= t
            t += 1
        return [t, memory1, memory2]
