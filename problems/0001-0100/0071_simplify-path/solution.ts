function simplifyPath(path: string): string {
    // Splitting on "/" turns repeated and edge slashes into empty segments
    // and hands each directory to the loop as one candidate, so only the
    // dot rules remain to apply.
    const stack: string[] = [];
    for (const segment of path.split("/")) {
        if (segment === "..") {
            // One level up: drop the last name pushed. An empty stack is
            // the root, where going up is not possible, and popping an
            // empty array is a harmless no-op.
            stack.pop();
        } else if (segment !== "." && segment !== "") {
            // "." is the current directory, "" a repeated or edge slash;
            // every other segment, "..." and "...." included, is a name.
            stack.push(segment);
        }
    }
    // A leading slash plus exactly one slash between the survivors; an
    // empty array joins to the bare leading slash of the root.
    return "/" + stack.join("/");
}
