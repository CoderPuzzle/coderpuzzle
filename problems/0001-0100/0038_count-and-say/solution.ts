function countAndSay(n: number): string {
    // The first term is fixed; each later term is the run-length encoding
    // of the one before it, so n - 1 encoding passes reach the nth term.
    let term = "1";
    for (let step = 1; step < n; ++step) {
        let next = "";
        let index = 0;
        while (index < term.length) {
            // Measure the maximal run starting at index: the group the
            // encoder must emit as <count><digit>, then skip past it.
            let run = 1;
            while (index + run < term.length && term[index + run] === term[index]) ++run;
            next += run + term[index];
            index += run;
        }
        term = next;
    }
    return term;
}
