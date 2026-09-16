
FLAT_FIXTURE = """# 1. Two Sum

## Metadata

```json
{
  "schema_version": 1,
  "slug": "two-sum",
  "difficulty": "Medium",
  "tags": ["Array", "Hash Table"]
}
```

## Description

Given an array of integers `nums` and an integer `target`, return the indices
of the two numbers whose values add up to `target`.

You may assume that every input has **exactly one solution**, and you may not
use the same element twice.

You can return the answer in any order.

### Example 1

```text
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] is 9, so return [0,1].
```

### Example 2

```text
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Example 3

```text
Input: nums = [3,3], target = 6
Output: [0,1]
```

### Constraints

- `2 <= nums.length <= 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= target <= 10⁹`
- Only one valid answer exists.

### Follow-up

Can you design an algorithm with less than `O(n²)` time complexity?

## Hints

```json
[
  "A brute-force search considers every pair. Use it to identify the repeated work you could avoid.",
  "For a fixed value x, the number you need is target - x. What structure can locate that complement quickly?",
  "A hash map can remember values you have already visited and the index where each appeared."
]
```

## Invocation

```json
{
  "type": "function",
  "class_name": "Solution",
  "method": "twoSum",
  "parameters": [
    {
      "name": "nums",
      "codec": "json",
      "value_type": {
        "kind": "array",
        "items": {"kind": "integer", "bits": 32}
      }
    },
    {
      "name": "target",
      "codec": "json",
      "value_type": {"kind": "integer", "bits": 32}
    }
  ],
  "return_codec": "json",
  "return_type": {
    "kind": "array",
    "items": {"kind": "integer", "bits": 32}
  },
  "entrypoints": {
    "go": "twoSum",
    "rust": "two_sum",
    "typescript": "twoSum"
  },
  "comparison": "sorted"
}
```

## Limits

```json
{
  "time_ms": 1500,
  "memory_mb": 256,
  "output_kb": 64
}
```

## Languages

```json
{
  "python3": {
    "display_name": "Python 3",
    "monaco_language": "python",
    "version": "3.14.7",
    "enabled": true
  },
  "javascript": {
    "display_name": "JavaScript",
    "monaco_language": "javascript",
    "version": "Node 22.23.2",
    "enabled": true
  },
  "typescript": {
    "display_name": "TypeScript",
    "monaco_language": "typescript",
    "version": "TypeScript 5.7.3 / Node 22.23.2",
    "enabled": true
  },
  "java": {
    "display_name": "Java",
    "monaco_language": "java",
    "version": "JDK 21.0.12",
    "enabled": true
  },
  "cpp": {
    "display_name": "C++",
    "monaco_language": "cpp",
    "version": "G++ 14.2.0",
    "enabled": true
  },
  "go": {
    "display_name": "Go",
    "monaco_language": "go",
    "version": "Go 1.24.4",
    "enabled": true
  },
  "rust": {
    "display_name": "Rust",
    "monaco_language": "rust",
    "version": "Rust 1.85.0",
    "enabled": true
  }
}
```

## Starters

### python3

```python
from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        raise NotImplementedError("TODO")
```

### javascript

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    throw new Error("TODO");
};
```

### typescript

```typescript
function twoSum(nums: number[], target: number): number[] {
    throw new Error("TODO");
}
```

### java

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        throw new UnsupportedOperationException("TODO");
    }
}
```

### cpp

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        throw logic_error("TODO");
    }
};
```

### go

```go
func twoSum(nums []int, target int) []int {
    panic("TODO")
}
```

### rust

```rust
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        panic!("TODO")
    }
}
```

## Test Cases

### Public

```json
[
  {"input": [[2, 7, 11, 15], 9], "expected": [0, 1]},
  {"input": [[3, 2, 4], 6], "expected": [1, 2]},
  {"input": [[3, 3], 6], "expected": [0, 1]}
]
```

### Hidden

```json
[
  {"input": [[0, 4, 3, 0], 0], "expected": [0, 3]},
  {"input": [[-3, 4, 3, 90], 0], "expected": [0, 2]},
  {"input": [[-1, -2, -3, -4, -5], -8], "expected": [2, 4]},
  {"input": [[2, 5, 5, 11], 10], "expected": [1, 2]},
  {"input": [[12, -7, 4, 21, 9, 31], 43], "expected": [0, 5]},
  {"input": [[-1000000000, 7, 1000000000, 12], 0], "expected": [0, 2]},
  {"input": [[3, 2, 8, 4], 6], "expected": [1, 3]},
  {"input": [[0, 1, 2, -3, 5], -1], "expected": [2, 3]},
  {"input": [[-17, 24], 7], "expected": [0, 1]},
  {"input": [[8, 8, 8, 13, 8, -2], 11], "expected": [3, 5]},
  {"input": [[1, 4, 8, 15, 23, 42, 67, 91], 158], "expected": [6, 7]},
  {"input": [[18, -40, 11, -8, 27, 5], -29], "expected": [1, 2]},
  {"input": [[0, 19, -4, 6, 12], 19], "expected": [0, 1]},
  {"input": [[999999999, -999999998, 6, 14], 1], "expected": [0, 1]},
  {"input": [[14, 3, 29, -5, 72, 18], 13], "expected": [3, 5]}
]
```
"""

import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

from api.app.problems import ProblemError, parse_problem_markdown


ROOT = Path(__file__).resolve().parents[1]
PROBLEMS_ROOT = ROOT / "problems"


class TwoSumPackageTests(unittest.TestCase):
    def setUp(self) -> None:
        # The flat single-file format the parser accepts; the repo's own
        # fallback is a bundle now, so the fixture lives here.
        self.path = PROBLEMS_ROOT / "0001_two-sum.md"
        self.markdown = FLAT_FIXTURE
        self.manifest, self.cases, self.public_count = parse_problem_markdown(
            self.markdown,
            self.path,
        )
        self.starters = {
            language: config["starter"]
            for language, config in self.manifest["languages"].items()
        }

    def test_manifest_enables_all_installed_runtimes(self) -> None:
        languages = self.manifest["languages"]
        self.assertEqual(
            {"python3", "javascript", "typescript", "java", "cpp", "go", "rust"},
            set(languages),
        )
        self.assertTrue(languages["python3"]["enabled"])
        self.assertEqual("3.14.7", languages["python3"]["version"])
        self.assertTrue(languages["java"]["enabled"])
        self.assertEqual("JDK 21.0.12", languages["java"]["version"])
        self.assertEqual(
            {"python3", "javascript", "typescript", "java", "cpp", "go", "rust"},
            {key for key, config in languages.items() if config["enabled"]},
        )
        self.assertEqual(set(languages), set(self.starters))
        self.assertTrue(all(starter.endswith("\n") for starter in self.starters.values()))

    def test_static_languages_have_a_neutral_typed_signature(self) -> None:
        invocation = self.manifest["invocation"]
        self.assertTrue(all("value_type" in parameter for parameter in invocation["parameters"]))
        self.assertEqual("array", invocation["return_type"]["kind"])
        self.assertEqual(
            {"go": "twoSum", "rust": "two_sum", "typescript": "twoSum"},
            invocation["entrypoints"],
        )

    def test_problem_uses_one_language_agnostic_markdown_asset(self) -> None:
        # The checked-in corpus keeps one language-agnostic statement per
        # bundle rather than separate problem assets for each runtime.
        bundle = PROBLEMS_ROOT / "0001-0100" / "0001_two-sum"
        self.assertTrue(bundle.is_dir())
        self.assertEqual([bundle / "statement.md"], list(bundle.glob("statement*.md")))
        self.assertEqual(3, self.public_count)
        self.assertTrue(all(set(case) == {"input", "expected"} for case in self.cases))
        self.assertNotIn("## Starters", self.manifest["description"])
        self.assertNotIn("## Test Cases", self.manifest["description"])

    def test_schema_rejects_missing_or_reordered_required_headings(self) -> None:
        missing = self.markdown.replace("## Limits\n", "## Runtime Limits\n", 1)
        with self.assertRaisesRegex(ProblemError, "Required level-two headings"):
            parse_problem_markdown(missing)

        reordered = self.markdown.replace(
            "## Hints\n",
            "## Limits\n\n```json\n"
            "{\"time_ms\":1,\"memory_mb\":1,\"output_kb\":1}\n"
            "```\n\n## Hints\n",
            1,
        ).replace("## Limits\n", "## Removed Limits\n", 1)
        with self.assertRaisesRegex(ProblemError, "Required level-two headings"):
            parse_problem_markdown(reordered)

    def test_schema_rejects_starters_that_do_not_match_languages(self) -> None:
        invalid = self.markdown.replace("### rust\n", "### rust-renamed\n", 1)
        with self.assertRaisesRegex(ProblemError, "starter headings"):
            parse_problem_markdown(invalid)

    def test_filename_must_match_document_id_and_slug(self) -> None:
        with self.assertRaisesRegex(ProblemError, "filename id and slug"):
            parse_problem_markdown(self.markdown, PROBLEMS_ROOT / "0002_two-sum.md")

    def test_extracted_enabled_starters_are_syntactically_valid(self) -> None:
        python_source = self.starters["python3"]
        compile(python_source, "Solution.py", "exec")

        javac = shutil.which("javac")
        if javac is None:
            self.skipTest("javac is not installed")
        java_source = self.starters["java"]
        with tempfile.TemporaryDirectory() as directory:
            source_path = Path(directory) / "Solution.java"
            source_path.write_text(java_source, encoding="utf-8")
            completed = subprocess.run(
                [javac, "--release", "21", "-proc:none", str(source_path)],
                capture_output=True,
                text=True,
                timeout=10,
                check=False,
            )
        self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)

        node = shutil.which("node")
        if node is None:
            self.skipTest("node is not installed")
        javascript_source = self.starters["javascript"]
        with tempfile.TemporaryDirectory() as directory:
            script_path = Path(directory) / "main.js"
            script_path.write_text(javascript_source, encoding="utf-8")
            completed = subprocess.run(
                [node, "--check", str(script_path)],
                capture_output=True,
                text=True,
                timeout=10,
                check=False,
            )
        self.assertEqual(0, completed.returncode, completed.stdout + completed.stderr)

    def test_every_case_has_exactly_one_valid_pair(self) -> None:
        for case in self.cases:
            nums, target = case["input"]
            pairs = [
                [left, right]
                for left in range(len(nums))
                for right in range(left + 1, len(nums))
                if nums[left] + nums[right] == target
            ]
            with self.subTest(case=case):
                self.assertEqual([case["expected"]], pairs)

    def test_hidden_suite_has_broad_boundary_coverage(self) -> None:
        values = [value for case in self.cases for value in case["input"][0]]
        self.assertIn(0, values)
        self.assertTrue(any(value < 0 for value in values))
        self.assertTrue(any(value > 0 for value in values))
        self.assertIn(-1_000_000_000, values)
        self.assertIn(1_000_000_000, values)
        self.assertGreaterEqual(len(self.cases), 15)


if __name__ == "__main__":
    unittest.main()


class ProblemCacheBudgetTests(unittest.TestCase):
    """The parsed-bundle cache is bounded by bytes, not by entry count.

    256 entries meant a few hundred megabytes or a couple of gigabytes
    depending only on which bundles were hot, because one ~20,000-case
    bundle parses into tens of megabytes while a typical one is well under
    one. Both production OOM kills traced back to that.
    """

    def setUp(self):
        from api.app import problems as problems_module
        self.problems = problems_module
        self.addCleanup(self._restore, problems_module,
                        problems_module.PROBLEM_CACHE_BYTES)
        problems_module._problem_cache.clear()
        problems_module._problem_cache_bytes = 0

    def _restore(self, module, budget):
        module.PROBLEM_CACHE_BYTES = budget
        module._problem_cache.clear()
        module._problem_cache_bytes = 0

    def _store(self, name, weight):
        self.problems._problem_cache[(name, 0, 0)] = (weight, name)
        self.problems._problem_cache_bytes += weight

    def _evict(self):
        while (self.problems._problem_cache_bytes > self.problems.PROBLEM_CACHE_BYTES
               and len(self.problems._problem_cache) > 1):
            _, (weight, _) = self.problems._problem_cache.popitem(last=False)
            self.problems._problem_cache_bytes -= weight

    def test_one_huge_bundle_evicts_many_small_ones(self):
        self.problems.PROBLEM_CACHE_BYTES = 10_000_000
        for index in range(50):
            self._store(f"small-{index}", 100_000)
        self._evict()
        self.assertEqual(50, len(self.problems._problem_cache))
        self._store("huge", 60_000_000)
        self._evict()
        self.assertIn(("huge", 0, 0), self.problems._problem_cache)
        self.assertLess(len(self.problems._problem_cache), 50)

    def test_an_entry_larger_than_the_whole_budget_is_still_kept(self):
        """Evicting it would re-parse the same bundle on every request."""
        self.problems.PROBLEM_CACHE_BYTES = 1_000
        self._store("enormous", 500_000_000)
        self._evict()
        self.assertEqual(1, len(self.problems._problem_cache))

    def test_the_budget_is_honoured_across_many_inserts(self):
        self.problems.PROBLEM_CACHE_BYTES = 5_000_000
        for index in range(200):
            self._store(f"bundle-{index}", 250_000)
            self._evict()
        self.assertLessEqual(self.problems._problem_cache_bytes,
                             self.problems.PROBLEM_CACHE_BYTES + 250_000)
