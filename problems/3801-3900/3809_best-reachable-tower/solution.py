from typing import List


class Solution:
    def bestTower(self, towers: List[List[int]], center: List[int], radius: int) -> List[int]:
        cx, cy = center
        best = None
        best_quality = -1
        for x, y, quality in towers:
            if abs(x - cx) + abs(y - cy) > radius:
                continue
            # Strictly better quality wins; on a quality tie the
            # lexicographically smaller coordinate wins.
            if (
                best is None
                or quality > best_quality
                or (quality == best_quality and (x < best[0] or (x == best[0] and y < best[1])))
            ):
                best = [x, y]
                best_quality = quality
        return best if best is not None else [-1, -1]
