from typing import List


class Solution:
    def minProcessingTime(self, processorTime: List[int], tasks: List[int]) -> int:
        processor_time = sorted(processorTime)
        # Every term is at most 10^9, so each processor+task sum stays in int.
        tasks_sorted = sorted(tasks, reverse=True)
        return max(processor_time[i // 4] + tasks_sorted[i] for i in range(len(tasks)))
