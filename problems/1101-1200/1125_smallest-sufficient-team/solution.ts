function smallestSufficientTeam(req_skills: string[], people: string[][]): number[] {
    const skillIndex = new Map<string, number>();
    for (let i = 0; i < req_skills.length; i++) skillIndex.set(req_skills[i], i);

    const np = people.length;
    // compress each person to the bitmask of skills they contribute
    const masks: number[] = new Array(np).fill(0);
    for (let i = 0; i < np; i++) {
        for (const skill of people[i]) masks[i] |= 1 << skillIndex.get(skill)!;
    }

    const full = (1 << req_skills.length) - 1;

    // Map preserves insertion order (set on an existing key keeps its position).
    // dp maps each covered-skill mask to the smallest team achieving it.
    const dp = new Map<number, number[]>();
    dp.set(0, []);

    // people are processed in index order, so every subset of people is
    // tried as a candidate team; newEntries buffers the round so person i
    // cannot be added twice to the same chain
    for (let i = 0; i < np; i++) {
        const snapshot = Array.from(dp.entries());
        const newEntries = new Map<number, number[]>();
        for (const [state, team] of snapshot) {
            const newState = state | masks[i];
            const candidate = team.concat([i]);
            const cur = dp.get(newState);
            // keep the candidate only when it beats the recorded team
            if (cur === undefined || cur.length > candidate.length) {
                const pending = newEntries.get(newState);
                if (pending === undefined || pending.length > candidate.length) {
                    newEntries.set(newState, candidate);
                }
            }
        }
        for (const [k, v] of newEntries) dp.set(k, v);
    }

    // team covering every required skill, sorted for a deterministic order
    const res = dp.get(full)!.slice();
    res.sort((a, b) => a - b);
    return res;
}
