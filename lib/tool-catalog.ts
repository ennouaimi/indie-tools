export type ToolCategory = 'Design' | 'Developer' | 'Web';

export type ToolDefinition = {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  workbenchId: string;
};

export const categories: ToolCategory[] = ['Design', 'Developer', 'Web'];

export const tools: ToolDefinition[] = [
  { id:'color-studio', name:'Color Studio', description:'Pick colors, convert formats, generate palettes, gradients and check contrast.', category:'Design', workbenchId:'color-studio' },
  { id:'palette-generator', name:'Palette Generator', description:'Create balanced palettes from a seed color.', category:'Design', workbenchId:'color-studio' },
  { id:'gradient-generator', name:'Gradient Generator', description:'Build CSS gradients visually and copy the result.', category:'Design', workbenchId:'color-studio' },

  { id:'json-formatter', name:'JSON Formatter', description:'Format, validate and minify JSON instantly.', category:'Developer', workbenchId:'json' },
  { id:'jwt-decoder', name:'JWT Decoder', description:'Inspect JWT header and payload locally.', category:'Developer', workbenchId:'jwt' },
  { id:'uuid-generator', name:'UUID Generator', description:'Generate cryptographically strong UUID v4 values.', category:'Developer', workbenchId:'uuid' },
  { id:'base64', name:'Base64', description:'Encode or decode Base64 without sending data anywhere.', category:'Developer', workbenchId:'base64' },
  { id:'url-encoder', name:'URL Encoder', description:'Encode and decode URL components.', category:'Developer', workbenchId:'url' },
  { id:'timestamp-converter', name:'Timestamp Converter', description:'Convert Unix timestamps to readable dates.', category:'Developer', workbenchId:'timestamp' },
  { id:'timezone-converter', name:'Timezone Converter', description:'Convert times between IANA timezones.', category:'Developer', workbenchId:'timezone' },
  { id:'case-converter', name:'Case Converter', description:'Convert text between camelCase, PascalCase, snake_case and kebab-case.', category:'Developer', workbenchId:'case' },
  { id:'password-generator', name:'Password Generator', description:'Generate strong random passwords in your browser.', category:'Developer', workbenchId:'password' },
  { id:'text-analyzer', name:'Text Analyzer', description:'Measure words, characters, sentences and reading time.', category:'Developer', workbenchId:'text-stats' },
  { id:'lorem-ipsum', name:'Lorem Ipsum', description:'Generate placeholder copy for mockups and prototypes.', category:'Developer', workbenchId:'lorem' },

  { id:'slug-generator', name:'Slug Generator', description:'Turn titles into clean SEO-friendly slugs.', category:'Web', workbenchId:'slug' },
];
