function braceExpansionII(expression: string): string[] {
    // Iterative stack machine. cur holds the words of the concatenation so
    // far; a '{' pushes it as a saved prefix and starts a group whose
    // comma-separated alternatives accumulate in a union slot (null marks
    // "no alternatives yet"); a '}' closes the group and concatenates its
    // union onto the saved prefix.
    const stack: Array<Set<string> | null> = [];
    let cur = new Set<string>([""]);
    for (const c of expression) {
        if (c === "{") {
            stack.push(cur);
            stack.push(null); // group union slot
            cur = new Set<string>([""]);
        } else if (c === ",") {
            const top = stack[stack.length - 1];
            if (top === null) {
                stack[stack.length - 1] = cur;
            } else {
                for (const w of cur) top.add(w);
            }
            cur = new Set<string>([""]);
        } else if (c === "}") {
            const slot = stack.pop();
            let group: Set<string>;
            if (slot === null) {
                group = cur;
            } else {
                group = slot as Set<string>;
                for (const w of cur) group.add(w);
            }
            const prev = stack.pop()!;
            const next = new Set<string>();
            for (const a of prev) {
                for (const b of group) next.add(a + b);
            }
            cur = next;
        } else {
            const next = new Set<string>();
            for (const w of cur) next.add(w + c);
            cur = next;
        }
    }
    return [...cur].sort();
}
