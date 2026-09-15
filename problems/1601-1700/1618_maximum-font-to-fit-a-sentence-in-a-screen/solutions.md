# Solutions — Maximum Font to Fit a Sentence in a Screen

## Binary search over the sorted font sizes

Fitting is monotonic: because both `widths` and `heights` only grow as the
font index increases, once a font size stops fitting, every larger size
also fails, and once a size fits, every smaller size also fits. That turns
the search for "the largest fitting size" into finding the boundary in a
sorted array, which binary search locates directly instead of scanning
every size.

For a candidate index `mid`, checking fit is a single linear pass: bail out
immediately if the line height at that font exceeds `h`, otherwise sum
`widths[mid][ch - 'a']` over every character of `text`, stopping early the
moment the running total exceeds `w`. If the candidate fits, it becomes the
current answer and the search moves right looking for something larger; if
it does not, the search moves left. The loop ends with the best fitting
font size found, or `-1` if the smallest available size never fits.

**Complexity:** `O(text.length * log(fonts.length))` time,
`O(1)` extra space (beyond the input tables).
