# Crawler Log Folder

## Description

The crawler's file system keeps a log each time a user performs a change
folder operation.

The operations are described below:

- `"../"`: Move to the parent folder of the current folder. (If you are
  already in the main folder, remain in the same folder).
- `"./"`: Remain in the same folder.
- `"x/"`: Move to the child folder named `x` (this folder is guaranteed to
  always exist).

You are given a list of strings `logs`, where `logs[i]` is the operation
performed at the `i`th step.

The file system starts in the main folder, then the operations in `logs`
are performed in order.

Return the minimum number of operations needed to go back to the main
folder after the change-folder operations.

### Example 1

![diagram](figures/1598-1.svg)

```text
Input: logs = ["d1/","d2/","../","d21/","./"]
Output: 2
Explanation: Use the "../" operation 2 times to go back to the main folder.
```

### Example 2

![diagram](figures/1598-2.svg)

```text
Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
Output: 3
```

### Example 3

```text
Input: logs = ["d1/","../","../","../"]
Output: 0
```

### Constraints

- `1 <= logs.length <= 10³`
- `2 <= logs[i].length <= 10`
- `logs[i]` contains lowercase English letters, digits, `'.'`, and `'/'`.
- `logs[i]` follows the format described above.
- Folder names consist of lowercase English letters and digits.

## Hints

### Hint 1

Simulate the process but don't move the pointer beyond the main folder.
