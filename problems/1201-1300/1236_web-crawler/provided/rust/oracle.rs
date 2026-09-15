// Problem-provided oracle (HtmlParser), Rust side. Assembled into every
// submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the url library and the edge list as
// generic values, then the query budget.
#[allow(dead_code)]
pub struct HtmlParser {
    index: std::collections::HashMap<String, usize>,
    links: Vec<Vec<String>>,
    fetched: std::collections::BTreeSet<String>,
    budget: i64,
}

impl HtmlParser {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let raw_urls = match construction.first() {
            Some(OjValue::Array(values)) => values.clone(),
            _ => panic!("HtmlParser urls must be an array"),
        };
        let mut names: Vec<String> = Vec::with_capacity(raw_urls.len());
        for entry in raw_urls {
            match entry {
                OjValue::Str(text) => names.push(text),
                _ => panic!("HtmlParser urls must be strings"),
            }
        }
        let mut index = std::collections::HashMap::with_capacity(names.len() * 2);
        for (i, name) in names.iter().enumerate() {
            index.insert(name.clone(), i);
        }
        let mut links: Vec<Vec<String>> = vec![Vec::new(); names.len()];
        let raw_edges = match construction.get(1) {
            Some(OjValue::Array(values)) => values.clone(),
            _ => panic!("HtmlParser edges must be an array"),
        };
        for entry in raw_edges {
            let pair = match entry {
                OjValue::Array(items) if items.len() == 2 => items,
                _ => panic!("HtmlParser edges must be pairs"),
            };
            let (source, target) = match (&pair[0], &pair[1]) {
                (OjValue::Int(s), OjValue::Int(t)) => (*s as usize, *t as usize),
                _ => panic!("HtmlParser edges must be integer pairs"),
            };
            links[source].push(names[target].clone());
        }
        HtmlParser {
            index,
            links,
            fetched: std::collections::BTreeSet::new(),
            budget,
        }
    }

    /// The crawl's observable effect: every page the crawler fetched.
    pub fn verdict(&self) -> OjValue {
        OjValue::Array(self.fetched.iter().map(|url| OjValue::Str(url.clone())).collect())
    }

    pub fn get_urls(&mut self, url: &str) -> Vec<String> {
        if self.budget <= 0 {
            panic!("HtmlParser query budget exhausted");
        }
        self.budget -= 1;
        self.fetched.insert(url.to_string());
        match self.index.get(url) {
            Some(&position) => self.links[position].clone(),
            None => Vec::new(),
        }
    }
}
