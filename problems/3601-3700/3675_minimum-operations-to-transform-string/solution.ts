function minOperations(s: string): number {
    // Every occurrence of the chosen letter advances one step per
    // operation, so a letter whose zero-based alphabet index is i
    // needs (26 - i) % 26 operations of its own to reach 'a'.
    // Driving the letter with the largest remaining distance lets
    // slower letters catch up, merge, and ride along, so nothing
    // beyond that largest distance is ever paid.
    let best = 0;
    for (const ch of s) {
        const need = (26 - (ch.charCodeAt(0) - 97)) % 26;
        if (need > best) {
            best = need;
        }
    }
    return best;
}
