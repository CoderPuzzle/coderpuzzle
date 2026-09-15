# The classic pipeline: normalize every run of whitespace into a newline
# so the file becomes one word per line, sort to bring equal words
# together, collapse each run with uniq -c, order by the descending
# count, and flip uniq's "count word" output into "word count".
tr -s '[:space:]' '\n' | grep -v '^$' | sort | uniq -c | sort -rn |
    while read -r count word; do
        printf '%s %s\n' "$word" "$count"
    done
