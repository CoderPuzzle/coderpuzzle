// The magazine is a budget: tally its letters, one slot per letter of the
// alphabet, then spend the note against that budget.
function canConstruct(ransomNote: string, magazine: string): boolean {
    const counts: number[] = new Array(26).fill(0);
    for (let i = 0; i < magazine.length; ++i) {
        counts[magazine.charCodeAt(i) - 97]++;
    }
    // A slot dipping below zero means the magazine cannot supply that
    // letter often enough — each of its letters is usable only once.
    for (let i = 0; i < ransomNote.length; ++i) {
        if (--counts[ransomNote.charCodeAt(i) - 97] < 0) return false;
    }
    return true;
}
