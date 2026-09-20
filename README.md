<div align="center">

# indieTools

### The tiny tools behind big launches.

A focused collection of fast, privacy-friendly browser utilities for indie hackers, designers and developers.  
Convert, inspect, generate and validate the little things that normally break your flow.

<br />

<img src="./assets/preview.png" alt="indieTools — tiny tools behind big launches" width="100%" />

</div>

---

## ✦ Why indieTools?

**indieTools** puts the small utilities you repeatedly need while building and shipping products in one focused workspace.

| | |
| --- | --- |
| ⚡ **Fast** | Open a tool and get the result instantly |
| 🔒 **Private by design** | Tools run locally in your browser whenever possible |
| 📦 **No uploads** | Your data doesn't need to leave your device for core utilities |
| 🧰 **One toolbox** | Design, developer, web, API and data utilities together |
| 🚫 **No signup** | Start using the tools immediately |
| 🎯 **Focused** | Each tool does one small job well |

## ✦ Tools

### Design

**Color Studio** — pick colors, convert HEX/RGB/HSL, generate palettes and gradients, and check WCAG contrast.

### Developer

**JSON Formatter** — format, validate and minify JSON.  
**Base64** — encode and decode Base64.  
**URL Encoder** — encode and decode URL components.  
**UUID Generator** — generate UUID v4 identifiers.  
**Timestamp Converter** — convert Unix timestamps to readable dates.  
**Timezone Converter** — convert dates and times between IANA timezones.

### Text

**Slug Generator** — generate clean, SEO-friendly slugs.  
**Case Converter** — switch between camelCase, PascalCase, snake_case and kebab-case.  
**Text Analyzer** — inspect word count, character count, sentences and estimated reading time.  
**Lorem Ipsum** — generate placeholder copy for prototypes and mockups.

### Security

**Password Generator** — generate strong random passwords.  
**JWT Decoder** — inspect JWT headers and payloads locally in the browser.

## ✦ Browser-first & private

The core utilities are designed to work directly in the browser. That means inputs such as JSON, tokens, text and colors can be transformed without requiring a backend or an account.

> **0 uploads:** for local tools, your input stays in your browser.

## ✦ Tech Stack

Built with **Next.js 16**, **React 19**, **TypeScript** and **Lucide React**.

The project intentionally stays lightweight and does not require a backend for its core utilities.

## ✦ Run locally

```bash
git clone https://github.com/ennouaimi/indie-tools.git
cd indie-tools
npm install
npm run dev
```

Then open `http://localhost:3000`.

## ✦ Project structure

```text
indie-tools/
├── components/
├── lib/
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── lab.tsx
│   ├── saas-tools.tsx
│   └── workbench.tsx
├── public/
├── styles/
├── package.json
└── tsconfig.json
```

## ✦ Project philosophy

Tiny utility tasks shouldn't require installing another app, creating an account or jumping between a dozen websites.

indieTools keeps them together behind one consistent interface so you can stay focused on what you're actually building.

## ✦ Contributing

Ideas for useful, focused tools are welcome. A good addition should be quick to understand, useful repeatedly and preferably work entirely client-side.

---

<div align="center">

**Tiny tools. Serious momentum.**

Built for people who ship.

</div>
