function scoreOfString(s: string): number {
    let total = 0;
    for (let i = 1; i < s.length; i++) {
        total += Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1));
    }
    return total;
}
