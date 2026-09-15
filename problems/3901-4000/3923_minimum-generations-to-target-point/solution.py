from typing import List


class Solution:
    def minGenerations(self, points: List[List[int]], target: List[int]) -> int:
        size = 7
        index = lambda x, y, z: x * size * size + y * size + z
        best = [10**9] * (size * size * size)
        for x, y, z in points:
            best[index(x, y, z)] = 0

        changed = True
        while changed:
            changed = False
            for a in range(size * size * size):
                if best[a] == 10**9:
                    continue
                ax, ay, az = a // (size * size), (a // size) % size, a % size
                for b in range(a + 1, size * size * size):
                    if best[b] == 10**9:
                        continue
                    bx, by, bz = b // (size * size), (b // size) % size, b % size
                    nx = (ax + bx) // 2
                    ny = (ay + by) // 2
                    nz = (az + bz) // 2
                    nxt = index(nx, ny, nz)
                    candidate = max(best[a], best[b]) + 1
                    if candidate < best[nxt]:
                        best[nxt] = candidate
                        changed = True

        answer = best[index(target[0], target[1], target[2])]
        return -1 if answer == 10**9 else answer
