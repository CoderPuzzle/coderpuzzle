function crackSafe(n: number, k: number): string {
    // Iterative Hierholzer over the de Bruijn graph: nodes are (n-1)-digit
    // strings (as base-k integers), edges are the k^n passwords. Digits are
    // tried in ascending order, matching the reference's deterministic walk.
    const total = Math.pow(k, n);
    const seen = new Array<boolean>(total).fill(false);
    const shift = Math.pow(k, n - 1);
    let out = "";
    const nodeStack: number[] = [0];
    const digitStack: number[] = [0]; // digit used to enter each stacked node
    while (nodeStack.length > 0) {
        const node = nodeStack[nodeStack.length - 1];
        let nxt = -1;
        for (let x = 0; x < k; x++) {
            const e = node * k + x;
            if (!seen[e]) {
                seen[e] = true;
                nxt = x;
                break;
            }
        }
        if (nxt >= 0) {
            nodeStack.push((node * k + nxt) % shift);
            digitStack.push(nxt);
        } else {
            nodeStack.pop();
            const d = digitStack.pop()!;
            if (nodeStack.length > 0) {
                out += String(d);
            }
        }
    }
    return out + "0".repeat(n - 1);
}
