class Solution:
    def zigZagArrays(self, n: int, l: int, r: int) -> int:
        MOD = 1_000_000_007
        m = r - l + 1
        # up[x] / down[x]: length-i arrays ending at value x whose last step
        # rose / fell. Every single value starts both tables at length 1;
        # the zigzag law then forces each next step to flip direction.
        up = [1] * m
        down = [1] * m
        for _ in range(n - 1):
            # A rising-ending array may only continue onto a smaller value,
            # so new down[y] sums up[x] over x > y -- a running suffix total.
            new_down = [0] * m
            total = 0
            for y in range(m - 1, -1, -1):
                new_down[y] = total
                total = (total + up[y]) % MOD
            # Mirror image: new up[y] sums down[x] over x < y.
            new_up = [0] * m
            total = 0
            for y in range(m):
                new_up[y] = total
                total = (total + down[y]) % MOD
            up, down = new_up, new_down
        return (sum(up) + sum(down)) % MOD
