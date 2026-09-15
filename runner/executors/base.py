from dataclasses import dataclass
from pathlib import Path
from typing import Any, Protocol


class ExecutorError(RuntimeError):
    """A language plugin could not prepare a submitted program."""


@dataclass(frozen=True)
class PreparedProgram:
    """Immutable command and environment produced by a language plugin."""

    command: tuple[str, ...]
    environment: dict[str, str]


class LanguageExecutor(Protocol):
    """Boundary implemented by each installed compiler/interpreter plugin.

    A plugin can compile once in ``prepare`` and return the per-testcase
    command. The worker owns sandboxing, resource limits, testcase isolation,
    and the JSON result protocol.
    """

    language: str
    address_space_overhead_mb: int
    # Extra address space a *concurrency schedule* costs this runtime, on top
    # of address_space_overhead_mb and the per-thread stack allowance. Managed
    # runtimes reserve in bulk once a schedule spawns threads rather than in
    # proportion to the thread count, so this is a flat term applied only when
    # a problem declares `threads`. 0 for runtimes that show no such step.
    schedule_address_space_mb: int = 0
    max_processes: int

    def calibrate(self) -> tuple[float, float]:
        """Return a benchmark duration and clamped deadline scale."""
        ...

    def prepare(
        self,
        job_root: Path,
        scratch: Path,
        code: str,
        invocation: dict[str, Any],
        limits: dict[str, Any],
        assembly: dict[str, dict[str, str]] | None = None,
    ) -> PreparedProgram:
        """Write/compile source and return the command used for each testcase.

        ``assembly`` carries the judge-assembled library sources that make
        one complete program with the submission: ``{"provided": {filename:
        content}}`` from the problem's own provided/ directory — the only
        well-known assembly path (docs/TRUST-BOUNDARIES.md). Every data
        structure a bundle's wire needs is the bundle's own definition;
        the judge holds none of its own.
        """
        ...

    def encode_case(self, invocation: dict[str, Any], case_input: Any) -> bytes:
        """Encode one language-neutral testcase for the executor harness."""
        ...
