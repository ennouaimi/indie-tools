import Head from 'next/head';
import { useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Braces,
  CaseSensitive,
  Check,
  Clock3,
  Code2,
  Copy,
  Fingerprint,
  Gauge,
  Hash,
  KeyRound,
  Link2,
  PaintBucket,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Type,
  Wand2,
} from 'lucide-react';

type ToolId =
  | 'color-converter'
  | 'color-picker'
  | 'gradient'
  | 'contrast'
  | 'json'
  | 'base64'
  | 'url'
  | 'uuid'
  | 'slug'
  | 'case'
  | 'timestamp'
  | 'password'
  | 'text-stats'
  | 'jwt'
  | 'lorem';

type Category = 'All' | 'Design' | 'Dev' | 'Text' | 'Security';

type Tool = {
  id: ToolId;
  name: string;
  description: string;
  category: Exclude<Category, 'All'>;
  icon: typeof Palette;
};

const tools: Tool[] = [
  { id: 'color-converter', name: 'Color converter', description: 'HEX, RGB & HSL', category: 'Design', icon: ArrowRightLeft },
  { id: 'color-picker', name: 'Color picker', description: 'Pick and copy colors', category: 'Design', icon: PaintBucket },
  { id: 'gradient', name: 'Gradient generator', description: 'CSS gradients', category: 'Design', icon: Wand2 },
  { id: 'contrast', name: 'Contrast checker', description: 'WCAG ratio', category: 'Design', icon: Gauge },
  { id: 'json', name: 'JSON formatter', description: 'Pretty print & minify', category: 'Dev', icon: Braces },
  { id: 'base64', name: 'Base64', description: 'Encode & decode', category: 'Dev', icon: Code2 },
  { id: 'url', name: 'URL encoder', description: 'Encode & decode URLs', category: 'Dev', icon: Link2 },
  { id: 'uuid', name: 'UUID generator', description: 'Generate UUID v4', category: 'Dev', icon: Fingerprint },
  { id: 'slug', name: 'Slug generator', description: 'SEO-friendly slugs', category: 'Text', icon: Hash },
  { id: 'case', name: 'Case converter', description: 'camel, snake, kebab…', category: 'Text', icon: CaseSensitive },
  { id: 'timestamp', name: 'Timestamp converter', description: 'Unix ↔ date', category: 'Dev', icon: Clock3 },
  { id: 'password', name: 'Password generator', description: 'Strong random passwords', category: 'Security', icon: KeyRound },
  { id: 'text-stats', name: 'Text analyzer', description: 'Words, chars & reading time', category: 'Text', icon: Type },
  { id: 'jwt', name: 'JWT decoder', description: 'Inspect JWT payloads', category: 'Security', icon: ShieldCheck },
  { id: 'lorem', name: 'Lorem ipsum', description: 'Placeholder copy', category: 'Text', icon: Sparkles },
];

const toolCopy: Record<ToolId, { title: string; description: string }> = {
  'color-converter': { title: 'Color converter', description: 'Convert a color between HEX, RGB and HSL without leaving the browser.' },
  'color-picker': { title: 'Color picker', description: 'Choose a color visually and copy its HEX, RGB or HSL value.' },
  gradient: { title: 'Gradient generator', description: 'Build polished linear gradients and copy production-ready CSS.' },
  contrast: { title: 'Contrast checker', description: 'Check foreground and background contrast against WCAG thresholds.' },
  json: { title: 'JSON formatter', description: 'Format, validate or minify JSON instantly.' },
  base64: { title: 'Base64 encoder / decoder', description: 'Encode plain text to Base64 or decode Base64 to text.' },
  url: { title: 'URL encoder / decoder', description: 'Safely encode or decode URL components.' },
  uuid: { title: 'UUID generator', description: 'Generate cryptographically strong UUID v4 identifiers.' },
  slug: { title: 'Slug generator', description: 'Turn any title into a clean, shareable and SEO-friendly slug.' },
  case: { title: 'Case converter', description: 'Convert text between camelCase, PascalCase, snake_case and kebab-case.' },
  timestamp: { title: 'Timestamp converter', description: 'Translate Unix timestamps into readable local and UTC dates.' },
  password: { title: 'Password generator', description: 'Generate strong passwords with fine-grained character controls.' },
  'text-stats': { title: 'Text analyzer', description: 'Measure words, characters, sentences and estimated reading time.' },
  jwt: { title: 'JWT decoder', description: 'Inspect JWT header and payload locally. No token ever leaves your browser.' },
  lorem: { title: 'Lorem ipsum generator', description: 'Generate clean placeholder copy for mockups and prototypes.' },
};

function copy(value: string) {
  if (typeof navigator !== 'undefined') navigator.clipboard.writeText(value);
}

function hexToRgb(hex: string) {
  const raw = hex.replace('#', '').trim();
  const normalized = raw.length === 3 ? raw.split('').map((x) => x + x).join('') : raw;
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (value: number) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0').toUpperCase();
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > .5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      default: h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function luminance(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const values = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255;
    return s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
  });
  return .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
}

function contrastRatio(a: string, b: string) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
}

function randomUuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const r = Math.random() * 16 | 0;
    const v = char === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function toWords(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

function ToolOutput({ value }: { value: string }) {
  return <div className="output">{value || '—'}<button className="copy-btn" onClick={() => copy(value)}><Copy size={13} /> Copy</button></div>;
}

function ColorConverter() {
  const [hex, setHex] = useState('#9CFF57');
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  return <div className="grid-2"><div className="card"><div className="field"><label>HEX color</label><input value={hex} onChange={(e) => setHex(e.target.value)} /></div><div className="actions"><button className="primary-btn" onClick={() => copy(hex.toUpperCase())}>Copy HEX</button></div></div><div className="card">{rgb ? <><div className="swatch" style={{background: hex}}><span className="swatch-code">{hex.toUpperCase()}</span></div><div className="section-label">Conversions</div><ToolOutput value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} /><div style={{height:8}} /><ToolOutput value={`hsl(${hsl!.h}, ${hsl!.s}%, ${hsl!.l}%)`} /></> : <div className="empty-state">Enter a valid 3 or 6 digit HEX color.</div>}</div></div>;
}

function ColorPicker() {
  const [color, setColor] = useState('#62E7FF');
  const rgb = hexToRgb(color)!; const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return <div className="grid-2"><div className="card"><div className="field"><label>Pick a color</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{height:110,padding:8}} /></div><div className="field"><label>HEX</label><input value={color.toUpperCase()} onChange={(e) => setColor(e.target.value)} /></div></div><div className="card"><div className="swatch" style={{background:color}}><span className="swatch-code">{color.toUpperCase()}</span></div><div className="section-label">Values</div><ToolOutput value={color.toUpperCase()} /><div style={{height:8}} /><ToolOutput value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} /><div style={{height:8}} /><ToolOutput value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} /></div></div>;
}

function GradientGenerator() {
  const [a, setA] = useState('#9CFF57'); const [b, setB] = useState('#62E7FF'); const [angle, setAngle] = useState(135);
  const css = `linear-gradient(${angle}deg, ${a}, ${b})`;
  return <div className="grid-2"><div className="card"><div className="grid-2"><div className="field"><label>Start</label><input type="color" value={a} onChange={(e)=>setA(e.target.value)} /></div><div className="field"><label>End</label><input type="color" value={b} onChange={(e)=>setB(e.target.value)} /></div></div><div className="field"><label>Angle · {angle}°</label><div className="range-row"><input type="range" min="0" max="360" value={angle} onChange={(e)=>setAngle(+e.target.value)} /><input type="number" value={angle} onChange={(e)=>setAngle(+e.target.value)} /></div></div><ToolOutput value={`background: ${css};`} /></div><div className="card"><div className="gradient-preview" style={{background:css}} /></div></div>;
}

function ContrastChecker() {
  const [fg,setFg]=useState('#F7F8FB'); const [bg,setBg]=useState('#0B0D12'); const ratio=contrastRatio(fg,bg);
  const aa=ratio>=4.5, aaa=ratio>=7;
  return <div className="grid-2"><div className="card"><div className="grid-2"><div className="field"><label>Text</label><input type="color" value={fg} onChange={(e)=>setFg(e.target.value)} /></div><div className="field"><label>Background</label><input type="color" value={bg} onChange={(e)=>setBg(e.target.value)} /></div></div><div className="grid-3"><div className="metric"><strong>{ratio.toFixed(2)}:1</strong><span>Contrast ratio</span></div><div className="metric"><strong>{aa?'Pass':'Fail'}</strong><span>WCAG AA</span></div><div className="metric"><strong>{aaa?'Pass':'Fail'}</strong><span>WCAG AAA</span></div></div></div><div className="card"><div className="contrast-preview" style={{color:fg,background:bg}}><h3>Ship with confidence.</h3><p>This preview uses your foreground and background colors.</p><div className="contrast-score"><span className={`pill ${aa?'good':'bad'}`}>AA {aa?'passes':'fails'}</span><span className={`pill ${aaa?'good':'bad'}`}>AAA {aaa?'passes':'fails'}</span></div></div></div></div>;
}

function JsonFormatter() {
  const [input,setInput]=useState('{"name":"IndieKit","shipFast":true,"tools":15}'); const [output,setOutput]=useState(''); const [error,setError]=useState('');
  const run=(minify=false)=>{try{const parsed=JSON.parse(input);setOutput(JSON.stringify(parsed,null,minify?0:2));setError('')}catch(e){setError(e instanceof Error?e.message:'Invalid JSON');setOutput('')}};
  return <div className="grid-2"><div className="card"><div className="field"><label>Input</label><textarea value={input} onChange={(e)=>setInput(e.target.value)} /></div><div className="actions"><button className="primary-btn" onClick={()=>run(false)}>Format</button><button className="ghost-btn" onClick={()=>run(true)}>Minify</button></div>{error&&<p style={{color:'#ff9f9f'}}>{error}</p>}</div><div className="card"><label className="section-label">Output</label><ToolOutput value={output} /></div></div>;
}

function Base64Tool() {
  const [input,setInput]=useState('Ship useful things.'); const [output,setOutput]=useState('');
  const encode=()=>{try{setOutput(btoa(unescape(encodeURIComponent(input))))}catch{setOutput('Unable to encode input.')}};
  const decode=()=>{try{setOutput(decodeURIComponent(escape(atob(input))))}catch{setOutput('Invalid Base64 input.')}};
  return <SimpleTransform input={input} setInput={setInput} output={output} primaryLabel="Encode" secondaryLabel="Decode" onPrimary={encode} onSecondary={decode} />;
}

function UrlTool() {
  const [input,setInput]=useState('https://example.com/?q=indie tools'); const [output,setOutput]=useState('');
  return <SimpleTransform input={input} setInput={setInput} output={output} primaryLabel="Encode" secondaryLabel="Decode" onPrimary={()=>setOutput(encodeURIComponent(input))} onSecondary={()=>{try{setOutput(decodeURIComponent(input))}catch{setOutput('Invalid URL encoded input.')}}} />;
}

function SimpleTransform({input,setInput,output,primaryLabel,secondaryLabel,onPrimary,onSecondary}:{input:string;setInput:(v:string)=>void;output:string;primaryLabel:string;secondaryLabel:string;onPrimary:()=>void;onSecondary:()=>void}) {
  return <div className="grid-2"><div className="card"><div className="field"><label>Input</label><textarea value={input} onChange={(e)=>setInput(e.target.value)} /></div><div className="actions"><button className="primary-btn" onClick={onPrimary}>{primaryLabel}</button><button className="ghost-btn" onClick={onSecondary}>{secondaryLabel}</button></div></div><div className="card"><div className="section-label">Result</div><ToolOutput value={output} /></div></div>;
}

function UuidGenerator() {
  const [count,setCount]=useState(5); const [values,setValues]=useState<string[]>(()=>Array.from({length:5},randomUuid));
  const generate=()=>setValues(Array.from({length:Math.max(1,Math.min(50,count))},randomUuid));
  return <div className="grid-2"><div className="card"><div className="field"><label>How many UUIDs?</label><input type="number" min="1" max="50" value={count} onChange={(e)=>setCount(+e.target.value)} /></div><button className="primary-btn" onClick={generate}>Generate UUIDs</button></div><div className="card"><ToolOutput value={values.join('\n')} /></div></div>;
}

function SlugGenerator() {
  const [input,setInput]=useState('The Indie Hacker Shipping Checklist');
  const slug=input.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  return <div className="grid-2"><div className="card"><div className="field"><label>Title or phrase</label><textarea value={input} onChange={(e)=>setInput(e.target.value)} /></div></div><div className="card"><div className="section-label">Slug</div><ToolOutput value={slug} /></div></div>;
}

function CaseConverter() {
  const [input,setInput]=useState('launch faster with indie tools'); const words=toWords(input);
  const variants={camel: words.map((w,i)=>i?w[0]?.toUpperCase()+w.slice(1):w).join(''),pascal:words.map(w=>w[0]?.toUpperCase()+w.slice(1)).join(''),snake:words.join('_'),kebab:words.join('-'),constant:words.join('_').toUpperCase(),title:words.map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ')};
  return <div className="grid-2"><div className="card"><div className="field"><label>Text</label><textarea value={input} onChange={(e)=>setInput(e.target.value)} /></div></div><div className="card">{Object.entries(variants).map(([key,value])=><div key={key} style={{marginBottom:10}}><div className="section-label" style={{margin:'0 0 6px'}}>{key}</div><ToolOutput value={value} /></div>)}</div></div>;
}

function TimestampConverter() {
  const [timestamp,setTimestamp]=useState(()=>Math.floor(Date.now()/1000).toString()); const numeric=Number(timestamp); const ms=timestamp.length<=10?numeric*1000:numeric; const date=Number.isFinite(ms)?new Date(ms):null; const valid=date&&!isNaN(date.getTime());
  return <div className="grid-2"><div className="card"><div className="field"><label>Unix timestamp (seconds or milliseconds)</label><input value={timestamp} onChange={(e)=>setTimestamp(e.target.value)} /></div><button className="ghost-btn" onClick={()=>setTimestamp(Math.floor(Date.now()/1000).toString())}>Use current time</button></div><div className="card">{valid?<><div className="section-label">Local</div><ToolOutput value={date.toLocaleString()} /><div className="section-label">UTC / ISO</div><ToolOutput value={date.toISOString()} /></>:<div className="empty-state">Enter a valid timestamp.</div>}</div></div>;
}

function PasswordGenerator() {
  const [length,setLength]=useState(20); const [upper,setUpper]=useState(true); const [numbers,setNumbers]=useState(true); const [symbols,setSymbols]=useState(true); const [value,setValue]=useState('');
  const generate=()=>{let chars='abcdefghijklmnopqrstuvwxyz';if(upper)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';if(numbers)chars+='0123456789';if(symbols)chars+='!@#$%^&*()_+-=[]{}';const bytes=new Uint32Array(length);crypto.getRandomValues(bytes);setValue(Array.from(bytes).map(v=>chars[v%chars.length]).join(''))};
  return <div className="grid-2"><div className="card"><div className="field"><label>Length · {length}</label><input type="range" min="8" max="64" value={length} onChange={(e)=>setLength(+e.target.value)} /></div><div className="field"><label><input type="checkbox" checked={upper} onChange={(e)=>setUpper(e.target.checked)} /> Include uppercase</label><label><input type="checkbox" checked={numbers} onChange={(e)=>setNumbers(e.target.checked)} /> Include numbers</label><label><input type="checkbox" checked={symbols} onChange={(e)=>setSymbols(e.target.checked)} /> Include symbols</label></div><button className="primary-btn" onClick={generate}>Generate password</button></div><div className="card"><div className="section-label">Password</div><ToolOutput value={value} /></div></div>;
}

function TextStats() {
  const [input,setInput]=useState('Indie hackers move fast by removing small bits of friction from their workflow.'); const trimmed=input.trim(); const words=trimmed?trimmed.split(/\s+/).length:0; const chars=input.length; const sentences=trimmed?(trimmed.match(/[.!?]+/g)?.length||1):0; const reading=Math.max(1,Math.ceil(words/220));
  return <><div className="grid-3"><div className="metric"><strong>{words}</strong><span>Words</span></div><div className="metric"><strong>{chars}</strong><span>Characters</span></div><div className="metric"><strong>{sentences}</strong><span>Sentences</span></div></div><div style={{height:16}}/><div className="grid-2"><div className="card"><div className="field"><label>Your text</label><textarea value={input} onChange={(e)=>setInput(e.target.value)} /></div></div><div className="card"><div className="metric"><strong>~{reading} min</strong><span>Estimated reading time at 220 wpm</span></div></div></div></>;
}

function JwtDecoder() {
  const [input,setInput]=useState('');
  const decoded=useMemo(()=>{if(!input)return null;try{const [h,p]=input.split('.');const decode=(s:string)=>JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))));return {header:decode(h),payload:decode(p)}}catch{return null}},[input]);
  return <div className="grid-2"><div className="card"><div className="field"><label>JWT</label><textarea value={input} placeholder="eyJhbGciOi..." onChange={(e)=>setInput(e.target.value)} /></div><p style={{color:'#8f97a8',fontSize:12}}>Decoded locally in your browser. Signature verification is intentionally not performed.</p></div><div className="card">{decoded?<><div className="section-label">Header</div><ToolOutput value={JSON.stringify(decoded.header,null,2)} /><div className="section-label">Payload</div><ToolOutput value={JSON.stringify(decoded.payload,null,2)} /></>:<div className="empty-state">Paste a valid JWT to inspect it.</div>}</div></div>;
}

const loremSentences=[
  'Build small, ship early, and learn from real users.',
  'A focused product often beats a crowded roadmap.',
  'Good tools remove friction without demanding attention.',
  'Momentum compounds when the feedback loop stays short.',
  'Simple systems are easier to trust, maintain, and improve.',
  'The best workflow is the one you actually keep using.',
  'Useful defaults make fast work feel effortless.',
  'Clarity turns a rough idea into something people can buy.',
];

function LoremGenerator() {
  const [count,setCount]=useState(3); const output=Array.from({length:count},(_,i)=>loremSentences[i%loremSentences.length]).join(' ');
  return <div className="grid-2"><div className="card"><div className="field"><label>Sentences · {count}</label><input type="range" min="1" max="8" value={count} onChange={(e)=>setCount(+e.target.value)} /></div></div><div className="card"><ToolOutput value={output} /></div></div>;
}

function ToolRenderer({ id }: { id: ToolId }) {
  switch(id){
    case 'color-converter': return <ColorConverter/>;
    case 'color-picker': return <ColorPicker/>;
    case 'gradient': return <GradientGenerator/>;
    case 'contrast': return <ContrastChecker/>;
    case 'json': return <JsonFormatter/>;
    case 'base64': return <Base64Tool/>;
    case 'url': return <UrlTool/>;
    case 'uuid': return <UuidGenerator/>;
    case 'slug': return <SlugGenerator/>;
    case 'case': return <CaseConverter/>;
    case 'timestamp': return <TimestampConverter/>;
    case 'password': return <PasswordGenerator/>;
    case 'text-stats': return <TextStats/>;
    case 'jwt': return <JwtDecoder/>;
    case 'lorem': return <LoremGenerator/>;
  }
}

export default function Home() {
  const [activeTool,setActiveTool]=useState<ToolId>('color-converter');
  const [category,setCategory]=useState<Category>('All');
  const [query,setQuery]=useState('');
  const filtered=tools.filter((tool)=>(category==='All'||tool.category===category)&&(`${tool.name} ${tool.description}`.toLowerCase().includes(query.toLowerCase())));
  const active=tools.find((tool)=>tool.id===activeTool)!;
  const ActiveIcon=active.icon;
  return <>
    <Head><title>IndieKit — Tiny tools for people who ship</title><meta name="description" content="A fast, private toolbox for indie hackers: color tools, JSON formatting, UUIDs, text utilities, security helpers and more." /></Head>
    <main className="app-shell">
      <header className="topbar"><div className="brand"><div className="brand-mark">IK</div><div><div>IndieKit</div><div className="brand-sub">Tiny tools. Serious momentum.</div></div></div><div className="nav-actions"><button className="ghost-btn" onClick={()=>document.getElementById('tools')?.scrollIntoView()}>Explore tools</button><button className="primary-btn" onClick={()=>setActiveTool('json')}>Start building <ArrowRightLeft size={14}/></button></div></header>
      <section className="hero"><span className="eyebrow"><Sparkles size={13}/> Free • private • browser-first</span><h1>The <span>tiny tools</span> behind big launches.</h1><p>A fast utility belt for indie hackers, designers and developers. Convert, inspect, generate and validate the little things that normally break your flow.</p><div className="hero-stats"><div className="hero-stat"><strong>{tools.length}</strong><span>ready-to-use tools</span></div><div className="hero-stat"><strong>0 uploads</strong><span>your data stays local</span></div><div className="hero-stat"><strong>1 workspace</strong><span>everything you need, together</span></div></div></section>
      <section className="workspace" id="tools">
        <aside className="sidebar"><div className="search"><Search size={16}/><input placeholder="Search tools..." value={query} onChange={(e)=>setQuery(e.target.value)} /></div><div className="categories">{(['All','Design','Dev','Text','Security'] as Category[]).map((c)=><button key={c} className={`category-chip ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="tool-list">{filtered.map((tool)=>{const Icon=tool.icon;return <button key={tool.id} className={`tool-item ${activeTool===tool.id?'active':''}`} onClick={()=>setActiveTool(tool.id)}><span className="tool-icon"><Icon size={17}/></span><span><strong>{tool.name}</strong><small>{tool.description}</small></span></button>})}{!filtered.length&&<div className="empty-state">No tools match that search.</div>}</div></aside>
        <section className="tool-stage"><div className="tool-head"><div style={{display:'flex',gap:14}}><span className="tool-icon" style={{width:44,height:44}}><ActiveIcon size={20}/></span><div><h2>{toolCopy[activeTool].title}</h2><p>{toolCopy[activeTool].description}</p></div></div><span className="tool-badge"><Check size={12}/> Runs locally</span></div><div className="tool-body"><ToolRenderer id={activeTool}/></div></section>
      </section>
      <footer className="footer">IndieKit — built for people who would rather ship than search for another utility website.</footer>
    </main>
  </>;
}
