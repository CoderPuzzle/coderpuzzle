"""The immutable-list-node API (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: the case's linked list is
materialized internally and only `head` is handed to the solution —
every other node is reachable solely through `getNext()`. `printValue`
records into an ordered transcript that becomes the judged output. This
file is the implementation; solvers see only the public API documented
in the starter.
"""


class ImmutableListNode:
    """The judge-constructed head node.

    The harness hands this object itself to the solution as `head`, so it
    exposes printValue/getNext directly; successor nodes are lightweight
    views sharing the same transcript and budget.
    """

    def __init__(self, head: str, budget: int):
        values = [int(part) for part in head.split(",")] if head else []
        self._values = values
        self._next = {i: i + 1 for i in range(len(values) - 1)}
        self._budget = budget
        self.transcript: list[int] = []

    def _view(self, position: int) -> "ImmutableListNode._View":
        return ImmutableListNode._View(position, self)

    def printValue(self) -> None:  # noqa: N802 — LeetCode API
        self._view(0).printValue()

    def getNext(self):  # noqa: N802 — LeetCode API
        return self._view(0).getNext()

    def verdict(self):
        """The observable effect: the exact sequence of printed values."""
        return list(self.transcript)

    class _View:
        __slots__ = ("_position", "_owner")

        def __init__(self, position: int, owner: "ImmutableListNode"):
            self._position = position
            self._owner = owner

        def printValue(self) -> None:
            if self._owner._budget <= 0:
                raise RuntimeError("ImmutableListNode query budget exhausted")
            self._owner._budget -= 1
            self._owner.transcript.append(self._owner._values[self._position])

        def getNext(self):
            nxt = self._owner._next.get(self._position)
            return None if nxt is None else self._owner._view(nxt)
