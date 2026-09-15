from typing import List


class TodoList:
    """One dictionary keyed by the sequential task id holds every task;
    the getters filter it for the user's uncompleted tasks and sort the
    survivors by their unique due date."""

    def __init__(self):
        self.tasks = {}
        self.next_id = 1

    def _pending(self, userId: int, tag: str = None) -> List[dict]:
        # Shared filter: right owner, still open, optional tag membership.
        return [
            task
            for task in self.tasks.values()
            if task["user"] == userId and not task["done"] and (tag is None or tag in task["tags"])
        ]

    def addTask(self, userId: int, taskDescription: str, dueDate: int, tags: List[str]) -> int:
        task_id = self.next_id
        self.next_id += 1
        self.tasks[task_id] = {
            "user": userId,
            "description": taskDescription,
            "due": dueDate,
            "tags": tags,
            "done": False,
        }
        return task_id

    def getAllTasks(self, userId: int) -> List[str]:
        pending = sorted(self._pending(userId), key=lambda t: t["due"])
        return [t["description"] for t in pending]

    def getTasksForTag(self, userId: int, tag: str) -> List[str]:
        pending = sorted(self._pending(userId, tag), key=lambda t: t["due"])
        return [t["description"] for t in pending]

    def completeTask(self, userId: int, taskId: int) -> None:
        task = self.tasks.get(taskId)
        if task is not None and task["user"] == userId and not task["done"]:
            task["done"] = True
