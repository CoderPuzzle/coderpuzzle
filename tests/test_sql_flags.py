"""SQL harness flag scenarios: headers exposure, the dynamic_columns
substitution protocol (pivot + unpivot), the authorizer's ATTACH denial, and
the executor-side multi-statement guard relaxation. The harness runs locally
with the repo's runner/ on PYTHONPATH in place of the image's /runner."""
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "runner"

PIVOT_SCHEMA = (
    "CREATE TABLE Products (product_id INTEGER, store TEXT, price INTEGER, "
    "PRIMARY KEY (product_id, store));"
)
PIVOT_SETUP = (
    "INSERT INTO Products VALUES (1, 'Shop', 110), (1, 'LC_Store', 100),"
    " (2, 'Nozama', 200), (2, 'Souq', 190), (3, 'Shop', 1000), (3, 'Souq', 1900);"
)
UNPIVOT_SCHEMA = (
    "CREATE TABLE Products (product_id INTEGER, LC_Store INTEGER, Nozama INTEGER,"
    " Shop INTEGER, Souq INTEGER, PRIMARY KEY (product_id));"
)
UNPIVOT_SETUP = (
    "INSERT INTO Products VALUES (1, 100, NULL, 110, NULL),"
    " (2, NULL, 200, NULL, 190), (3, NULL, NULL, 1000, 1900);"
)

PIVOT_SUBMISSION = """
SELECT group_concat('MAX(CASE WHEN store = ' || quote(store) || ' THEN price END) AS ' || quote(store), ',')
FROM (SELECT DISTINCT store FROM Products ORDER BY store);
~~
CREATE TEMP TABLE pivoted AS SELECT product_id, __COLUMNS__ FROM Products GROUP BY product_id;
~~
SELECT * FROM pivoted ORDER BY product_id;
"""

UNPIVOT_SUBMISSION = """
SELECT group_concat('SELECT product_id, ' || quote(name) || ' AS store, "'
|| replace(name, '"', '""') || '" AS price FROM Products WHERE "'
|| replace(name, '"', '""') || '" IS NOT NULL', ' UNION ALL ')
FROM pragma_table_info('Products') WHERE name <> 'product_id';
~~
SELECT * FROM (__COLUMNS__);
"""

RENAME_SUBMISSION = (
    "SELECT id AS student_id, first AS first_name, last AS last_name,"
    " age AS age_in_years FROM students"
)

SCENARIOS = [
    {
        "name": "headers on a plain select",
        "sql": {"schema": "CREATE TABLE students (id INTEGER, first TEXT, last TEXT, age INTEGER);", "headers": True},
        "setup": "INSERT INTO students VALUES (1, 'Mason', 'King', 6), (2, 'Ava', 'Wright', 7);",
        "submission": RENAME_SUBMISSION,
        "expected": {
            "columns": ["student_id", "first_name", "last_name", "age_in_years"],
            "rows": [[1, "Mason", "King", 6], [2, "Ava", "Wright", 7]],
        },
    },
    {
        "name": "no headers keeps bare rows",
        "sql": {"schema": "CREATE TABLE students (id INTEGER, first TEXT, last TEXT, age INTEGER);"},
        "setup": "INSERT INTO students VALUES (1, 'Mason', 'King', 6);",
        "submission": "SELECT id FROM students",
        "expected": [[1]],
    },
    {
        "name": "dynamic pivot with headers",
        "sql": {"schema": PIVOT_SCHEMA, "headers": True, "dynamic_columns": {"separator": ","}},
        "setup": PIVOT_SETUP,
        "submission": PIVOT_SUBMISSION,
        "expected": {
            "columns": ["product_id", "LC_Store", "Nozama", "Shop", "Souq"],
            "rows": [[1, 100, None, 110, None], [2, None, 200, None, 190], [3, None, None, 1000, 1900]],
        },
    },
    {
        "name": "dynamic unpivot with union-all separator",
        "sql": {"schema": UNPIVOT_SCHEMA, "headers": True, "dynamic_columns": {"separator": " UNION ALL "}},
        "setup": UNPIVOT_SETUP,
        "submission": UNPIVOT_SUBMISSION,
        "expected": {
            "columns": ["product_id", "store", "price"],
            "rows": [
                [1, "LC_Store", 100],
                [2, "Nozama", 200],
                [1, "Shop", 110],
                [3, "Shop", 1000],
                [2, "Souq", 190],
                [3, "Souq", 1900],
            ],
        },
    },
    {
        "name": "discovery must return one row and one column",
        "sql": {"schema": PIVOT_SCHEMA, "dynamic_columns": {"separator": ","}},
        "setup": PIVOT_SETUP,
        "submission": "SELECT store FROM Products;\n~~\nSELECT 1;",
        "expected": "runtime_error",
    },
    {
        "name": "dynamic_columns requires the discovery statement",
        "sql": {"schema": PIVOT_SCHEMA, "dynamic_columns": {"separator": ","}},
        "setup": PIVOT_SETUP,
        "submission": "SELECT product_id FROM Products",
        "expected": "runtime_error",
    },
    {
        "name": "attach is denied under dynamic_columns",
        "sql": {"schema": "", "dynamic_columns": {"separator": ","}},
        "setup": "",
        "submission": "SELECT 1;\n~~\nATTACH DATABASE '/tmp/coderpuzzle-escape.db' AS escape;",
        "expected": "runtime_error",
    },
]


def run_scenario(scenario: dict) -> dict:
    with tempfile.TemporaryDirectory() as job:
        query_path = Path(job) / "submission.sql"
        query_path.write_text(scenario["submission"].replace("~~", "\n"), encoding="utf-8")
        payload = {"invocation": {"sql": scenario["sql"]}, "input": [scenario["setup"]]}
        process = subprocess.run(
            [sys.executable, str(RUNNER / "sql_harness.py"), "--", str(query_path)],
            input=json.dumps(payload).encode(),
            capture_output=True,
            env={"PYTHONPATH": str(RUNNER), "PATH": "/usr/bin:/bin", "TMPDIR": job},
            timeout=60,
        )
    for line in process.stdout.decode().splitlines():
        if line.startswith("__CODERPUZZLE_RESULT__"):
            return json.loads(line[len("__CODERPUZZLE_RESULT__"):])
    raise AssertionError(f"no protocol line; stderr={process.stderr[:800]!r}")


class SqlFlagScenarioTests(unittest.TestCase):
    def test_scenarios(self) -> None:
        for scenario in SCENARIOS:
            with self.subTest(scenario=scenario["name"]):
                response = run_scenario(scenario)
                expected = scenario["expected"]
                if expected == "runtime_error":
                    self.assertEqual("runtime_error", response.get("status"))
                else:
                    self.assertEqual("completed", response.get("status"))
                    self.assertEqual(expected, response.get("actual"))


class ExecutorGuardTests(unittest.TestCase):
    def test_multi_statement_requires_dynamic_columns(self) -> None:
        from runner.executors.base import ExecutorError
        from runner.executors.sql import SqlExecutor

        executor = SqlExecutor()
        multi = "SELECT 1;\nSELECT 2;"
        with self.assertRaises(ExecutorError):
            executor.prepare(
                Path("/nonexistent-job"), Path("/nonexistent-job"), multi, {}, {}
            )
        # Under dynamic_columns the guard relaxes and prepare completes.
        with tempfile.TemporaryDirectory() as job:
            executor.prepare(
                Path(job),
                Path(job),
                multi,
                {"sql": {"dynamic_columns": {"separator": ","}}},
                {},
            )


if __name__ == "__main__":
    unittest.main()
