class Solution {
    findSecretWord(interrogator: Master, wordlist: string[]): void {
        const matches = (a: string, b: string): number => {
            let count = 0;
            const n = Math.min(a.length, b.length);
            for (let i = 0; i < n; i++) {
                if (a[i] === b[i]) {
                    count += 1;
                }
            }
            return count;
        };

        let candidates = [...wordlist];
        while (candidates.length > 0) {
            // Pick the word whose worst-case surviving group is smallest:
            // bucket every candidate by its agreement with the candidate
            // under review, and keep the candidate with the smallest largest
            // bucket (minimax elimination).
            let best = candidates[0];
            let bestWorst = candidates.length + 1;
            for (const word of candidates) {
                const groups = new Map<number, number>();
                for (const other of candidates) {
                    const score = matches(word, other);
                    groups.set(score, (groups.get(score) || 0) + 1);
                }
                let worst = 0;
                for (const group of groups.values()) {
                    worst = Math.max(worst, group);
                }
                if (worst < bestWorst) {
                    best = word;
                    bestWorst = worst;
                }
            }
            const score = interrogator.guess(best);
            if (score === best.length) {
                return;
            }
            candidates = candidates.filter((word) => matches(word, best) === score);
        }
    }
}
