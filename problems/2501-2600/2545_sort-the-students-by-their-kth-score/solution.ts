// Sort the rows by their column-k entry, largest first: extracting a
// comparison key is O(1) row indexing. Scores are pairwise distinct
// across the whole matrix, so ties never occur and comparator stability
// is irrelevant to the outcome. Returns a new array; the input is left
// untouched.
function sortTheStudents(score: number[][], k: number): number[][] {
    return score.slice().sort((a, b) => b[k] - a[k]);
}
