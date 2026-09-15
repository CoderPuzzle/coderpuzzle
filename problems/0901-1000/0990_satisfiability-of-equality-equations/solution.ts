function equationsPossible(equations: string[]): boolean {
    // Each letter starts as its own class; parent[x] names its root.
    const parent = new Array<number>(26);
    for (let letter = 0; letter < 26; letter++) {
        parent[letter] = letter;
    }
    // Iterative find with path compression: chase to the root, then point
    // every visited letter straight at it.
    const find = (letter: number): number => {
        let root = letter;
        while (parent[root] !== root) {
            root = parent[root];
        }
        while (parent[letter] !== root) {
            const next = parent[letter];
            parent[letter] = root;
            letter = next;
        }
        return root;
    };
    // Pass one fuses every equality, so each class is the full set of
    // letters some chain of '==' has tied together.
    for (const equation of equations) {
        if (equation[1] === "=") {
            const left = find(equation.charCodeAt(0) - 97);
            parent[left] = find(equation.charCodeAt(3) - 97);
        }
    }
    // Pass two judges the disequalities: an inequality whose sides sit
    // in one class is unsatisfiable, since both must take one value.
    for (const equation of equations) {
        if (equation[1] === "!") {
            if (find(equation.charCodeAt(0) - 97) === find(equation.charCodeAt(3) - 97)) {
                return false;
            }
        }
    }
    return true;
}
