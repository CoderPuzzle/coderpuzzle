import heapq


class TaskManager:
    def __init__(self, tasks: list[list[int]]) -> None:
        self.tasks: dict[int, tuple[int, int]] = {}  # taskId -> (priority, userId)
        self.heap: list[tuple[int, int, int]] = []  # (-priority, -taskId, userId)
        for userId, taskId, priority in tasks:
            self.tasks[taskId] = (priority, userId)
            self.heap.append((-priority, -taskId, userId))
        heapq.heapify(self.heap)

    def add(self, userId: int, taskId: int, priority: int) -> None:
        self.tasks[taskId] = (priority, userId)
        heapq.heappush(self.heap, (-priority, -taskId, userId))

    def edit(self, taskId: int, newPriority: int) -> None:
        _, userId = self.tasks[taskId]
        self.tasks[taskId] = (newPriority, userId)
        heapq.heappush(self.heap, (-newPriority, -taskId, userId))

    def rmv(self, taskId: int) -> None:
        del self.tasks[taskId]

    def execTop(self) -> int:
        while self.heap:
            neg_priority, neg_task, userId = self.heap[0]
            record = self.tasks.get(-neg_task)
            if record is not None and record[0] == -neg_priority:
                heapq.heappop(self.heap)
                del self.tasks[-neg_task]
                return userId
            heapq.heappop(self.heap)
        return -1
