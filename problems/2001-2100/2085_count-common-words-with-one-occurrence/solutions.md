# Solutions — Count Common Words With One Occurrence

## Two frequency maps

Count every word in each array with a separate hash map. Then inspect the words from the first map and add one exactly when its count is one there and the second map also stores a count of one.

Repeated words on either side are therefore excluded, while words absent from the other array naturally have a zero frequency and are excluded as well.

**Complexity:** `O(C)` expected time and `O(C)` space, where `C` is the total number of characters across both arrays.
