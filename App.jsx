import { useState, useEffect } from "react";

const FREE_LIMIT = 3;
const GUMROAD_LINK = "https://gumroad.com/your-product-link"; // Replace with your Gumroad link

function getUsageCount() {
  return parseInt(localStorage.getItem("ai_usage_count") || "0");
}

function incrementUsage() {
  const count = getUsageCount() + 1;
  localStorage.setItem("ai_usage_count", count);
  return count;
}

// Uses Pollinations AI - 100% free, no API key needed
async function callClaude(prompt) {
  try {
    const res = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        messages: [
          { role: "system", content: "You are a professional business copywriter. Write exactly as instructed, with clearly labeled sections, no extra commentary." },
          { role: "user", content: prompt }
        ],
      }),
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Error generating content.";
  } catch (err) {
    return "Something went wrong. Please try again.";
  }
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0a0a0f; }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    color: #f0ede8;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,210,100,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,210,100,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
  }

  .bg-glow {
    position: fixed;
    top: -200px;
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,180,50,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 24px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .badge {
    display: inline-block;
    background: rgba(255,180,50,0.12);
    border: 1px solid rgba(255,180,50,0.3);
    color: #ffd060;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 20px;
  }

  .title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
  }

  .title span {
    color: #ffd060;
  }

  .subtitle {
    color: #8a8480;
    font-size: 1rem;
    font-weight: 300;
    max-width: 460px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 36px;
  }

  .tab {
    flex: 1;
    padding: 12px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
    background: transparent;
    color: #666;
  }

  .tab.active {
    background: #ffd060;
    color: #0a0a0f;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(255,208,96,0.25);
  }

  .tab:not(.active):hover {
    background: rgba(255,255,255,0.06);
    color: #ccc;
  }

  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 36px;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: #f0ede8;
  }

  .section-desc {
    color: #666;
    font-size: 0.875rem;
    margin-bottom: 28px;
    font-weight: 300;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .form-group.full {
    grid-column: 1 / -1;
  }

  label {
    font-size: 0.8rem;
    font-weight: 500;
    color: #888;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  input, textarea, select {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #f0ede8;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    padding: 12px 14px;
    transition: border-color 0.2s, background 0.2s;
    outline: none;
    width: 100%;
    resize: vertical;
  }

  input:focus, textarea:focus, select:focus {
    border-color: rgba(255,208,96,0.5);
    background: rgba(255,208,96,0.04);
  }

  select option {
    background: #1a1a1f;
    color: #f0ede8;
  }

  .generate-btn {
    width: 100%;
    padding: 15px;
    background: #ffd060;
    color: #0a0a0f;
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }

  .generate-btn:hover:not(:disabled) {
    background: #ffe080;
    box-shadow: 0 6px 28px rgba(255,208,96,0.3);
    transform: translateY(-1px);
  }

  .generate-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loading {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    color: #888;
    font-size: 0.9rem;
    margin-top: 24px;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,208,96,0.2);
    border-top-color: #ffd060;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .result-box {
    margin-top: 28px;
    background: rgba(255,208,96,0.04);
    border: 1px solid rgba(255,208,96,0.2);
    border-radius: 14px;
    padding: 24px;
    animation: fadeIn 0.4s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .result-label {
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #ffd060;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .copy-btn {
    background: rgba(255,208,96,0.1);
    border: 1px solid rgba(255,208,96,0.25);
    color: #ffd060;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover {
    background: rgba(255,208,96,0.18);
  }

  .result-text {
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.75;
    white-space: pre-wrap;
  }

  .divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.06);
    margin: 28px 0;
  }

  .output-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #ffd060;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .output-section-title::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #ffd060;
    border-radius: 50%;
  }

  .paywall {
    margin-top: 28px;
    background: linear-gradient(135deg, rgba(255,208,96,0.08), rgba(255,100,100,0.08));
    border: 1px solid rgba(255,208,96,0.35);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    animation: fadeIn 0.4s ease;
  }

  .paywall-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .paywall-title {
    font-family: "Syne", sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: #f0ede8;
    margin-bottom: 8px;
  }

  .paywall-desc {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .paywall-btn {
    display: inline-block;
    background: #ffd060;
    color: #0a0a0f;
    font-family: "Syne", sans-serif;
    font-size: 1rem;
    font-weight: 800;
    padding: 14px 32px;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.2s;
    box-shadow: 0 6px 28px rgba(255,208,96,0.3);
  }

  .paywall-btn:hover {
    background: #ffe080;
    transform: translateY(-2px);
  }

  .usage-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    font-size: 0.85rem;
    color: #888;
  }

  .usage-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
  }

  .usage-dot.used {
    background: #ffd060;
    border-color: #ffd060;
  }

  .footer {
    text-align: center;
    margin-top: 56px;
    color: #333;
    font-size: 0.8rem;
  }

  @media (max-width: 600px) {
    .form-grid { grid-template-columns: 1fr; }
    .card { padding: 24px 18px; }
  }
`;

// --- PAYWALL COMPONENT ---
function UsageIndicator({ used }) {
  return (
    <div className="usage-bar">
      {[1,2,3].map(i => (
        <div key={i} className={"usage-dot" + (i <= used ? " used" : "")} />
      ))}
      <span>{Math.max(0, FREE_LIMIT - used)} free generation{FREE_LIMIT - used !== 1 ? "s" : ""} remaining</span>
    </div>
  );
}

function Paywall() {
  return (
    <div className="paywall">
      <div className="paywall-icon">🔒</div>
      <div className="paywall-title">You have used your 3 free generations</div>
      <div className="paywall-desc">
        Unlock unlimited access to both tools — Bio Generator and Email Campaign Writer — for a one-time payment of just $19.
      </div>
      <a className="paywall-btn" href={GUMROAD_LINK} target="_blank" rel="noopener noreferrer">
        ✦ Unlock Unlimited Access — $19
      </a>
    </div>
  );
}

// --- BIO TOOL ---
function BioTool() {
  const [form, setForm] = useState({
    name: "", industry: "", services: "", location: "", tone: "professional", tagline: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");
  const [usageCount, setUsageCount] = useState(getUsageCount());

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (usageCount >= FREE_LIMIT) return;
    setLoading(true);
    setResult(null);
    const newCount = incrementUsage();
    setUsageCount(newCount);
    const prompt = `You are a professional copywriter. Generate the following for a small business:

Business Name: ${form.name}
Industry: ${form.industry}
Services/Products: ${form.services}
Location: ${form.location}
Tone: ${form.tone}
Tagline idea (optional): ${form.tagline}

Generate exactly these 4 sections, clearly labeled:

GOOGLE BUSINESS DESCRIPTION:
(150-200 words, SEO-friendly, includes location and services)

INSTAGRAM BIO:
(Max 150 characters, punchy, includes emoji, call to action)

ABOUT US PAGE:
(250-300 words, story-driven, warm and engaging)

TWITTER/X BIO:
(Max 160 characters, sharp and memorable)

Be specific, avoid generic phrases. Make it feel real and human.`;

    const text = await callClaude(prompt);
    setResult(text);
    setLoading(false);
  };

  const copySection = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const parseResult = (text) => {
    if (!text) return [];
    const sections = [
      { key: "google", label: "Google Business Description", icon: "🔍" },
      { key: "instagram", label: "Instagram Bio", icon: "📸" },
      { key: "about", label: "About Us Page", icon: "📄" },
      { key: "twitter", label: "Twitter / X Bio", icon: "🐦" },
    ];
    const labels = ["GOOGLE BUSINESS DESCRIPTION:", "INSTAGRAM BIO:", "ABOUT US PAGE:", "TWITTER/X BIO:"];
    return sections.map((s, i) => {
      const start = text.indexOf(labels[i]);
      const end = i < labels.length - 1 ? text.indexOf(labels[i + 1]) : text.length;
      const content = start !== -1 ? text.slice(start + labels[i].length, end !== -1 ? end : undefined).trim() : "";
      return { ...s, content };
    });
  };

  const parsed = parseResult(result);

  return (
    <div className="card">
      <div className="section-title">Business Bio & Profile Generator</div>
      <div className="section-desc">Answer 6 quick questions → get ready-to-use profiles for Google, Instagram, About Us & Twitter.</div>

      <div className="form-grid">
        <div className="form-group">
          <label>Business Name</label>
          <input placeholder="e.g. Sunrise Bakery" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Industry</label>
          <input placeholder="e.g. Bakery, Plumbing, Salon" value={form.industry} onChange={e => set("industry", e.target.value)} />
        </div>
        <div className="form-group full">
          <label>Services or Products</label>
          <input placeholder="e.g. Custom cakes, pastries, catering for events" value={form.services} onChange={e => set("services", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input placeholder="e.g. Austin, Texas" value={form.location} onChange={e => set("location", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tone</label>
          <select value={form.tone} onChange={e => set("tone", e.target.value)}>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly & Warm</option>
            <option value="luxury">Luxury / Premium</option>
            <option value="playful">Playful & Fun</option>
            <option value="bold">Bold & Direct</option>
          </select>
        </div>
        <div className="form-group full">
          <label>Tagline Idea (Optional)</label>
          <input placeholder="e.g. 'Where every bite tells a story'" value={form.tagline} onChange={e => set("tagline", e.target.value)} />
        </div>
      </div>

      <UsageIndicator used={usageCount} />

      {usageCount >= FREE_LIMIT ? <Paywall /> : (
        <>
      <button
        className="generate-btn"
        onClick={generate}
        disabled={loading || !form.name || !form.industry || !form.services}
      >
        {loading ? "Generating..." : "✦ Generate All Profiles"}
      </button>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          Writing your business profiles...
        </div>
      )}

      {result && (
        <div className="result-box">
          <div className="result-header">
            <span className="result-label">✦ Your Profiles</span>
            <button className="copy-btn" onClick={() => copySection(result, "all")}>
              {copied === "all" ? "✓ Copied!" : "Copy All"}
            </button>
          </div>
          {parsed.map(s => s.content && (
            <div key={s.key} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div className="output-section-title">{s.icon} {s.label}</div>
                <button className="copy-btn" onClick={() => copySection(s.content, s.key)}>
                  {copied === s.key ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="result-text">{s.content}</div>
              <hr className="divider" style={{ marginBottom: 0 }} />
            </div>
          ))}
        </div>
      )}
        </>
      )}
    </div>
  );
}

// --- EMAIL CAMPAIGN TOOL ---
function EmailTool() {
  const [form, setForm] = useState({
    business: "", industry: "", offer: "", audience: "", goal: "promote", emails: "3", tone: "friendly"
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");
  const [usageCount, setUsageCount] = useState(getUsageCount());

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (usageCount >= FREE_LIMIT) return;
    setLoading(true);
    setResult(null);
    const newCount = incrementUsage();
    setUsageCount(newCount);
    const prompt = `You are an expert email marketing copywriter. Write a ${form.emails}-email campaign for a small business.

Business: ${form.business}
Industry: ${form.industry}
Offer/Promotion: ${form.offer}
Target Audience: ${form.audience}
Campaign Goal: ${form.goal}
Tone: ${form.tone}

Write exactly ${form.emails} emails. For each email use this format:

EMAIL [NUMBER]:
Subject: [subject line]
Preview Text: [preview text, max 90 chars]
Body:
[full email body, 150-200 words, conversational, no fluff]
CTA: [call to action button text]

---

Space each email 2-3 days apart and make them build on each other. Be specific, human, and persuasive. No generic filler.`;

    const text = await callClaude(prompt);
    setResult(text);
    setLoading(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(result);
    setCopied("all");
    setTimeout(() => setCopied(""), 2000);
  };

  const parseEmails = (text) => {
    if (!text) return [];
    const count = parseInt(form.emails);
    const emails = [];
    for (let i = 1; i <= count; i++) {
      const start = text.indexOf(`EMAIL ${i}:`);
      const end = i < count ? text.indexOf(`EMAIL ${i + 1}:`) : text.length;
      if (start !== -1) {
        emails.push({
          num: i,
          content: text.slice(start, end !== -1 ? end : undefined).trim()
        });
      }
    }
    return emails;
  };

  const emails = parseEmails(result);

  return (
    <div className="card">
      <div className="section-title">AI Email Campaign Writer</div>
      <div className="section-desc">Describe your business and promotion → get a full multi-email campaign ready to send.</div>

      <div className="form-grid">
        <div className="form-group">
          <label>Business Name</label>
          <input placeholder="e.g. FitLife Gym" value={form.business} onChange={e => set("business", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Industry</label>
          <input placeholder="e.g. Fitness, Restaurant, Retail" value={form.industry} onChange={e => set("industry", e.target.value)} />
        </div>
        <div className="form-group full">
          <label>Offer or Promotion</label>
          <input placeholder="e.g. 30% off memberships this month, free trial week" value={form.offer} onChange={e => set("offer", e.target.value)} />
        </div>
        <div className="form-group full">
          <label>Target Audience</label>
          <input placeholder="e.g. Local residents aged 25-45 who want to get fit" value={form.audience} onChange={e => set("audience", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Campaign Goal</label>
          <select value={form.goal} onChange={e => set("goal", e.target.value)}>
            <option value="promote">Promote an Offer</option>
            <option value="launch">Launch a Product</option>
            <option value="re-engage">Re-engage Old Customers</option>
            <option value="event">Promote an Event</option>
            <option value="announce">Make an Announcement</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of Emails</label>
          <select value={form.emails} onChange={e => set("emails", e.target.value)}>
            <option value="2">2 Emails</option>
            <option value="3">3 Emails</option>
            <option value="4">4 Emails</option>
            <option value="5">5 Emails</option>
          </select>
        </div>
        <div className="form-group full">
          <label>Tone</label>
          <select value={form.tone} onChange={e => set("tone", e.target.value)}>
            <option value="friendly">Friendly & Conversational</option>
            <option value="professional">Professional</option>
            <option value="urgent">Urgent & Persuasive</option>
            <option value="luxury">Luxury / Premium</option>
            <option value="playful">Playful & Fun</option>
          </select>
        </div>
      </div>

      <UsageIndicator used={usageCount} />

      {usageCount >= FREE_LIMIT ? <Paywall /> : (
        <>
      <button
        className="generate-btn"
        onClick={generate}
        disabled={loading || !form.business || !form.offer || !form.audience}
      >
        {loading ? "Writing campaign..." : "✦ Generate Email Campaign"}
      </button>

      {loading && (
        <div className="loading">
          <div className="spinner" />
          Crafting your email campaign...
        </div>
      )}

      {result && (
        <div className="result-box">
          <div className="result-header">
            <span className="result-label">✦ Your Campaign ({form.emails} Emails)</span>
            <button className="copy-btn" onClick={copyAll}>
              {copied === "all" ? "✓ Copied!" : "Copy All"}
            </button>
          </div>
          {emails.length > 0 ? emails.map(e => (
            <div key={e.num} style={{ marginBottom: "20px" }}>
              <div className="output-section-title">✉️ Email {e.num}</div>
              <div className="result-text">{e.content}</div>
              <hr className="divider" style={{ marginBottom: 0, marginTop: "16px" }} />
            </div>
          )) : (
            <div className="result-text">{result}</div>
          )}
        </div>
      )}
        </>
      )}
    </div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [tab, setTab] = useState("bio");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-grid" />
        <div className="bg-glow" />
        <div className="container">
          <div className="header">
            <div className="badge">✦ AI Business Tools</div>
            <h1 className="title">
              Grow Your Business<br />
              with <span>Smart AI</span>
            </h1>
            <p className="subtitle">Two powerful tools to help any small business look professional and market better — in seconds.</p>
          </div>

          <div className="tabs">
            <button className={`tab ${tab === "bio" ? "active" : ""}`} onClick={() => setTab("bio")}>
              🏪 Bio & Profile Generator
            </button>
            <button className={`tab ${tab === "email" ? "active" : ""}`} onClick={() => setTab("email")}>
              ✉️ Email Campaign Writer
            </button>
          </div>

          {tab === "bio" ? <BioTool /> : <EmailTool />}

          <div className="footer">
            Powered by AI · Built for small businesses everywhere
          </div>
        </div>
      </div>
    </>
  );
}
