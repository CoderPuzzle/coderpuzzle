# Solutions — Crawler Log Folder

## Track the current depth

The only thing that matters for answering "how many `"../"` steps get us
back to the main folder" is how deep the current folder sits below the
main folder — never which folders are on the path. So instead of
maintaining an explicit stack of folder names, keep a single integer
`depth` starting at 0: `"../"` decreases it by one but never below zero
(matching the rule that staying at the main folder is a no-op), `"./"`
leaves it unchanged, and any other log (a folder name ending in `/`)
increases it by one.

After replaying every log this way, `depth` is exactly the number of
parent-folder moves required to walk back up to the main folder, which is
the answer.

**Complexity:** `O(n)` time, `O(1)` space.
