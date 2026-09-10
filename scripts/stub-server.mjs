// Local-only design-preview stub: serves the built frontend (dist/) and mocks
// the CoderPuzzle API with realistic data so the design can be screenshotted
// without Docker or the real backend. Local-only (its mode file and the
// screenshots live in the repo-root .localonly/, which is gitignored).
//
//   node scripts/stub-server.mjs   →  http://127.0.0.1:4173
//
// The /api/run verdict tone can be flipped by writing "ok" | "wa" | "tle" to
// .localonly/stub-mode (default "ok"), which the screenshot script does.
import http from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize, sep } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "frontend", "dist");
const PORT = 4173;
const MODE_FILE = join(ROOT, ".localonly", "stub-mode");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".map": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

function runMode() {
  try {
    if (existsSync(MODE_FILE)) {
      const mode = readFileSync(MODE_FILE, "utf8").trim();
      if (mode === "ok" || mode === "wa" || mode === "tle") return mode;
    }
  } catch {}
  return "ok";
}

// ── Problem catalogue ──────────────────────────────────────────────────────
// [title, tags, difficulty]
const ROWS = [
  ["Two Sum", ["Array", "Hash Table"], "Easy"],
  ["Valid Parentheses", ["Stack", "String"], "Easy"],
  ["Merge Two Sorted Lists", ["Linked List"], "Easy"],
  ["Reverse Linked List", ["Linked List"], "Easy"],
  ["Binary Tree Inorder Traversal", ["Binary Tree", "DFS"], "Medium"],
  ["Maximum Subarray", ["Array", "Divide and Conquer"], "Medium"],
  ["Longest Substring Without Repeating Characters", ["Hash Table", "Sliding Window"], "Medium"],
  ["Container With Most Water", ["Array", "Two Pointers"], "Medium"],
  ["LRU Cache", ["Design", "Hash Table"], "Hard"],
  ["Course Schedule", ["Graph", "Topological Sort"], "Hard"],
  ["Edit Distance", ["Dynamic Programming"], "Hard"],
  ["Find Median from Data Stream", ["Heap", "Design"], "Hard"],
  ["Median of Two Sorted Arrays", ["Array", "Binary Search"], "Hard"],
  ["Palindrome Partitioning II", ["Dynamic Programming"], "Hard"],
  ["Reconstruct Itinerary", ["Graph", "DFS"], "Hard"],
  ["Word Ladder II", ["Graph", "BFS"], "Hard"],
  ["Sudoku Solver", ["Backtracking", "Matrix"], "Hard"],
  ["Count of Smaller Numbers After Self", ["Fenwick Tree", "Divide and Conquer"], "Hard"],
  ["Trapping Rain Water", ["Array", "Two Pointers"], "Medium"],
  ["Kth Largest Element in an Array", ["Heap", "Quickselect"], "Medium"],
  ["Minimum Window Substring", ["Hash Table", "Sliding Window"], "Hard"],
  ["Serialize and Deserialize Binary Tree", ["Design", "Binary Tree"], "Hard"],
  ["Longest Increasing Subsequence", ["Dynamic Programming"], "Medium"],
  ["Coin Change", ["Dynamic Programming"], "Medium"],
  ["Best Time to Buy and Sell Stock", ["Array"], "Easy"],
  ["Climbing Stairs", ["Dynamic Programming"], "Easy"],
  ["Number of Islands", ["Matrix", "DFS"], "Medium"],
  ["Top K Frequent Elements", ["Hash Table", "Heap"], "Medium"],
  ["Pacific Atlantic Water Flow", ["Matrix", "DFS"], "Hard"],
  ["Alien Dictionary", ["Graph", "Topological Sort"], "Hard"],
  ["Merge K Sorted Lists", ["Heap", "Linked List"], "Hard"],
  ["Word Break", ["Dynamic Programming"], "Medium"],
  ["Decode Ways", ["Dynamic Programming"], "Medium"],
  ["Jump Game", ["Greedy", "Array"], "Medium"],
  ["House Robber", ["Dynamic Programming"], "Medium"],
  ["Gas Station", ["Greedy", "Array"], "Medium"],
  ["Candy", ["Greedy", "Array"], "Hard"],
  ["Longest Consecutive Sequence", ["Hash Table", "Union Find"], "Hard"],
  ["Group Anagrams", ["Hash Table", "String"], "Medium"],
  ["Spiral Matrix", ["Matrix"], "Medium"],
  ["Rotate Image", ["Matrix"], "Medium"],
  ["Set Matrix Zeroes", ["Matrix"], "Medium"],
  ["Word Search", ["Backtracking", "Matrix"], "Medium"],
  ["Search in Rotated Sorted Array", ["Array", "Binary Search"], "Medium"],
  ["Find First and Last Position of Element in Sorted Array", ["Array", "Binary Search"], "Medium"],
  ["Combination Sum", ["Backtracking"], "Medium"],
  ["Permutations", ["Backtracking"], "Medium"],
  ["Subsets", ["Backtracking"], "Medium"],
  ["Letter Combinations of a Phone Number", ["Backtracking", "String"], "Medium"],
  ["Validate Binary Search Tree", ["Binary Tree", "DFS"], "Medium"],
  ["Binary Tree Level Order Traversal", ["Binary Tree", "BFS"], "Medium"],
  ["Construct Binary Tree from Preorder and Inorder Traversal", ["Binary Tree", "Divide and Conquer"], "Hard"],
  ["Symmetric Tree", ["Binary Tree", "BFS"], "Easy"],
  ["Maximum Depth of Binary Tree", ["Binary Tree", "DFS"], "Easy"],
  ["Diameter of Binary Tree", ["Binary Tree", "DFS"], "Easy"],
  ["Invert Binary Tree", ["Binary Tree"], "Easy"],
  ["Lowest Common Ancestor of a Binary Tree", ["Binary Tree", "DFS"], "Medium"],
  ["Kth Smallest Element in a BST", ["Binary Tree", "DFS"], "Medium"],
  ["Sliding Window Maximum", ["Heap", "Sliding Window"], "Hard"],
];

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// A couple of non-Algorithms rows so the type filter has real data to chew
// on in offline UI work; the assignments are intentionally arbitrary.
const TYPES = {
  "lru-cache": "Database",
  "course-schedule": "Shell",
};

const PROBLEMS = ROWS.map(([title, tags, difficulty], index) => ({
  id: index + 1,
  slug: slugify(title),
  title,
  difficulty,
  tags,
  topics: tags,
  type: TYPES[slugify(title)] ?? "Algorithms",
}));

const TOPIC_INDEX = (() => {
  const counts = new Map();
  for (const problem of PROBLEMS) {
    for (const topic of problem.topics) counts.set(topic, (counts.get(topic) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
    .map(([name, count]) => ({ name, count }));
})();

const LANGUAGES = {
  python3: { display_name: "Python 3", monaco_language: "python", enabled: true, version: "3.14.7" },
  javascript: { display_name: "JavaScript", monaco_language: "javascript", enabled: true, version: "Node 22.23.2" },
  typescript: { display_name: "TypeScript", monaco_language: "typescript", enabled: true, version: "TS 5.7" },
  java: { display_name: "Java", monaco_language: "java", enabled: true, version: "JDK 21.0.12" },
  cpp: { display_name: "C++", monaco_language: "cpp", enabled: true, version: "G++ 14.2.0" },
  go: { display_name: "Go", monaco_language: "go", enabled: true, version: "Go 1.24.4" },
  rust: { display_name: "Rust", monaco_language: "rust", enabled: true, version: "Rust 1.85.0" },
  sql: { display_name: "SQL", monaco_language: "sql", enabled: false, version: "SQLite 3.45" },
};

const STARTERS = {
  python3: "def two_sum(nums, target):\n    # Map value -> index, then find the complement in one pass.\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n",
  javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    const seen = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (seen.has(complement)) return [seen.get(complement), i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}\n",
  typescript: "function twoSum(nums: number[], target: number): number[] {\n    const seen = new Map<number, number>();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (seen.has(complement)) return [seen.get(complement)!, i];\n        seen.set(nums[i], i);\n    }\n    return [];\n}\n",
  java: "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (seen.containsKey(complement)) return new int[] { seen.get(complement), i };\n            seen.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}\n",
  cpp: '#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (seen.count(complement)) return { seen[complement], i };\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};\n',
  go: "package main\n\nfunc twoSum(nums []int, target int) []int {\n    seen := make(map[int]int)\n    for i, num := range nums {\n        complement := target - num\n        if j, ok := seen[complement]; ok {\n            return []int{j, i}\n        }\n        seen[num] = i\n    }\n    return []int{}\n}\n",
  rust: "use std::collections::HashMap;\n\npub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n    let mut seen = HashMap::new();\n    for (i, &num) in nums.iter().enumerate() {\n        if let Some(&j) = seen.get(&(target - num)) {\n            return vec![j, i as i32];\n        }\n        seen.insert(num, i as i32);\n    }\n    vec![]\n}\n",
  sql: "-- Coming soon.\n",
};

const DESCRIPTION = (title) => `Given the problem \`${title}\`, return the expected answer according to the statement.

The judge builds the function, runs it against every hidden case in an isolated
container, and reports the first failing case (or a green **Accepted**).

**Example 1**

\`\`\`text
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
\`\`\`

**Constraints**

- The input always fits the declared signature.
- Time and memory limits follow the problem card above.
- Only one correct answer exists.

\`\`\`python
# The statement usually shows a small reference snippet.
def reference(nums, target):
    return [0, 1]
\`\`\``;

function problemDetail(p) {
  return {
    ...p,
    description: DESCRIPTION(p.title),
    hints: [
      "Start with the simplest correct approach, then profile.",
      "Watch the limits on the editor status bar — they are the real target.",
      "Run against the visible cases before submitting to the hidden judge.",
    ],
    invocation: {
      type: "function",
      class_name: "Solution",
      method: "twoSum",
      parameters: [
        { name: "nums", codec: "int[]" },
        { name: "target", codec: "int" },
      ],
      return_codec: "int[]",
    },
    limits: { time_ms: 2000, memory_mb: 256 },
    languages: LANGUAGES,
    public_cases: [
      { name: "Example 1", input: { nums: [2, 7, 11, 15], target: 9 } },
      { name: "Example 2", input: { nums: [3, 2, 4], target: 6 } },
      { name: "Example 3", input: { nums: [3, 3], target: 6 } },
    ],
  };
}

function caseResult(name, index, status, runtime) {
  return {
    index,
    name,
    status,
    runtime_ms: runtime,
    timeout_ms: status === "time_limit_exceeded" ? 2000 : null,
    input: { nums: [2, 7, 11, 15], target: 9 },
    expected: status === "wrong_answer" ? [0, 1] : undefined,
    actual: status === "wrong_answer" ? [0, 15] : undefined,
    error: status === "runtime_error" ? "IndexError: list index out of range (line 6)" : undefined,
  };
}

function verdictForRun() {
  const mode = runMode();
  if (mode === "wa") {
    return {
      status: "wrong_answer",
      passed: 2,
      total: 5,
      runtime_ms: 37,
      results: [
        caseResult("Example 1", 0, "completed", 12),
        caseResult("Example 2", 1, "completed", 9),
        caseResult("Hidden 1", 2, "wrong_answer", 16),
      ],
    };
  }
  if (mode === "tle") {
    return {
      status: "time_limit_exceeded",
      passed: 4,
      total: 5,
      runtime_ms: 2041,
      results: [
        caseResult("Example 1", 0, "completed", 11),
        caseResult("Example 2", 1, "completed", 9),
        caseResult("Hidden 4", 2, "time_limit_exceeded", 2000),
      ],
    };
  }
  return {
    status: "completed",
    passed: 5,
    total: 5,
    runtime_ms: 24,
    reference_runtime_ms: 12,
    results: [
      caseResult("Example 1", 0, "completed", 11),
      caseResult("Example 2", 1, "completed", 9),
      caseResult("Hidden 1", 2, "completed", 24),
    ],
  };
}

function verdictForSubmit() {
  if (runMode() === "wa") {
    return { ...verdictForRun(), status: "wrong_answer", passed: 2, total: 47 };
  }
  return {
    status: "accepted",
    passed: 47,
    total: 47,
    runtime_ms: 31,
    reference_runtime_ms: 12,
    submission_id: 1042,
    results: [
      caseResult("Example 1", 0, "completed", 11),
      caseResult("Example 2", 1, "completed", 9),
      caseResult("Hidden 1", 2, "completed", 24),
    ],
  };
}

const now = Date.now();
function toJSON(data) {
  return Buffer.from(JSON.stringify(data, null, 2), "utf8");
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let path;
  try {
    path = decodeURIComponent(url.pathname);
  } catch {
    res.statusCode = 400;
    return res.end("bad request");
  }

  // ── API ─────────────────────────────────────────────────────────────────
  if (path.startsWith("/api/")) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");

    const solutionsMatch = path.match(/^\/api\/problems\/([a-z0-9-]+)\/solutions$/);
    if (solutionsMatch) {
      return res.end(toJSON({
        guide: { bfs: "Explore each island level by level with a queue.\n\n**Complexity:** O(m*n) time.", dfs: "Same flood fill, a stack frontier.\n\n**Complexity:** O(m*n) time." },
        implementations: {
          bfs: { python3: "def numIslands(self, grid):\n    return 0  # bfs", java: "class Solution {}" },
          dfs: { python3: "def numIslands(self, grid):\n    return 0  # dfs", java: "class Solution {}" },
        },
        canonical: {},
      }));
    }
    if (path === "/api/auth/status") {
      return res.end(toJSON({
        needs_setup: false,
        providers: [{
          id: "password",
          label: "Username and password",
          flow: "credentials",
          can_login: true,
          can_register: false,
          can_bootstrap: true,
          fields: [
            { name: "username", label: "Username", kind: "text", autocomplete: "username", required: true },
            { name: "password", label: "Password", kind: "password", autocomplete: "current-password", required: true, min_length: 8 },
          ],
          register_fields: [],
          start_fields: [],
        }],
      }));
    }
    const authMatch = path.match(/^\/api\/auth\/(register|login|logout|start|complete)$/);
    if (authMatch) {
      res.setHeader("Set-Cookie", "coderpuzzle_session=stub0000000000000000000000000002; Path=/; HttpOnly; SameSite=Lax");
      if (authMatch[1] === "logout") return res.end(toJSON({ status: "logged_out" }));
      return res.end(toJSON({ status: "registered", username: "tester", is_admin: false }));
    }
    if (path === "/api/session") {
      if (req.method === "POST") {
        res.setHeader("Set-Cookie", "coderpuzzle_session=stub0000000000000000000000000001; Path=/; HttpOnly; SameSite=Lax");
        return res.end(toJSON({ status: "active", idle_seconds: 3600 }));
      }
      return res.end(toJSON({ status: "active", idle_seconds: 3600 }));
    }
    const draftMatch = path.match(/^\/api\/drafts\/([a-z0-9-]+)(?:\/([a-z0-9]+))?$/);
    if (draftMatch) {
      if (req.method === "PUT") {
        return res.end(toJSON({ status: "saved" }));
      }
      return res.end(toJSON([]));
    }

    if (path === "/api/problems/topics" && req.method === "GET") {
      return res.end(toJSON({ topics: TOPIC_INDEX }));
    }

    if (path === "/api/problems" && req.method === "GET") {
      const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
      const pageSize = Number(url.searchParams.get("page_size")) || 0;
      if (pageSize <= 0) return res.end(toJSON({ items: PROBLEMS, total: PROBLEMS.length, page: 1, page_size: 0, pages: 1 }));
      const pages = Math.max(1, Math.ceil(PROBLEMS.length / pageSize));
      const items = PROBLEMS.slice((page - 1) * pageSize, page * pageSize);
      return res.end(toJSON({ items, total: PROBLEMS.length, page, page_size: pageSize, pages }));
    }

    const problemMatch = path.match(/^\/api\/problems\/([a-z0-9-]+)$/);
    if (problemMatch && req.method === "GET") {
      const problem = PROBLEMS.find((p) => p.slug === problemMatch[1]);
      if (!problem) {
        res.statusCode = 404;
        return res.end(toJSON({ detail: `Unknown problem: ${problemMatch[1]}` }));
      }
      return res.end(toJSON(problemDetail(problem)));
    }

    if (path === "/api/progress") {
      // First row solved, second attempted, rest never-tried — exercises the
      // per-row status marks on the landing list and the drawer.
      return res.end(toJSON({ [PROBLEMS[0].slug]: "solved", [PROBLEMS[1].slug]: "attempted" }));
    }

    if (path === "/api/run" && req.method === "POST") return res.end(toJSON(verdictForRun()));
    if (path === "/api/submit" && req.method === "POST") return res.end(toJSON(verdictForSubmit()));

    if (path === "/api/submissions" && req.method === "GET") {
      const submissions = [
        { id: 1042, problem_slug: "two-sum", language: "python3", status: "accepted", passed: 47, total: 47, runtime_ms: 31, created_at: new Date(now - 6 * 60000).toISOString() },
        { id: 1038, problem_slug: "two-sum", language: "go", status: "wrong_answer", passed: 40, total: 47, runtime_ms: 52, created_at: new Date(now - 2 * 3600000).toISOString() },
        { id: 1021, problem_slug: "two-sum", language: "cpp", status: "time_limit_exceeded", passed: 44, total: 47, runtime_ms: 2012, created_at: new Date(now - 26 * 3600000).toISOString() },
        { id: 987, problem_slug: "two-sum", language: "rust", status: "compile_error", passed: 0, total: 47, runtime_ms: 0, created_at: new Date(now - 3 * 86400000).toISOString() },
      ];
      return res.end(toJSON(submissions));
    }

    res.statusCode = 404;
    return res.end(toJSON({ detail: `Stub has no route: ${path}` }));
  }

  // ── Static / SPA ────────────────────────────────────────────────────────
  let filePath = path === "/" ? "/index.html" : path;
  let resolved = normalize(join(DIST, filePath));
  // the separator check keeps a sibling directory (.../dist-evil) from
  // passing the prefix test
  if (resolved !== DIST && !resolved.startsWith(DIST + sep)) {
    res.statusCode = 403;
    return res.end("forbidden");
  }
  const ext = extname(resolved);
  try {
    const body = readFileSync(resolved);
    res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
    res.end(body);
  } catch {
    // SPA fallback for /problems/:slug deep links.
    res.setHeader("Content-Type", MIME[".html"]);
    res.end(readFileSync(join(DIST, "index.html")));
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`CoderPuzzle stub server → http://127.0.0.1:${PORT}  (dist: ${DIST})`);
  console.log(`run mode: "${runMode()}" — write ok|wa|tle to .localonly/stub-mode to flip verdicts`);
});
