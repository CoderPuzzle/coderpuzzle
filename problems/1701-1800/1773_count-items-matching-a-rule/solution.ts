function countMatches(items: string[][], ruleKey: string, ruleValue: string): number {
    // The three rule keys are exactly the three columns of every item, so
    // the key resolves once to a column index and the loop below compares
    // one fixed field of each row.
    const index = columnIndex(ruleKey);
    let matches = 0;
    for (const item of items) {
        if (item[index] === ruleValue) {
            matches++;
        }
    }
    return matches;
}

// "type" is column 0, "color" column 1, "name" column 2.
function columnIndex(ruleKey: string): number {
    if (ruleKey === "type") return 0;
    if (ruleKey === "color") return 1;
    return 2;
}
