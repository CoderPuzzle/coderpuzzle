function longestSubstring(s: string, k: number): number {
    const sweep = (budget: number): number => {
        const counts = new Map<string, number>();
        let distinct = 0;
        let qualified = 0;
        let best = 0;
        let left = 0;
        for (let right = 0; right < s.length; right++) {
            const ch = s[right];
            const prev = counts.get(ch) || 0;
            if (prev === 0) distinct += 1;
            counts.set(ch, prev + 1);
            if (prev + 1 === k) qualified += 1;
            // Growing a window never lowers its letter variety, so once the
            // window busts the budget only shrinking repairs it: left advances
            // monotonically and never backtracks.
            while (distinct > budget) {
                const drop = s[left];
                left += 1;
                if ((counts.get(drop) as number) === k) qualified -= 1;
                const next = (counts.get(drop) as number) - 1;
                counts.set(drop, next);
                if (next === 0) distinct -= 1;
            }
            // qualified never exceeds distinct, which never exceeds the budget,
            // so reaching the budget means exactly budget letters are present
            // and each has reached k. A letter rarer than k across the whole
            // string never joins qualified, so windows relying on it stay
            // unrecorded.
            if (qualified === budget) best = Math.max(best, right - left + 1);
        }
        return best;
    };
    // Every qualifying window holds between 1 and 26 distinct letters. Pin
    // that count as a budget and the window rule -- no more than budget
    // distinct letters -- becomes one two pointers can maintain.
    let best = 0;
    for (let budget = 1; budget <= 26; budget++) {
        best = Math.max(best, sweep(budget));
    }
    return best;
}
