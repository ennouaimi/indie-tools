export type ToolCategory = 'Design' | 'Developer' | 'Web' | 'API' | 'Data' | 'Indie Hacker';

export type ToolDefinition = {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  href: string;
};

export const categories: ToolCategory[] = ['Design', 'Developer', 'Web', 'API', 'Data', 'Indie Hacker'];

export const tools: ToolDefinition[] = [
  { id:'color-studio', name:'Color Studio', description:'Pick colors, convert formats, generate palettes, gradients and check contrast.', category:'Design', href:'/workbench#color-studio' },
  { id:'palette-generator', name:'Palette Generator', description:'Create balanced palettes from a seed color.', category:'Design', href:'/workbench#color-studio' },
  { id:'gradient-generator', name:'Gradient Generator', description:'Build CSS gradients visually and copy the result.', category:'Design', href:'/workbench#color-studio' },
  { id:'favicon-generator', name:'Favicon Generator', description:'Create a favicon from initials and brand colors.', category:'Design', href:'/lab?tool=favicon-generator' },
  { id:'svg-optimizer', name:'SVG Optimizer', description:'Clean and minify SVG markup in the browser.', category:'Design', href:'/lab?tool=svg-optimizer' },
  { id:'shadow-generator', name:'Shadow Generator', description:'Design box shadows visually and export CSS.', category:'Design', href:'/lab?tool=shadow-generator' },

  { id:'json-formatter', name:'JSON Formatter', description:'Format, validate and minify JSON instantly.', category:'Developer', href:'/workbench#json' },
  { id:'jwt-decoder', name:'JWT Decoder', description:'Inspect JWT header and payload locally.', category:'Developer', href:'/workbench#jwt' },
  { id:'uuid-generator', name:'UUID Generator', description:'Generate cryptographically strong UUID v4 values.', category:'Developer', href:'/workbench#uuid' },
  { id:'base64', name:'Base64', description:'Encode or decode Base64 without sending data anywhere.', category:'Developer', href:'/workbench#base64' },
  { id:'url-encoder', name:'URL Encoder', description:'Encode and decode URL components.', category:'Developer', href:'/workbench#url' },
  { id:'timestamp-converter', name:'Timestamp Converter', description:'Convert Unix timestamps to readable dates.', category:'Developer', href:'/workbench#timestamp' },
  { id:'timezone-converter', name:'Timezone Converter', description:'Convert times between IANA timezones.', category:'Developer', href:'/workbench#timezone' },
  { id:'case-converter', name:'Case Converter', description:'Convert text between camelCase, PascalCase, snake_case and kebab-case.', category:'Developer', href:'/workbench#case' },
  { id:'password-generator', name:'Password Generator', description:'Generate strong random passwords in your browser.', category:'Developer', href:'/workbench#password' },
  { id:'text-analyzer', name:'Text Analyzer', description:'Measure words, characters, sentences and reading time.', category:'Developer', href:'/workbench#text-stats' },
  { id:'lorem-ipsum', name:'Lorem Ipsum', description:'Generate placeholder copy for mockups and prototypes.', category:'Developer', href:'/workbench#lorem' },
  { id:'regex-tester', name:'Regex Tester', description:'Test regular expressions and inspect matches.', category:'Developer', href:'/lab?tool=regex-tester' },
  { id:'hash-generator', name:'Hash Generator', description:'Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes locally.', category:'Developer', href:'/lab?tool=hash-generator' },

  { id:'slug-generator', name:'Slug Generator', description:'Turn titles into clean SEO-friendly slugs.', category:'Web', href:'/workbench#slug' },
  { id:'opengraph-preview', name:'OpenGraph Preview', description:'Preview how a page may look when shared.', category:'Web', href:'/lab?tool=opengraph-preview' },
  { id:'meta-tags', name:'Meta Tags Generator', description:'Generate SEO and social metadata.', category:'Web', href:'/lab?tool=meta-tags' },
  { id:'robots-txt', name:'robots.txt Generator', description:'Build a robots.txt file without memorizing directives.', category:'Web', href:'/lab?tool=robots-txt' },
  { id:'json-ld', name:'JSON-LD Generator', description:'Generate structured data snippets for common schemas.', category:'Web', href:'/lab?tool=json-ld' },
  { id:'utm-builder', name:'UTM Builder', description:'Create tagged campaign URLs quickly.', category:'Web', href:'/lab?tool=utm-builder' },

  { id:'curl-converter', name:'cURL Converter', description:'Convert common cURL commands into fetch or Axios snippets.', category:'API', href:'/lab?tool=curl-converter' },
  { id:'http-status', name:'HTTP Status Reference', description:'Search common HTTP status codes and meanings.', category:'API', href:'/lab?tool=http-status' },
  { id:'jsonpath-tester', name:'JSONPath Tester', description:'Run simple JSON paths against sample JSON.', category:'API', href:'/lab?tool=jsonpath-tester' },
  { id:'headers-inspector', name:'Headers Inspector', description:'Parse and normalize raw HTTP headers.', category:'API', href:'/lab?tool=headers-inspector' },
  { id:'webhook-tester', name:'Webhook Payload Tester', description:'Pretty-print webhook payloads and generate HMAC SHA-256 signatures.', category:'API', href:'/lab?tool=webhook-tester' },

  { id:'csv-json', name:'CSV ↔ JSON', description:'Convert CSV data to JSON and back.', category:'Data', href:'/lab?tool=csv-json' },
  { id:'yaml-json', name:'YAML ↔ JSON', description:'Convert simple YAML and JSON locally.', category:'Data', href:'/lab?tool=yaml-json' },
  { id:'xml-json', name:'XML → JSON', description:'Convert XML documents into JSON.', category:'Data', href:'/lab?tool=xml-json' },
  { id:'sql-formatter', name:'SQL Formatter', description:'Format common SQL clauses into readable queries.', category:'Data', href:'/lab?tool=sql-formatter' },
  { id:'fake-data', name:'Fake Data Generator', description:'Generate deterministic development fixtures locally.', category:'Data', href:'/lab?tool=fake-data' },

  { id:'mrr-calculator', name:'MRR Calculator', description:'Calculate monthly recurring revenue.', category:'Indie Hacker', href:'/lab?tool=mrr-calculator' },
  { id:'arr-calculator', name:'ARR Calculator', description:'Translate recurring revenue into annual run rate.', category:'Indie Hacker', href:'/lab?tool=arr-calculator' },
  { id:'churn-calculator', name:'Churn Calculator', description:'Measure customer churn percentage.', category:'Indie Hacker', href:'/lab?tool=churn-calculator' },
  { id:'ltv-calculator', name:'LTV Calculator', description:'Estimate customer lifetime value from ARPU and churn.', category:'Indie Hacker', href:'/lab?tool=ltv-calculator' },
  { id:'pricing-calculator', name:'SaaS Pricing Calculator', description:'Compare price, customer count and fixed costs.', category:'Indie Hacker', href:'/lab?tool=pricing-calculator' },
  { id:'stripe-fees', name:'Stripe Fee Calculator', description:'Estimate payment fees and net revenue with custom rates.', category:'Indie Hacker', href:'/lab?tool=stripe-fees' },
  { id:'break-even', name:'Break-even Calculator', description:'Estimate customers needed to cover monthly costs.', category:'Indie Hacker', href:'/lab?tool=break-even' },
];
