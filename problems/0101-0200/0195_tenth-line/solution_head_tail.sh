# Start at line ten and keep the first line of what follows. A file with
# fewer than ten lines yields an empty stream, so nothing prints — the
# short-file case is handled by the addressing, not by a guard.
tail -n +10 | head -n 1
