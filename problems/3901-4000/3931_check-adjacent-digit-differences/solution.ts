function isAdjacentDiffAtMostTwo(s: string): boolean {
    for (let i = 1; i < s.length; i++) {
        if (Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1)) > 2) return false;
    }
    return true;
}
