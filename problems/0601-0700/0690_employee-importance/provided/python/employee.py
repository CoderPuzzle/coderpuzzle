"""Problem-provided record class (LC 690 contract)."""


class Employee:
    def __init__(self, id=0, importance=0, subordinates=None):
        self.id = id
        self.importance = importance
        self.subordinates = subordinates if subordinates is not None else []
