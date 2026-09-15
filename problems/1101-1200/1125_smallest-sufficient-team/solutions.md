# Solutions — Smallest Sufficient Team

## Bitmask Dynamic Programming

With at most 16 required skills, every skill set a team can cover fits in a 16-bit mask: bit `t` is set when the team already includes `req_skills[t]`. Each person is pre-converted to the mask of skills they contribute, so the question becomes the classic "cover all bits with the fewest people" set-cover DP, which is exact because the state space (all reachable skill subsets) is small enough to enumerate.

The DP is a dictionary mapping each covered-skill mask to the smallest team (a list of person indices) achieving it, starting from `{0: []}`. People are processed one at a time in index order. For each person, every currently reachable `state` is combined into `new_state = state | person_mask` with the candidate team `team + [i]`; the entry is kept only when `new_state` was unreachable or the candidate is strictly shorter than the recorded team. Updates are buffered in `new_entries` and applied after the inner loop, so one person cannot be added twice to the same chain within a single round.

This forward-style update is correct for team size because the DP values only ever need to be minimal per mask: any optimal team for a mask is some ordered subset of people, and processing people in index order tries every such subset, keeping the shortest. A person with no required skills maps to mask 0 and can never lengthen a team usefully, so they are filtered out implicitly. The final answer is the team stored for the full mask `(1 << S) - 1`, returned sorted for a deterministic order.

Storing full teams in the table (rather than parent pointers) makes each candidate construction cost up to the team length, which is bounded by the number of skills, since an optimal team never needs more than one person per still-missing skill. Writing `P` for the number of people and `S <= 16` for the number of required skills bounds the work.

Example 1 (`req_skills = ["java","nodejs","reactjs"]`) builds masks 001, 010, and 110 for the three people:

1. Processing person 0 (mask 001) leaves `dp = {000: [], 001: [0]}`.
2. Person 1 (010) adds `010: [1]` and `011: [0, 1]`.
3. Person 2 (110) adds `110: [2]` and `111: [0, 2]`; combining from `011` would give the three-member `[0, 1, 2]`, which loses to the shorter team.
4. `dp[111] = [0, 2]` — the java specialist plus the nodejs/reactjs generalist.

**Complexity:** `O(P * 2^S * S)` time, `O(2^S * S)` space.
