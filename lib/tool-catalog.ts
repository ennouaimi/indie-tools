export type ToolCategory = 'Design' | 'Developer' | 'Web' | 'API' | 'Data' | 'Indie Hacker';

export type ToolDefinition = {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  status: 'available' | 'planned';
  workbenchId?: string;
};

export const categories: ToolCategory[] = ['Design', 'Developer', 'Web', 'API', 'Data', 'Indie Hacker'];

export const tools: ToolDefinition[] = [
  { id:'color-studio', name:'Color Studio', description:'Pick colors, convert formats, generate palettes, gradients and check contrast.', category:'Design', status:'available', workbenchId:'color-studio' },
  { id:'palette-generator', name:'Palette Generator', description:'Create balanced palettes from a seed color.', category:'Design', status:'available', workbenchId:'color-studio' },
  { id:'gradient-generator', name:'Gradient Generator', description:'Build CSS gradients visually and copy the result.', category:'Design', status:'available', workbenchId:'color-studio' },
  { id:'favicon-generator', name:'Favicon Generator', description:'Create a favicon set from text, emoji or an image.', category:'Design', status:'planned' },
  { id:'svg-optimizer', name:'SVG Optimizer', description:'Clean and minify SVG markup in the browser.', category:'Design', status:'planned' },
  { id:'shadow-generator', name:'Shadow Generator', description:'Design box shadows visually and export CSS.', category:'Design', status:'planned' },

  { id:'json-formatter', name:'JSON Formatter', description:'Format, validate and minify JSON instantly.', category:'Developer', status:'available', workbenchId:'json' },
  { id:'jwt-decoder', name:'JWT Decoder', description:'Inspect JWT header and payload locally.', category:'Developer', status:'available', workbenchId:'jwt' },
  { id:'uuid-generator', name:'UUID Generator', description:'Generate cryptographically strong UUID v4 values.', category:'Developer', status:'available', workbenchId:'uuid' },
  { id:'base64', name:'Base64', description:'Encode or decode Base64 without sending data anywhere.', category:'Developer', status:'available', workbenchId:'base64' },
  { id:'url-encoder', name:'URL Encoder', description:'Encode and decode URL components.', category:'Developer', status:'available', workbenchId:'url' },
  { id:'timestamp-converter', name:'Timestamp Converter', description:'Convert Unix timestamps to readable dates.', category:'Developer', status:'available', workbenchId:'timestamp' },
  { id:'timezone-converter', name:'Timezone Converter', description:'Convert times between IANA timezones.', category:'Developer', status:'available', workbenchId:'timezone' },
  { id:'regex-tester', name:'Regex Tester', description:'Test regular expressions with live highlighting.', category:'Developer', status:'planned' },
  { id:'hash-generator', name:'Hash Generator', description:'Generate SHA hashes locally in the browser.', category:'Developer', status:'planned' },

  { id:'slug-generator', name:'Slug Generator', description:'Turn titles into clean SEO-friendly slugs.', category:'Web', status:'available', workbenchId:'slug' },
  { id:'opengraph-preview', name:'OpenGraph Preview', description:'Preview how a page may look when shared.', category:'Web', status:'planned' },
  { id:'meta-tags', name:'Meta Tags Generator', description:'Generate title, description and social metadata.', category:'Web', status:'planned' },
  { id:'robots-txt', name:'robots.txt Generator', description:'Build a robots.txt file without memorizing directives.', category:'Web', status:'planned' },
  { id:'json-ld', name:'JSON-LD Generator', description:'Generate structured data snippets for common schemas.', category:'Web', status:'planned' },
  { id:'utm-builder', name:'UTM Builder', description:'Create tagged campaign URLs quickly.', category:'Web', status:'planned' },

  { id:'curl-converter', name:'cURL Converter', description:'Convert cURL commands into fetch or Axios snippets.', category:'API', status:'planned' },
  { id:'http-status', name:'HTTP Status Reference', description:'Search status codes and their meanings.', category:'API', status:'planned' },
  { id:'jsonpath-tester', name:'JSONPath Tester', description:'Run JSONPath expressions against sample JSON.', category:'API', status:'planned' },
  { id:'headers-inspector', name:'Headers Inspector', description:'Understand and format HTTP headers.', category:'API', status:'planned' },
  { id:'webhook-tester', name:'Webhook Tester', description:'Inspect and replay webhook payloads.', category:'API', status:'planned' },

  { id:'csv-json', name:'CSV ↔ JSON', description:'Convert tabular CSV data to JSON and back.', category:'Data', status:'planned' },
  { id:'yaml-json', name:'YAML ↔ JSON', description:'Convert YAML and JSON while preserving structure.', category:'Data', status:'planned' },
  { id:'xml-json', name:'XML ↔ JSON', description:'Convert between XML and JSON.', category:'Data', status:'planned' },
  { id:'sql-formatter', name:'SQL Formatter', description:'Format SQL into readable, consistent queries.', category:'Data', status:'planned' },
  { id:'fake-data', name:'Fake Data Generator', description:'Generate realistic development fixtures locally.', category:'Data', status:'planned' },

  { id:'mrr-calculator', name:'MRR Calculator', description:'Calculate recurring revenue from plans and customers.', category:'Indie Hacker', status:'planned' },
  { id:'arr-calculator', name:'ARR Calculator', description:'Translate recurring revenue into annual run rate.', category:'Indie Hacker', status:'planned' },
  { id:'churn-calculator', name:'Churn Calculator', description:'Measure customer and revenue churn.', category:'Indie Hacker', status:'planned' },
  { id:'ltv-calculator', name:'LTV Calculator', description:'Estimate customer lifetime value.', category:'Indie Hacker', status:'planned' },
  { id:'pricing-calculator', name:'SaaS Pricing Calculator', description:'Compare pricing scenarios and revenue outcomes.', category:'Indie Hacker', status:'planned' },
  { id:'stripe-fees', name:'Stripe Fee Calculator', description:'Estimate payment fees and net revenue.', category:'Indie Hacker', status:'planned' },
  { id:'break-even', name:'Break-even Calculator', description:'Find the customer or revenue point where costs are covered.', category:'Indie Hacker', status:'planned' },
];
