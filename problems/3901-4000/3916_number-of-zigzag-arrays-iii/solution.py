class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        mod = 1_000_000_007
        points = n + 1
        values = [0]
        for width in range(1, points + 1):
            if width == 1:
                values.append(0)
                continue
            up = list(range(width))
            down = list(range(width - 1, -1, -1))
            for _ in range(3, n + 1):
                next_up = [0] * width
                running = 0
                for value in range(width):
                    next_up[value] = running
                    running = (running + down[value]) % mod
                next_down = [0] * width
                running = 0
                for value in range(width - 1, -1, -1):
                    next_down[value] = running
                    running = (running + up[value]) % mod
                up, down = next_up, next_down
            values.append((sum(up) + sum(down)) % mod)

        width = r - l + 1
        if width <= points:
            return values[width]
        x = width % mod
        factorial = [1] * (points + 1)
        for value in range(1, points + 1):
            factorial[value] = factorial[value - 1] * value % mod
        inverse_factorial = [1] * (points + 1)
        inverse_factorial[points] = pow(factorial[points], mod - 2, mod)
        for value in range(points, 0, -1):
            inverse_factorial[value - 1] = inverse_factorial[value] * value % mod
        prefix = [1] * (points + 2)
        suffix = [1] * (points + 2)
        for value in range(1, points + 1):
            prefix[value] = prefix[value - 1] * (x - value) % mod
        for value in range(points, 0, -1):
            suffix[value] = suffix[value + 1] * (x - value) % mod
        answer = 0
        for value in range(1, points + 1):
            term = values[value] * prefix[value - 1] % mod * suffix[value + 1] % mod
            term = term * inverse_factorial[value - 1] % mod
            term = term * inverse_factorial[points - value] % mod
            answer = answer - term if (points - value) % 2 else answer + term
        return answer % mod
