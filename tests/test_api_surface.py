"""HTTP-surface tests: session gate, auth contract, judge shaping, the
format tri-state, and viewer-scoped submissions — the layers the executor
tests never touch. The runner is stubbed at judge._submit, so these cover
the API's own logic only."""

import json
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from fastapi.testclient import TestClient

from api.app import database, judge, main as api_main
from api.app import problems as problems_module


SLUG = "0001_pair-sum"

STATEMENT = """# Pair Sum

## Description

Given an array of integers and a target, return the indices of the two
numbers that add up to the target.

### Example 1

```
nums = [2,7,11,15], target = 9
9
```

### Constraints

```
2 <= n <= 1000
```

## Hints

### Hint 1

Try a hash map.
"""

PROBLEM_JSON = {
    "schema_version": 2,
    "reference_solution": "",
    "id": 1,
    "slug": "pair-sum",
    "title": "Pair Sum",
    "difficulty": "Easy",
    "tags": ["Array"],
    "topics": ["Hash Table"],
    "type": "Algorithms",
    "invocation": {
        "type": "function",
        "class_name": "Solution",
        "method": "twoSum",
        "parameters": [
            {"name": "nums", "codec": "vector_int"},
            {"name": "target", "codec": "int"},
        ],
        "return_codec": "vector_int",
        "comparison": "exact",
    },
    "limits": {"time_ms": 1000, "memory_mb": 256, "output_kb": 64},
}

CASES_JSON = {
    "public": [{"input": [[2, 7, 11, 15], 9], "expected": [0, 1]}],
    "hidden": [{"input": [[3, 2, 4], 6], "expected": [1, 2]}],
}

STARTER = "class Solution:\n    def twoSum(self, nums, target):\n        pass\n"


def _expected_aware_submit(body: dict) -> dict:
    """A fake _submit for judge jobs: echoes each input's expected value as
    `actual` (the API holds the expected side and compares there), so
    accepted flows can be exercised end to end. Format jobs come back
    unchanged."""
    if body.get("kind") == "format":
        return {"code": body["code"]}
    expected_by_input = {
        json.dumps(case["input"]): case["expected"]
        for case in CASES_JSON["public"] + CASES_JSON["hidden"]
    }
    return {
        "results": [
            {
                "status": "completed",
                "actual": expected_by_input.get(json.dumps(case["input"])),
                "stdout": "",
                "runtime_ms": 5,
                "timeout_ms": 1000,
            }
            for case in body["cases"]
        ]
    }


class ApiSurfaceTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        root = Path(self.temporary.name)

        bundle = root / "0001-0100" / SLUG
        (bundle / "figures").mkdir(parents=True)
        (bundle / "problem.json").write_text(
            json.dumps(PROBLEM_JSON, indent=2), encoding="utf-8"
        )
        (bundle / "cases.json").write_text(
            json.dumps(CASES_JSON, indent=2), encoding="utf-8"
        )
        (bundle / "statement.md").write_text(STATEMENT, encoding="utf-8")
        (bundle / "starter.py").write_text(STARTER, encoding="utf-8")
        (bundle / "solution.py").write_text(STARTER, encoding="utf-8")

        def fake_submit(body):
            return _expected_aware_submit(body)

        database_patch = mock.patch.object(
            database, "DATABASE_PATH", (root / "test.sqlite3")
        )
        # resolved: safe_problem_path compares against resolved parents
        # (macOS tempdirs sit behind /var → /private/var)
        problems_patch = mock.patch.object(
            problems_module, "PROBLEMS_DIR", root.resolve()
        )
        submit_patch = mock.patch.object(judge, "_submit", side_effect=fake_submit)
        database_patch.start()
        problems_patch.start()
        submit_patch.start()
        self.addCleanup(database_patch.stop)
        self.addCleanup(problems_patch.stop)
        self.addCleanup(submit_patch.stop)
        database.initialize_database()

        self.client = TestClient(api_main.app)
        self.addCleanup(self.client.close)
        # a fresh guest session on the client's cookie jar
        self.client.post("/session")

    def test_health_and_unknown_problem(self):
        self.assertEqual(200, self.client.get("/health").status_code)
        response = self.client.get("/problems/nope-not-here")
        self.assertEqual(404, response.status_code)

    def test_endpoints_require_a_session(self):
        bare = TestClient(api_main.app)  # no cookie jar
        try:
            for method, url in (
                ("GET", "/problems"),
                ("POST", "/run"),
                ("GET", "/progress"),
                ("GET", "/submissions"),
            ):
                response = getattr(bare, method.lower())(url)
                self.assertEqual(401, response.status_code, url)
        finally:
            bare.close()

    def test_problem_listing_and_detail(self):
        listing = self.client.get("/problems").json()
        self.assertEqual(1, listing["total"])
        self.assertEqual("pair-sum", listing["items"][0]["slug"])
        detail = self.client.get("/problems/pair-sum").json()
        # function-style inputs are displayed as named arguments
        self.assertEqual(
            {"nums": [2, 7, 11, 15], "target": 9}, detail["public_cases"][0]["input"]
        )

    def test_register_bootstrap_and_login_contract(self):
        bare = TestClient(api_main.app)
        self.addCleanup(bare.close)
        # status is public; register needs no session (fresh bootstrap)
        self.assertTrue(bare.get("/auth/status").json()["needs_setup"])
        created = bare.post(
            "/auth/register", json={"username": "admin", "password": "password123"}
        )
        self.assertEqual(200, created.status_code)
        self.assertTrue(created.json()["is_admin"])
        # register sets its own session cookie, so a cookie-less client is
        # required to see that login without one is refused (login binds the
        # caller's existing session; it never creates one)
        session = TestClient(api_main.app)
        self.addCleanup(session.close)
        denied = session.post(
            "/auth/login", json={"username": "admin", "password": "password123"}
        )
        self.assertEqual(401, denied.status_code)
        session.post("/session")
        ok = session.post(
            "/auth/login", json={"username": "admin", "password": "password123"}
        )
        self.assertEqual(200, ok.status_code)
        self.assertEqual("admin", session.get("/session").json()["user"]["username"])

    def test_run_sends_inputs_only_and_reports_case_results(self):
        requests = []

        def record(body):
            requests.append(body)
            return _expected_aware_submit(body)

        with mock.patch.object(judge, "_submit", side_effect=record):
            response = self.client.post(
                "/run", json={"slug": "pair-sum", "language": "python3", "code": "x"}
            )
        self.assertEqual(200, response.status_code)
        sent = requests[0]
        self.assertEqual([{"input": [[2, 7, 11, 15], 9]}], sent["cases"])
        self.assertNotIn("expected", json.dumps(sent))
        summary = response.json()
        self.assertEqual("accepted", summary["status"])
        self.assertEqual([0, 1], summary["results"][0]["actual"])
        # /run anchors to public cases only; hidden-case masking is covered
        # by JudgeInternalsTests below
        self.assertEqual(1, len(summary["results"]))

    def test_runner_unavailable_maps_to_503(self):
        with mock.patch.object(
            judge, "_submit", side_effect=judge.RunnerUnavailable("down")
        ):
            response = self.client.post(
                "/run", json={"slug": "pair-sum", "language": "python3", "code": "x"}
            )
        self.assertEqual(503, response.status_code)

    def test_per_session_judge_rate_limit(self):
        with mock.patch.object(api_main, "_JUDGE_MAX_REQUESTS", 2):
            first = self.client.post(
                "/format", json={"language": "python3", "code": "x=1\n"}
            )
            second = self.client.post(
                "/format", json={"language": "python3", "code": "x=1\n"}
            )
            third = self.client.post(
                "/format", json={"language": "python3", "code": "x=1\n"}
            )
        self.assertEqual(200, first.status_code)
        self.assertEqual(200, second.status_code)
        self.assertEqual(429, third.status_code)

    def test_format_tri_state(self):
        def formatted_already(body):
            return {"code": body["code"]}

        def reformats(body):
            return {"code": body["code"].strip() + "\n"}

        def refuses(body):
            return {"error": "bad indent"}

        with mock.patch.object(judge, "_submit", side_effect=formatted_already):
            self.assertEqual(
                {"status": "formatted"},
                self.client.post(
                    "/format", json={"language": "python3", "code": "x=1\n"}
                ).json(),
            )
        with mock.patch.object(judge, "_submit", side_effect=reformats):
            self.assertEqual(
                {"status": "unformatted", "code": "x=1\n"},
                self.client.post(
                    "/format", json={"language": "python3", "code": "x=1"}
                ).json(),
            )
        with mock.patch.object(judge, "_submit", side_effect=refuses):
            self.assertEqual(
                {"status": "error", "diagnostics": "bad indent"},
                self.client.post(
                    "/format", json={"language": "python3", "code": "x=1\n"}
                ).json(),
            )

    def test_submissions_are_scoped_per_viewer(self):
        mine = TestClient(api_main.app)
        theirs = TestClient(api_main.app)
        self.addCleanup(mine.close)
        self.addCleanup(theirs.close)
        mine.post("/session")
        theirs.post("/session")
        saved = mine.post(
            "/submit",
            json={
                "slug": "pair-sum",
                "language": "python3",
                "code": "class Solution:\n    pass\n",
            },
        )
        self.assertEqual("accepted", saved.json()["status"])
        self.assertIsNotNone(saved.json()["submission_id"])
        self.assertEqual(
            1, len(mine.get("/submissions", params={"slug": "pair-sum"}).json())
        )
        self.assertEqual(
            [], theirs.get("/submissions", params={"slug": "pair-sum"}).json()
        )
        stored = mine.get(f"/submissions/{saved.json()['submission_id']}").json()
        self.assertEqual(2, stored["total"])
        other = theirs.get(f"/submissions/{saved.json()['submission_id']}")
        self.assertEqual(404, other.status_code)


class JudgeInternalsTests(unittest.TestCase):
    def test_hidden_case_fields_are_masked_and_runtime_aggregated(self):
        raw = [
            {
                "status": "completed",
                "actual": [0, 1],
                "stdout": "noise",
                "runtime_ms": 7,
                "timeout_ms": 1000,
            },
            {
                "status": "completed",
                "actual": [1, 2],
                "stdout": "noise",
                "runtime_ms": 11,
                "timeout_ms": 1000,
            },
        ]
        cases = [
            {"name": "Example 1", "input": [[2, 7, 11, 15], 9], "expected": [0, 1]},
            {"input": [[3, 2, 4], 6], "expected": [1, 2]},
        ]
        with mock.patch.object(judge, "_submit", return_value={"results": raw}):
            results = judge.execute(
                "code",
                "python3",
                PROBLEM_JSON["invocation"],
                PROBLEM_JSON["limits"],
                cases,
                1,
            )
        public, hidden = results
        self.assertIn("expected", public)
        self.assertNotIn("expected", hidden)
        self.assertEqual(7, public["runtime_ms"])
        self.assertEqual(11, hidden["_runtime_ms"])  # private until _summarize

    def test_grouped_comparison_tolerates_unhashable_elements(self):
        spec = {"mode": "grouped", "size": 2, "counts": {"a": 1, "b": 1}}
        self.assertTrue(judge._grouped_ok(["a", "b"], spec))
        # a wrong-typed element is a wrong answer, not a judge crash
        self.assertFalse(judge._grouped_ok([["a"], "b"], spec))

    def test_judge_slot_saturates_instead_of_queueing(self):
        with mock.patch.object(judge, "JUDGE_CONCURRENCY", 1):
            slots = judge.threading.BoundedSemaphore(1)
            with mock.patch.object(judge, "_judge_slots", slots):
                with judge.judge_slot():
                    with self.assertRaises(judge.RunnerUnavailable):
                        with judge.judge_slot():
                            pass  # pragma: no cover — never reached


if __name__ == "__main__":
    unittest.main()
