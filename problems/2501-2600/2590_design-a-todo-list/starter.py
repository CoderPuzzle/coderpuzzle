from typing import List, Optional


class TodoList:
    def __init__(self):
        raise NotImplementedError("TODO")

    def addTask(self, userId: int, taskDescription: str, dueDate: int, tags: List[str]) -> int:
        raise NotImplementedError("TODO")

    def getAllTasks(self, userId: int) -> List[str]:
        raise NotImplementedError("TODO")

    def getTasksForTag(self, userId: int, tag: str) -> List[str]:
        raise NotImplementedError("TODO")

    def completeTask(self, userId: int, taskId: int):
        raise NotImplementedError("TODO")
