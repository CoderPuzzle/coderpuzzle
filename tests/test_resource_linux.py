"""Run in a provisioned, unprivileged isolated runner, not on the host.

CODERPUZZLE_RESOURCE_TESTS=1 coderpuzzle-supervisor-python this_file.py
"""

import json
import os
from pathlib import Path
import shutil
import sys
import tempfile
import unittest


@unittest.skipUnless(
    sys.platform == "linux" and os.environ.get("CODERPUZZLE_RESOURCE_TESTS") == "1",
    "requires a provisioned Linux integration slot",
)
class LinuxResourceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        sys.path.insert(0, "/runner")
        import worker
        from resources import ResourceManager

        cls.worker = worker
        worker.RESOURCES = ResourceManager()
        worker.CALIBRATION_FACTORS["python3"] = 1

    def run_code(self, code, *, time_ms=250, memory_mb=64, threads=0):
        from executors.base import PreparedProgram

        class Executor:
            language = "python3"
            address_space_overhead_mb = 256
            max_processes = 16

            def encode_case(self, invocation, case):
                return b""

        root = Path(tempfile.mkdtemp(dir="/work"))
        root.chmod(0o755)
        try:
            return self.worker._run_case(
                root,
                [],
                {},
                {
                    "time_ms": time_ms,
                    "memory_mb": memory_mb,
                    "threads": threads,
                },
                Executor(),
                PreparedProgram(("/usr/local/bin/python3", "-c", code), {}),
            )
        finally:
            scratch = root / "scratch"
            if scratch.exists():
                os.chown(scratch, os.getuid(), os.getgid())
                scratch.chmod(0o700)
            shutil.rmtree(root)
            self.worker._reap_orphans()
            self.assertEqual(
                [], list((self.worker.RESOURCES.root / "runs").glob("case-*"))
            )

    @staticmethod
    def emit(actual="True"):
        return (
            "import json, os; os.write(63, ('__CODERPUZZLE_RESULT__' + json.dumps({'status':'completed','actual':"
            + actual
            + "})).encode())"
        )

    def test_reference_solutions_through_job_pipeline(self):
        import time

        bundle = Path("/test-bundle")
        self.assertTrue(
            bundle.is_dir(), "Mount the bundled Pair Sum fixture at /test-bundle"
        )
        problem = json.loads((bundle / "problem.json").read_text())
        cases = json.loads((bundle / "cases.json").read_text())["public"]
        for extension, language in (
            ("py", "python3"),
            ("cpp", "cpp"),
            ("js", "javascript"),
            ("ts", "typescript"),
            ("java", "java"),
            ("rs", "rust"),
            ("go", "go"),
        ):
            with (
                self.subTest(language=language),
                tempfile.TemporaryDirectory(dir="/tmp") as directory,
            ):
                self.worker.CALIBRATION_FACTORS[language] = 1
                job = Path(directory)
                request = {
                    "version": 2,
                    "job_id": language,
                    "language": language,
                    "code": (bundle / f"solution_hash_map.{extension}").read_text(),
                    "invocation": problem["invocation"],
                    "limits": problem["limits"],
                    "cases": [{"input": c["input"]} for c in cases],
                    "enqueued_at_ns": time.monotonic_ns(),
                }
                (job / "request.json").write_text(json.dumps(request))
                (job / "ready").touch()
                with self.worker.claim_ready(job / "ready") as claimed:
                    self.assertTrue(claimed)
                    self.worker._process_job(job)
                result = json.loads((job / "result.json").read_text())
                self.assertFalse((job / "ready").exists())
                self.assertEqual("cpu", result["timing_mode"])
                self.assertGreaterEqual(result["compile_ms"], 0)
                for actual, expected in zip(result["results"], cases):
                    self.assertEqual("completed", actual["status"], actual)
                    self.assertEqual(
                        sorted(expected["expected"]), sorted(actual["actual"])
                    )
                self.worker._kill_lingering_children()
                self.worker._reap_orphans()

    def test_cpu_loop(self):
        result = self.run_code("while True: pass")
        self.assertEqual("time_limit_exceeded", result["status"])
        self.assertEqual("cpu", result["timeout_reason"])
        self.assertGreaterEqual(result["cpu_time_ms"], 250)

    def test_sleep_uses_wall_backstop(self):
        result = self.run_code("import time; time.sleep(10)", time_ms=100)
        self.assertEqual("wall", result["timeout_reason"])
        self.assertLess(result["cpu_time_ms"], 100)
        self.assertGreaterEqual(result["wall_time_ms"], 1000)

    def test_threaded_problem_keeps_short_wall_deadline(self):
        result = self.run_code("import time; time.sleep(10)", time_ms=200, threads=2)
        self.assertEqual("wall", result["timeout_reason"])
        self.assertEqual(200, result["wall_limit_ms"])

    def test_descendant_cpu_is_accounted(self):
        result = self.run_code(
            "import os\npid=os.fork()\nif pid == 0:\n while True: pass\nos.waitpid(pid,0)"
        )
        self.assertEqual("cpu", result["timeout_reason"])

    def test_detached_descendant_is_killed_after_success(self):
        result = self.run_code(
            "import os, time\npid=os.fork()\nif pid == 0:\n os.setsid()\n time.sleep(30)\n os._exit(0)\n"
            + self.emit("pid")
        )
        self.assertEqual("completed", result["status"])
        status = Path(f"/proc/{result['actual']}/status")
        self.assertFalse(status.exists(), "detached child was not reaped")

    def test_oom_overrides_forged_success(self):
        result = self.run_code(
            self.emit()
            + "\nitems=[]\nwhile True: items.append(bytearray(4*1024*1024))",
            time_ms=2000,
        )
        self.assertEqual("memory_limit_exceeded", result["status"])

    def test_submission_cannot_write_resource_controls(self):
        root = str(self.worker.RESOURCES.root)
        code = f"""import os
paths = [{root!r} + '/cgroup.procs', {root!r} + '/runs/memory.max']
blocked = 0
for path in paths:
 try:
  fd = os.open(path, os.O_WRONLY)
 except PermissionError:
  blocked += 1
 else:
  os.close(fd)
""" + self.emit("blocked")
        result = self.run_code(code)
        self.assertEqual("completed", result["status"])
        self.assertEqual(2, result["actual"])

    def test_cpu_affinity_is_fixed(self):
        result = self.run_code(self.emit("sorted(os.sched_getaffinity(0))"))
        from resources import cpu_set

        self.assertEqual(sorted(cpu_set(self.worker.RESOURCES.cpus)), result["actual"])
        self.assertEqual("cpu", result["timing_mode"])
        self.assertEqual(result["cpu_time_ms"], result["runtime_ms"])

    def test_forged_metrics_are_overwritten(self):
        code = (
            "import os; os.write(63, b'__CODERPUZZLE_RESULT__' + "
            + repr(
                json.dumps(
                    {
                        "status": "completed",
                        "actual": True,
                        "cpu_time_ms": -99,
                        "wall_time_ms": -99,
                        "memory_peak_bytes": -99,
                        "runtime_ms": -99,
                    }
                ).encode()
            )
            + ")"
        )
        result = self.run_code(code)
        for key in ("cpu_time_ms", "wall_time_ms", "memory_peak_bytes", "runtime_ms"):
            self.assertGreaterEqual(result[key], 0)

    def test_second_worker_cannot_enter_same_slot(self):
        from resources import ResourceError, ResourceManager

        with self.assertRaisesRegex(ResourceError, "already has a worker"):
            ResourceManager()


if __name__ == "__main__":
    unittest.main(verbosity=2)
