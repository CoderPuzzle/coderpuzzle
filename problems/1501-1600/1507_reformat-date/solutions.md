# Solutions — Reformat Date

## Split, translate, and reassemble

The input already separates its three fields with single spaces, so
splitting on whitespace hands back the day (with its ordinal suffix
attached), the three-letter month abbreviation, and the four-digit year
as independent tokens — no scanning for digit boundaries is needed.

Each token then converts on its own. Every ordinal suffix — `st`, `nd`,
`rd`, `th` — is exactly two letters, so trimming the last two characters
off the day token always leaves the bare number, whether that number was
written with one digit or two; a token still one character after
trimming (`"1"`, `"6"`, `"9"`, ...) gets a leading zero to reach the
required width. The month name resolves through a fixed lookup table
from the twelve three-letter abbreviations to their two-digit codes,
since there is no arithmetic shortcut from `"Oct"` to `10`. The year
token needs no conversion at all — it is already four digits.

Concatenating the three converted pieces as `year-month-day` produces
the required `YYYY-MM-DD` output directly.

**Complexity:** `O(1)` time, `O(1)` space.
