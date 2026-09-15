from typing import List


class Solution:
    def maxStudentsOnBench(self, students: List[List[int]]) -> int:
        # Mark (bench, student) pairs in a fixed grid; the first sight of a
        # pair is the only one that bumps its bench's unique count.
        seen = [[False] * 101 for _ in range(101)]
        count = [0] * 101
        for student_id, bench_id in students:
            if not seen[bench_id][student_id]:
                seen[bench_id][student_id] = True
                count[bench_id] += 1
        return max(count)
