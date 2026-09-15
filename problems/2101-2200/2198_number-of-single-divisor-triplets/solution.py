class Solution:
    def singleDivisorTriplet(self, nums: list[int]) -> int:
        freq = [0] * 101
        for num in nums:
            freq[num] += 1
        values = [v for v in range(1, 101) if freq[v]]
        total = 0
        for i, a in enumerate(values):
            fa = freq[a]
            for j in range(i, len(values)):
                b = values[j]
                fb = freq[b]
                for k in range(j, len(values)):
                    c = values[k]
                    fc = freq[c]
                    s = a + b + c
                    # divisibility is checked per index, so repeated
                    # values contribute one hit per copy
                    hits = (s % a == 0) + (s % b == 0) + (s % c == 0)
                    if hits != 1:
                        continue
                    if a == b == c:
                        # three ordered picks from the same bin
                        total += fa * (fa - 1) * (fa - 2)
                    elif a == b or b == c:
                        twice, once = (a, c) if a == b else (b, a)
                        f = freq[twice]
                        # pick the pair's indices unordered, then place
                        # all three values: 3 positions for `once`
                        total += f * (f - 1) // 2 * freq[once] * 6
                    else:
                        total += fa * fb * fc * 6
        return total
