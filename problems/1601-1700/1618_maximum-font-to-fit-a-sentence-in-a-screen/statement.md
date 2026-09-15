# Maximum Font to Fit a Sentence in a Screen

## Description

You want to display a sentence `text` on a screen of width `w` and height
`h`. You may render it using any one font size drawn from `fonts`, an array
of the available sizes given in ascending order. The sentence is always
drawn on a single line.

At a given font size, every lowercase letter has its own on-screen width,
and the whole line has a single height that also depends only on the font
size. The rendered width of `text` at some font size is the sum of the
individual widths of its characters at that size, and the rendered height
is that size's line height. A font size **fits** when the rendered width is
at most `w` and the rendered height is at most `h`.

Return the largest font size in `fonts` that fits `text` on the screen. If
no font size in `fonts` fits, return `-1`.

The two tables below carry the same information the original interactive
"font metrics" interface would answer through per-character queries, but
made explicit as plain data — since every answer it can give is fixed in
advance, listing them directly is equivalent and avoids modeling a live
query object:

- `widths[i][c]` is the on-screen width of the letter `'a' + c` (so
  `c = 0` is `'a'`, `c = 25` is `'z'`) when rendered at font size
  `fonts[i]`.
- `heights[i]` is the line height at font size `fonts[i]`.

Both tables are guaranteed **monotonic** in the font index: for every valid
`i`, `widths[i][c] <= widths[i + 1][c]` for every letter `c`, and
`heights[i] <= heights[i + 1]`. In other words, moving to a larger font
size never shrinks any character's width or the line height — the same
guarantee the original metrics interface makes, which is exactly what lets
a binary search over `fonts` work: once a font size stops fitting, every
larger one stops fitting too.

### Example 1

```text
Input:
  text = "helloworld"
  w = 45, h = 12
  fonts = [6, 8, 12, 16]
  widths = [[2]*26, [3]*26, [4]*26, [6]*26]   (every letter shares one width per font size here)
  heights = [6, 8, 10, 14]
Output: 12
Explanation:
  Font 6:  width = 10*2 = 20 <= 45, height = 6  <= 12 -> fits
  Font 8:  width = 10*3 = 30 <= 45, height = 8  <= 12 -> fits
  Font 12: width = 10*4 = 40 <= 45, height = 10 <= 12 -> fits
  Font 16: width = 10*6 = 60 >  45                    -> does not fit
  The largest fitting size is 12.
```

### Example 2

```text
Input:
  text = "leetcode"
  w = 100, h = 50
  fonts = [1, 2, 4]
  widths = [[1]*26, [3]*26, [9]*26]
  heights = [2, 5, 10]
Output: 4
Explanation: All three sizes fit (widths 8, 24, 72 and heights 2, 5, 10
  are each within 100 and 50), so the largest, 4, is returned.
```

### Example 3

```text
Input:
  text = "easyquestion"
  w = 100, h = 100
  fonts = [10, 15, 20, 25]
  widths = [[9]*26, [14]*26, [20]*26, [30]*26]
  heights = [11, 16, 22, 33]
Output: -1
Explanation: Even the smallest font, 10, renders at width
  12*9 = 108 > 100, so it does not fit, and neither does any larger size.
```

### Constraints

- `1 <= text.length <= 2000`
- `text` contains only lowercase English letters.
- `1 <= w <= 20000`
- `1 <= h <= 2000`
- `1 <= fonts.length <= 500`
- `fonts` is sorted in strictly ascending order and contains no duplicates.
- `1 <= fonts[i] <= 100000`
- `widths.length == fonts.length`, and `widths[i].length == 26` for every
  `i` (one width per lowercase letter).
- `1 <= widths[i][c] <= 1000`
- `heights.length == fonts.length`
- `1 <= heights[i] <= 1000`
- For every `0 <= i < fonts.length - 1` and every `0 <= c <= 25`:
  `widths[i][c] <= widths[i + 1][c]` and `heights[i] <= heights[i + 1]`.

## Hints

### Hint 1

Fitting is monotonic in font size: if a size doesn't fit, no larger size
does either. That turns "find the largest size that fits" into a search
over a sorted boundary.

### Hint 2

Binary search the index into `fonts`. For a candidate index, checking fit
costs `O(text.length)`: sum each character's width at that font and
compare against `w` and `h`.
