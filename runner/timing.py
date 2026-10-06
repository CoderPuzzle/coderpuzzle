"""Submission-only timing.

The scored quantity has to be the algorithm, not the process that runs it.
A case otherwise pays for the supervisor CPython, a fresh interpreter or VM,
the harness's own imports and the case's own decode and encode: measured in
this image a bare ``python3 -I -S -c pass`` costs ~7 ms while a real python3
case costs ~138 ms, so a whole-process figure describes the harness rather
than the submission. Concretely, LC 1 Two Sum's reference measured 3834 ms
end to end while its algorithm takes 0.042 ms across all 18 cases.

Only the submission's own calls are bracketed, so every harness cost stays
outside: argument decoding, result encoding, oracle construction, provided
source loading. ``load_us`` is reported separately rather than folded in, so
a submission that hoists its work into import time is visible to an audit
instead of scoring zero.

All clocks are monotonic nanoseconds. ``clock_noise_ns`` is what one empty
span costs, which is the scale below which a single case's figure carries no
information; the aggregate over a case set is what remains meaningful.
"""

import time

_spans_ns: dict[str, int] = {}


def mark() -> int:
    """A monotonic start reading to hand back to :func:`add`."""
    return time.perf_counter_ns()


def add(since: int, span: str = "algorithm_us") -> None:
    """Fold the span that began at ``since`` into ``span``'s running total."""
    _spans_ns[span] = _spans_ns.get(span, 0) + (time.perf_counter_ns() - since)


def clock_noise_ns(samples: int = 5) -> int:
    """The median cost of a timed span that contains nothing."""
    readings = []
    for _ in range(samples):
        started = time.perf_counter_ns()
        readings.append(time.perf_counter_ns() - started)
    readings.sort()
    return readings[len(readings) // 2]


def report() -> dict[str, int]:
    """The protocol fields. Microseconds, because an algorithm here is often
    tens of them and integer milliseconds would round it to zero."""
    fields = {span: ns // 1000 for span, ns in _spans_ns.items()}
    fields["clock_noise_ns"] = clock_noise_ns()
    return fields
