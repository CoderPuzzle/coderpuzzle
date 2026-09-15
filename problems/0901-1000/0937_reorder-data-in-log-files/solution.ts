function reorderLogFiles(logs: string[]): string[] {
    // Split a log at its first space into identifier and content.
    const split = (log: string): [string, string] => {
        const space = log.indexOf(" ");
        return [log.slice(0, space), log.slice(space + 1)];
    };
    // Letter logs are set aside for the sort; digit logs keep their input
    // positions untouched.
    const letter: string[] = [];
    const digit: string[] = [];
    for (const log of logs) {
        const [, content] = split(log);
        // The content's first character classifies the log: a digit makes
        // it a digit-log, which the sort never touches.
        if (content[0] >= "0" && content[0] <= "9") {
            digit.push(log);
        } else {
            letter.push(log);
        }
    }
    // Letter-logs order by (content, identifier). The comparator is explicit
    // about both keys — never the default lexicographic sort — and fully
    // orders every pair, so no sort-stability assumption can leak in; the
    // digit-logs were partitioned in input order and simply follow.
    const byContentThenIdentifier = (a: string, b: string): number => {
        const [identifierA, contentA] = split(a);
        const [identifierB, contentB] = split(b);
        if (contentA !== contentB) {
            return contentA < contentB ? -1 : 1;
        }
        if (identifierA !== identifierB) {
            return identifierA < identifierB ? -1 : 1;
        }
        return 0;
    };
    letter.sort(byContentThenIdentifier);
    return letter.concat(digit);
}
