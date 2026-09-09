"""Trusted output validators for problems whose contract accepts many
byte-distinct answers (LeetCode "return any of them") or statistical
randomness. Comparison stays app-side — `expected` never crosses the runner
boundary — so the validators live here, the same trust tier as the rest of
judging. Registry entries take the submission's decoded output plus the case
context and answer one question: is THIS output a correct answer?

`judge._compare` dispatches on `{"mode": "validator", "name": ..., "params":
{...}}` expected specs (also accepted as one element of a design-output list);
`case_input` is the raw case input the validator may read. Every validator
documents the input shape it expects — these are fixed per problem class.
"""
import json
from typing import Any


def _is_number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def _is_index(value: Any) -> bool:
    return isinstance(value, int) and not isinstance(value, bool)


def _fizz_token(value: int) -> str:
    if value % 15 == 0:
        return "fizzbuzz"
    if value % 3 == 0:
        return "fizz"
    if value % 5 == 0:
        return "buzz"
    return str(value)


def _validate_fizzbuzz(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """1195 Fizz Buzz Multithreaded. `actual` is the recorded print sequence
    — either the printed numbers themselves (ints) or their rendered tokens
    (strings). params carries {"n": <count>}; the sequence must be exactly
    1..n in print order, each record matching its position's required print."""
    if not isinstance(actual, list):
        return False
    n = params.get("n")
    if not _is_index(n) or n <= 0 or len(actual) != n:
        return False
    for record, position in zip(actual, range(1, n + 1)):
        if isinstance(record, str):
            if record != _fizz_token(position):
                return False
        elif not (_is_index(record) and record == position):
            return False
    return True


def _validate_knight_tour(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """2664 The Knight's Tour. `actual` is the m×n board of visit order
    values; input is [m, n, r, c]. Any complete tour from the start square is
    accepted — move legality is checked between consecutive visit numbers."""
    if not (isinstance(case_input, list) and len(case_input) >= 4):
        return False
    m, n, r, c = case_input[0], case_input[1], case_input[2], case_input[3]
    if not all(_is_index(value) for value in (m, n, r, c)):
        return False
    if not isinstance(actual, list) or len(actual) != m:
        return False
    if any(not isinstance(row, list) or len(row) != n for row in actual):
        return False
    flat = [cell for row in actual for cell in row]
    if not all(_is_index(cell) for cell in flat):
        return False
    total = m * n
    if sorted(flat) != list(range(total)):
        return False
    position = [None] * total
    for row_index, row in enumerate(actual):
        for column_index, order in enumerate(row):
            position[order] = (row_index, column_index)
    if position[0] != (r, c):
        return False
    for order in range(1, total):
        previous_row, previous_column = position[order - 1]
        row, column = position[order]
        row_delta, column_delta = abs(row - previous_row), abs(column - previous_column)
        if min(row_delta, column_delta) != 1 or max(row_delta, column_delta) != 2:
            return False
    return True


def _validate_grid_layout(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """3311 Construct 2D Grid Matching Graph Layout. `actual` is the grid of
    node ids; input is [n, edges]. Requires each id exactly once and the
    multiset of horizontally/vertically adjacent id pairs to equal `edges`
    exactly — any arrangement meeting that is accepted."""
    if not (isinstance(case_input, list) and len(case_input) >= 2):
        return False
    node_count, edges = case_input[0], case_input[1]
    if not _is_index(node_count) or not isinstance(edges, list):
        return False
    if not isinstance(actual, list) or not actual:
        return False
    if any(not isinstance(row, list) for row in actual):
        return False
    flat = [cell for row in actual for cell in row]
    if len(flat) != node_count or sorted(flat) != list(range(node_count)):
        return False
    layout_pairs = []
    for row_index, row in enumerate(actual):
        for column_index, cell in enumerate(row):
            for neighbor_row, neighbor_column in (
                (row_index, column_index + 1),
                (row_index + 1, column_index),
            ):
                if neighbor_row < len(actual) and (
                    neighbor_column < len(actual[neighbor_row])
                ):
                    other = actual[neighbor_row][neighbor_column]
                    layout_pairs.append((min(cell, other), max(cell, other)))
    edge_pairs = []
    for edge in edges:
        if not (isinstance(edge, list) and len(edge) == 2):
            return False
        first, second = edge[0], edge[1]
        if not (_is_index(first) and _is_index(second)):
            return False
        edge_pairs.append((min(first, second), max(first, second)))
    return sorted(layout_pairs) == sorted(edge_pairs)


def _tree_depths(adjacency: list[list[int]], start: int) -> list[int]:
    """BFS depth from `start`; -1 marks unreachable (non-tree input)."""
    depths = [-1] * len(adjacency)
    depths[start] = 0
    queue = [start]
    for node in queue:
        for neighbor in adjacency[node]:
            if depths[neighbor] < 0:
                depths[neighbor] = depths[node] + 1
                queue.append(neighbor)
    return depths


def _validate_last_marked_nodes(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """3313 Find the Last Marked Nodes in Tree. Input is [edges]; for every
    node i the output must name a node at maximum distance from i — the crawl's
    "you can choose any one answer", since node v gets marked at time d(i, v)
    and the last-marked nodes from i are exactly its farthest nodes. The
    eccentricity theorem gives ecc(v) = max(d(v, a), d(v, b)) for either
    endpoint of any fixed diameter, so acceptance checks d(i, answer[i]) ==
    ecc(i); pairwise distances come from a BFS per distinct answer node (the
    common few-distinct case) or binary-lifting LCA when answers are many."""
    if not (isinstance(case_input, list) and case_input and isinstance(case_input[0], list)):
        return False
    edges = case_input[0]
    node_count = len(edges) + 1
    adjacency: list[list[int]] = [[] for _ in range(node_count)]
    for edge in edges:
        if not (isinstance(edge, list) and len(edge) == 2):
            return False
        first, second = edge
        if not (_is_index(first) and _is_index(second)):
            return False
        if not (0 <= first < node_count and 0 <= second < node_count):
            return False
        adjacency[first].append(second)
        adjacency[second].append(first)
    if not isinstance(actual, list) or len(actual) != node_count:
        return False
    if any(not (_is_index(node) and 0 <= node < node_count) for node in actual):
        return False

    depths = _tree_depths(adjacency, 0)
    if any(distance < 0 for distance in depths):
        return False  # not a connected tree
    endpoint = max(range(node_count), key=depths.__getitem__)
    from_first = _tree_depths(adjacency, endpoint)
    other = max(range(node_count), key=from_first.__getitem__)
    from_other = _tree_depths(adjacency, other)
    eccentricity = [max(from_first[node], from_other[node]) for node in range(node_count)]

    distinct = set(actual)
    if len(distinct) <= 32:
        for answer in distinct:
            distances = _tree_depths(adjacency, answer)
            for node, choice in enumerate(actual):
                if choice == answer and distances[node] != eccentricity[node]:
                    return False
        return True

    # Many distinct answers: one binary-lifting LCA query per position
    # (rooted at 0, whose BFS depths are already computed).
    parent = [0] * node_count
    seen = [False] * node_count
    seen[0] = True
    queue = [0]
    for node in queue:
        for neighbor in adjacency[node]:
            if not seen[neighbor]:
                seen[neighbor] = True
                parent[neighbor] = node
                queue.append(neighbor)
    levels = max(1, (node_count - 1).bit_length())
    ancestors = [parent]
    for _ in range(1, levels):
        previous = ancestors[-1]
        ancestors.append([previous[previous[node]] for node in range(node_count)])

    def lowest_common_ancestor(first: int, second: int) -> int:
        if depths[first] < depths[second]:
            first, second = second, first
        difference = depths[first] - depths[second]
        step = 0
        while difference:
            if difference & 1:
                first = ancestors[step][first]
            difference >>= 1
            step += 1
        if first == second:
            return first
        for step in range(levels - 1, -1, -1):
            if ancestors[step][first] != ancestors[step][second]:
                first = ancestors[step][first]
                second = ancestors[step][second]
        return parent[first]

    for node, choice in enumerate(actual):
        ancestor = lowest_common_ancestor(node, choice)
        walked = depths[node] + depths[choice] - 2 * depths[ancestor]
        if walked != eccentricity[node]:
            return False
    return True


def _monotone_path_count(grid: list[list[str]]) -> int:
    """Right/down paths from (0, 0) to the bottom-right through '.' cells."""
    rows, columns = len(grid), len(grid[0])
    if grid[0][0] != "." or grid[rows - 1][columns - 1] != ".":
        return 0
    reachable = [0] * columns
    for row_index in range(rows):
        for column_index in range(columns):
            if grid[row_index][column_index] != ".":
                reachable[column_index] = 0
                continue
            if row_index == 0 and column_index == 0:
                reachable[column_index] = 1
            elif column_index > 0:
                reachable[column_index] += reachable[column_index - 1]
    return reachable[columns - 1]


def _string_grid(actual: Any, max_rows: int | None, max_columns: int | None):
    """Common shape check for '#./' grids: returns rows or None."""
    if not isinstance(actual, list) or not actual:
        return None
    if any(not isinstance(row, str) for row in actual):
        return None
    if max_rows is not None and len(actual) > max_rows:
        return None
    widths = {len(row) for row in actual}
    if len(widths) != 1 or (max_columns is not None and widths.pop() > max_columns):
        return None
    if any(set(row) - {".", "#"} for row in actual):
        return None
    return actual


def _validate_grid_paths(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """3963 Create Grid With Exactly One Path. Input is [m, n]; the output
    must be an m×n './#' grid with exactly one monotone path."""
    if not (isinstance(case_input, list) and len(case_input) >= 2):
        return False
    m, n = case_input[0], case_input[1]
    if not (_is_index(m) and _is_index(n)):
        return False
    grid = _string_grid(actual, m, n)
    if grid is None or len(grid) != m or len(grid[0]) != n:
        return False
    return _monotone_path_count(grid) == 1


def _validate_grid_k_paths(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """3988 Create Grid With Exactly K Paths I. Input is [m, n, k]; the
    output is an m×n './#' grid with exactly k monotone paths, or an empty
    array — accepted only when no such grid exists. For a 1×n or m×1 board
    the only achievable positive count is 1, so that impossibility is
    decided here; anything else is overridable via params["impossible"]."""
    if not (isinstance(case_input, list) and len(case_input) >= 3):
        return False
    m, n, k = case_input[0], case_input[1], case_input[2]
    if not all(_is_index(value) for value in (m, n, k)):
        return False
    if actual == []:
        impossible = params.get("impossible")
        if impossible is None:
            impossible = min(m, n) == 1 and k != 1
        return impossible is True
    grid = _string_grid(actual, m, n)
    if grid is None or len(grid) != m or len(grid[0]) != n:
        return False
    return _monotone_path_count(grid) == k


def _validate_grid_k_paths_free(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """3990 Create Grid With Exactly K Paths II. Input is [k]; the submission
    chooses the dimensions (at most 25×25). 1 ≤ k is always constructible, so
    an empty array is never accepted."""
    if not (isinstance(case_input, list) and len(case_input) >= 1):
        return False
    (k,) = (case_input[0],)
    if not _is_index(k):
        return False
    grid = _string_grid(actual, 25, 25)
    if grid is None:
        return False
    return _monotone_path_count(grid) == k


def _validate_rearrange_pair_order(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """3992 Rearrange String to Avoid Character Pair. Input is [s, x, y]; the
    output must be a permutation of s in which every y precedes every x."""
    if not (isinstance(case_input, list) and len(case_input) >= 3):
        return False
    source, x, y = case_input[0], case_input[1], case_input[2]
    if not all(isinstance(value, str) for value in (source, x, y)) or len(x) != 1 or len(y) != 1:
        return False
    if not isinstance(actual, str):
        return False
    if sorted(actual) != sorted(source):
        return False
    first_x = actual.find(x)
    return first_x == -1 or actual.rfind(y) < first_x


def _design_constructor_arguments(case_input: Any) -> list | None:
    if not isinstance(case_input, dict):
        return None
    params = case_input.get("params")
    if not isinstance(params, list) or not params:
        return None
    row = params[0]
    return row if isinstance(row, list) else None


def _frequency_table(actual: Any):
    if not isinstance(actual, dict) or not all(isinstance(count, int) for count in actual.values()):
        return None
    return actual


def _validate_flip_permutation(actual: Any, params: dict, case_input: Any, expected: Any) -> bool:
    """519 Random Flip Matrix. After a reset, repeating flip() exactly m×n
    times must produce every in-bounds cell exactly once — checked on the
    frequency table (keyed by the JSON of each [row, column] draw)."""
    constructor = _design_constructor_arguments(case_input)
    table = _frequency_table(actual)
    if not constructor or table is None or len(constructor) < 2:
        return False
    m, n = constructor[0], constructor[1]
    if not (_is_index(m) and _is_index(n)):
        return False
    if len(table) != m * n or sum(table.values()) != m * n:
        return False
    for key, count in table.items():
        if count != 1:
            return False
        try:
            cell = json.loads(key)
        except (TypeError, ValueError):
            return False
        if not (isinstance(cell, list) and len(cell) == 2):
            return False
        row, column = cell
        if not (_is_index(row) and _is_index(column)):
            return False
        if not (0 <= row < m and 0 <= column < n):
            return False
    return True


REGISTRY = {
    "fizzbuzz": _validate_fizzbuzz,
    "knight_tour": _validate_knight_tour,
    "grid_layout": _validate_grid_layout,
    "last_marked_nodes": _validate_last_marked_nodes,
    "grid_paths": _validate_grid_paths,
    "grid_k_paths": _validate_grid_k_paths,
    "grid_k_paths_free": _validate_grid_k_paths_free,
    "rearrange_pair_order": _validate_rearrange_pair_order,
    "flip_permutation": _validate_flip_permutation,
}


def validate(name: Any, actual: Any, params: Any, case_input: Any, expected: Any) -> bool:
    validator = REGISTRY.get(name) if isinstance(name, str) else None
    if validator is None:
        raise ValueError(f"Unknown validator: {name!r}")
    return bool(validator(actual, params if isinstance(params, dict) else {}, case_input, expected))
