from typing import List, Optional


class ExamTracker:
    def __init__(self):
        raise NotImplementedError("TODO")

    def record(self, time: int, score: int):
        raise NotImplementedError("TODO")

    def totalScore(self, startTime: int, endTime: int) -> int:
        raise NotImplementedError("TODO")
