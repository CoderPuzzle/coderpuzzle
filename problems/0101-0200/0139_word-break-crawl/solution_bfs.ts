function wordBreak(s: string, wordDict: string[]): boolean {
    const words = new Set(wordDict);
    const n = s.length;
    // Only entries short enough to fit can ever be a next piece.
    let maxLen = 0;
    for (const word of wordDict) {
        maxLen = Math.max(maxLen, word.length);
    }
    // BFS over start indices: start positions reachable by segmenting a
    // prefix of s. visited keeps each index enqueued at most once.
    const visited: boolean[] = new Array(n + 1).fill(false);
    visited[0] = true;
    const queue: number[] = [0];
    for (let head = 0; head < queue.length; head++) {
        const i = queue[head];
        // Try every wordDict entry as the next piece s.substring(i, i+L).
        const limit = Math.min(maxLen, n - i);
        for (let length = 1; length <= limit; length++) {
            if (words.has(s.substring(i, i + length))) {
                const end = i + length;
                // Reaching the far end means the whole string segments.
                if (end === n) {
                    return true;
                }
                if (!visited[end]) {
                    visited[end] = true;
                    queue.push(end);
                }
            }
        }
    }
    // No reachable start ever crossed the finish line.
    return false;
}
