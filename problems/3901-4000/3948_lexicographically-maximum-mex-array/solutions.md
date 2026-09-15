# Solutions — Lexicographically Maximum MEX Array

The next output cannot exceed the remaining suffix MEX. Consume the shortest prefix containing every smaller value; this preserves the longest suffix among all choices attaining that MEX. Remaining frequencies update the next suffix MEX when a value is exhausted.

## Suffix MEX greedy

The next output cannot exceed the remaining suffix MEX. Consume the shortest prefix containing every smaller value; this preserves the longest suffix among all choices attaining that MEX. Remaining frequencies update the next suffix MEX when a value is exhausted.

**Complexity:** `O(n) time, O(n) space`.
