from typing import List, Optional


class TaskManager:
    def __init__(self, tasks: List[List[int]]):
        raise NotImplementedError("TODO")

    def add(self, userId: int, taskId: int, priority: int):
        raise NotImplementedError("TODO")

    def edit(self, taskId: int, newPriority: int):
        raise NotImplementedError("TODO")

    def rmv(self, taskId: int):
        raise NotImplementedError("TODO")

    def execTop(self) -> int:
        raise NotImplementedError("TODO")
