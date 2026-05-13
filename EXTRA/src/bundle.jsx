
// ──── ios-frame.jsx ────

// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports: IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({ dark = false, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      display: 'flex', gap: 154, alignItems: 'center', justifyContent: 'center',
      padding: '21px 24px 19px', boxSizing: 'border-box',
      position: 'relative', zIndex: 20, width: '100%',
    }}>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 1.5 }}>
        <span style={{
          fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590,
          fontSize: 17, lineHeight: '22px', color: c,
        }}>{time}</span>
      </div>
      <div style={{ flex: 1, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, paddingTop: 1, paddingRight: 1 }}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c}/>
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c}/>
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c}/>
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c}/>
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c}/>
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c}/>
          <circle cx="8.5" cy="10.5" r="1.5" fill={c}/>
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none"/>
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c}/>
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({ children, dark = false, style = {} }) {
  return (
    <div style={{
      height: 44, minWidth: 44, borderRadius: 9999,
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: dark
        ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)'
        : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style,
    }}>
      {/* blur + tint */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)',
      }} />
      {/* shine */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 9999,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({ title = 'Title', dark = false, trailingIcon = true }) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = (content) => (
    <IOSGlassPill dark={dark}>
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </div>
    </IOSGlassPill>
  );
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      paddingTop: 62, paddingBottom: 10, position: 'relative', zIndex: 5,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        {/* back chevron */}
        {pillIcon(
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ marginLeft: -1 }}>
            <path d="M10 2L2 10l8 8" stroke={muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {/* trailing ellipsis */}
        {trailingIcon && pillIcon(
          <svg width="22" height="6" viewBox="0 0 22 6">
            <circle cx="3" cy="3" r="2.5" fill={muted}/>
            <circle cx="11" cy="3" r="2.5" fill={muted}/>
            <circle cx="19" cy="3" r="2.5" fill={muted}/>
          </svg>
        )}
      </div>
      {/* large title */}
      <div style={{
        padding: '0 16px',
        fontFamily: '-apple-system, system-ui',
        fontSize: 34, fontWeight: 700, lineHeight: '41px',
        color: text, letterSpacing: 0.4,
      }}>{title}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({ title, detail, icon, chevron = true, isLast = false, dark = false }) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', minHeight: 52,
      padding: '0 16px', position: 'relative',
      fontFamily: '-apple-system, system-ui', fontSize: 17,
      letterSpacing: -0.43,
    }}>
      {icon && (
        <div style={{
          width: 30, height: 30, borderRadius: 7, background: icon,
          marginRight: 12, flexShrink: 0,
        }} />
      )}
      <div style={{ flex: 1, color: text }}>{title}</div>
      {detail && <span style={{ color: sec, marginRight: 6 }}>{detail}</span>}
      {chevron && (
        <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0 }}>
          <path d="M1 1l6 6-6 6" stroke={ter} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {!isLast && (
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          left: icon ? 58 : 16, height: 0.5, background: sep,
        }} />
      )}
    </div>
  );
}

function IOSList({ header, children, dark = false }) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return (
    <div>
      {header && (
        <div style={{
          fontFamily: '-apple-system, system-ui', fontSize: 13,
          color: hc, textTransform: 'uppercase',
          padding: '8px 36px 6px', letterSpacing: -0.08,
        }}>{header}</div>
      )}
      <div style={{
        background: bg, borderRadius: 26,
        margin: '0 16px', overflow: 'hidden',
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children, width = 402, height = 874, dark = false,
  title, keyboard = false,
}) {
  return (
    <div style={{
      width, height, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
      }} />
      {/* status bar (absolute) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar dark={dark} />
      </div>
      {/* nav + content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {title !== undefined && <IOSNavBar title={title} dark={dark} />}
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
        {keyboard && <IOSKeyboard dark={dark} />}
      </div>
      {/* home indicator — always on top */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 139, height: 5, borderRadius: 100,
          background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({ dark = false }) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: <svg width="19" height="17" viewBox="0 0 19 17"><path d="M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z" fill={glyph}/></svg>,
    del: <svg width="23" height="17" viewBox="0 0 23 17"><path d="M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z" fill="none" stroke={glyph} strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 5l7 7M17 5l-7 7" stroke={glyph} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    ret: <svg width="20" height="14" viewBox="0 0 20 14"><path d="M18 1v6H4m0 0l4-4M4 7l4 4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };

  const key = (content, { w, flex, ret, fs = 25, k } = {}) => (
    <div key={k} style={{
      height: 42, borderRadius: 8.5,
      flex: flex ? 1 : undefined, width: w, minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs, fontWeight: 458, color: ret ? '#fff' : glyph,
    }}>{content}</div>
  );

  const row = (keys, pad = 0) => (
    <div style={{ display: 'flex', gap: 6.5, justifyContent: 'center', padding: `0 ${pad}px` }}>
      {keys.map(l => key(l, { flex: true, k: l }))}
    </div>
  );

  return (
    <div style={{
      position: 'relative', zIndex: 15, borderRadius: 27, overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: dark
        ? '0 -2px 20px rgba(0,0,0,0.09)'
        : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)',
    }}>
      {/* liquid glass bg — same recipe as nav pills */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 27,
        boxShadow: dark
          ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)'
          : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
        border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
        pointerEvents: 'none',
      }} />

      {/* autocorrect bar */}
      <div style={{
        display: 'flex', gap: 20, alignItems: 'center',
        padding: '8px 22px 13px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {['"The"', 'the', 'to'].map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 25, background: '#ccc', opacity: 0.3 }} />}
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: '-apple-system, system-ui', fontSize: 17,
              color: sugg, letterSpacing: -0.43, lineHeight: '22px',
            }}>{w}</div>
          </React.Fragment>
        ))}
      </div>

      {/* key layout */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 13,
        padding: '0 6.5px', width: '100%', boxSizing: 'border-box',
        position: 'relative',
      }}>
        {row(['q','w','e','r','t','y','u','i','o','p'])}
        {row(['a','s','d','f','g','h','j','k','l'], 20)}
        <div style={{ display: 'flex', gap: 14.25, alignItems: 'center' }}>
          {key(icons.shift, { w: 45, k: 'shift' })}
          <div style={{ display: 'flex', gap: 6.5, flex: 1 }}>
            {['z','x','c','v','b','n','m'].map(l => key(l, { flex: true, k: l }))}
          </div>
          {key(icons.del, { w: 45, k: 'del' })}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {key('ABC', { w: 92.25, fs: 18, k: 'abc' })}
          {key('', { flex: true, k: 'space' })}
          {key(icons.ret, { w: 92.25, ret: true, k: 'ret' })}
        </div>
      </div>

      {/* bottom spacer (emoji+mic area, icons omitted) */}
      <div style={{ height: 56, width: '100%', position: 'relative' }} />
    </div>
  );
}

Object.assign(window, {
  IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard,
});


// ──── tweaks-panel.jsx ────

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', noDeckControls = false, children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  // Auto-inject a rail toggle when a <deck-stage> is on the page. The
  // toggle drives the deck's per-viewer _railVisible via window message;
  // state is mirrored from the same localStorage key the deck reads so
  // the control reflects reality across reloads. The mechanism is the
  // message — authors who want custom placement can post it directly
  // and pass noDeckControls to suppress this one.
  const hasDeckStage = React.useMemo(
    () => typeof document !== 'undefined' && !!document.querySelector('deck-stage'),
    [],
  );
  // deck-stage enables its rail in connectedCallback, but this panel can
  // mount before that element has upgraded. The initial read catches the
  // common case; the listener covers mounting first. (Older deck-stage.js
  // copies still wait for the host's __omelette_rail_enabled postMessage —
  // same listener handles those.)
  const [railEnabled, setRailEnabled] = React.useState(
    () => hasDeckStage && !!document.querySelector('deck-stage')?._railEnabled,
  );
  React.useEffect(() => {
    if (!hasDeckStage || railEnabled) return undefined;
    const onMsg = (e) => {
      if (e.data && e.data.type === '__omelette_rail_enabled') setRailEnabled(true);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [hasDeckStage, railEnabled]);
  const [railVisible, setRailVisible] = React.useState(() => {
    try { return localStorage.getItem('deck-stage.railVisible') !== '0'; } catch (e) { return true; }
  });
  const toggleRail = (on) => {
    setRailVisible(on);
    window.postMessage({ type: '__deck_rail_visible', on }, '*');
  };
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-noncommentable=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
          {hasDeckStage && railEnabled && !noDeckControls && (
            <TweakSection label="Deck">
              <TweakToggle label="Thumbnail rail" value={railVisible} onChange={toggleRail} />
            </TweakSection>
          )}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});


// ──── src/data.jsx ────
// Datos semilla para fitness_tracker — ~8 semanas de historial realista

const TRAINING_TYPES = [
  { id: 'tt-pli', name: 'Pliometría', short: 'Plio', color: '#7B5CD6', desc: 'Saltos, multisaltos, lanzamientos, acciones reactivas. Con o sin peso.' },
  { id: 'tt-pot', name: 'Potencia',   short: 'Pot',  color: '#E68A2E', desc: 'Mover carga o cuerpo a máxima velocidad posible.' },
  { id: 'tt-fue', name: 'Fuerza',     short: 'Fue',  color: '#D94B4B', desc: 'Maximizar la carga levantada.' },
  { id: 'tt-hip', name: 'Hipertrofia',short: 'Hip',  color: '#3A82C4', desc: 'Aumentar tamaño muscular con volumen y tensión.' },
  { id: 'tt-otr', name: 'Otro',       short: 'Otr',  color: '#8A8378', desc: 'Genérico para ejercicios sin categoría clara.' },
];

const EXERCISES = [
  { id: 'ex-sq',   name: 'Sentadilla',          default_type: 'tt-fue', notes: 'Barra trasera. Profundidad paralela.' },
  { id: 'ex-bp',   name: 'Press banca',         default_type: 'tt-fue', notes: 'Pies anclados, escápulas retraídas.' },
  { id: 'ex-dl',   name: 'Peso muerto',         default_type: 'tt-fue', notes: 'Convencional.' },
  { id: 'ex-jsq',  name: 'Sentadilla con salto',default_type: 'tt-pli', notes: 'Triple extensión, aterrizaje suave.' },
  { id: 'ex-box',  name: 'Salto al cajón',      default_type: 'tt-pli', notes: 'Cajón 60-70cm.' },
  { id: 'ex-mtj',  name: 'Multisaltos',         default_type: 'tt-pli', notes: '10 saltos consecutivos sobre vallas.' },
  { id: 'ex-pcl',  name: 'Power clean',         default_type: 'tt-pot', notes: 'Foco en velocidad de extensión.' },
  { id: 'ex-pp',   name: 'Push press',          default_type: 'tt-pot', notes: 'Dip-drive explosivo.' },
  { id: 'ex-bsq',  name: 'Sentadilla búlgara',  default_type: 'tt-hip', notes: 'Mancuernas, pierna trasera elevada.' },
  { id: 'ex-pu',   name: 'Dominadas',           default_type: 'tt-hip', notes: 'Agarre prono, rom completo.' },
  { id: 'ex-cb',   name: 'Curl bíceps',         default_type: 'tt-hip', notes: 'Barra Z, control excéntrico.' },
  { id: 'ex-spr',  name: 'Sprint 30m',          default_type: 'tt-otr', notes: 'Salida de pie. Cronómetro manual.' },
];

// 8 semanas de entrenamientos — fechas relativas al "hoy" del prototipo (10 may 2026)
// formato: { id, date, name, notes, exercises: [{exercise_id, training_type_id, notes, sets: [...] }] }

function __seedDate(daysAgo) {
  // Construct UTC date to avoid timezone offset shifting the ISO date
  const t = new Date(Date.UTC(2026, 4, 10));
  t.setUTCDate(t.getUTCDate() - daysAgo);
  return t.toISOString().slice(0, 10);
}
const d = __seedDate;

const WORKOUTS = [
  { id: 'w-12', date: d(56), name: 'Pierna — base', notes: 'Inicio del bloque.', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:80, reps:5 }, { set_number:2, weight:90, reps:5 }, { set_number:3, weight:100, reps:5 }, { set_number:4, weight:100, reps:5 },
    ]},
    { exercise_id: 'ex-bsq', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, weight:20, reps:10 }, { set_number:2, weight:22.5, reps:10 }, { set_number:3, weight:22.5, reps:10 },
    ]},
  ]},
  { id: 'w-11', date: d(53), name: 'Empuje', notes: '', exercises: [
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:60, reps:5 }, { set_number:2, weight:70, reps:5 }, { set_number:3, weight:75, reps:5 }, { set_number:4, weight:75, reps:4 },
    ]},
    { exercise_id: 'ex-pp', training_type_id: 'tt-pot', notes: 'Foco velocidad', sets: [
      { set_number:1, weight:40, reps:3, intensity_notes:'rápido' }, { set_number:2, weight:45, reps:3, intensity_notes:'rápido' }, { set_number:3, weight:45, reps:3 },
    ]},
  ]},
  { id: 'w-10', date: d(49), name: 'Salto + potencia', notes: '', exercises: [
    { exercise_id: 'ex-jsq', training_type_id: 'tt-pli', notes: 'Sin peso', sets: [
      { set_number:1, reps:5, height_cm:42 }, { set_number:2, reps:5, height_cm:44 }, { set_number:3, reps:5, height_cm:43 },
    ]},
    { exercise_id: 'ex-pcl', training_type_id: 'tt-pot', notes: '', sets: [
      { set_number:1, weight:50, reps:3 }, { set_number:2, weight:55, reps:3 }, { set_number:3, weight:60, reps:2 },
    ]},
  ]},
  { id: 'w-9',  date: d(46), name: 'Tirón', notes: '', exercises: [
    { exercise_id: 'ex-dl', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:100, reps:5 }, { set_number:2, weight:120, reps:3 }, { set_number:3, weight:130, reps:3 },
    ]},
    { exercise_id: 'ex-pu', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, reps:8 }, { set_number:2, reps:7 }, { set_number:3, reps:6 },
    ]},
  ]},
  { id: 'w-8',  date: d(42), name: 'Pierna — fuerza', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:85, reps:5 }, { set_number:2, weight:95, reps:5 }, { set_number:3, weight:105, reps:5 }, { set_number:4, weight:105, reps:5 },
    ]},
    { exercise_id: 'ex-box', training_type_id: 'tt-pli', notes: 'Aterrizaje suave', sets: [
      { set_number:1, reps:5, height_cm:60 }, { set_number:2, reps:5, height_cm:65 }, { set_number:3, reps:5, height_cm:65 },
    ]},
  ]},
  { id: 'w-7',  date: d(39), name: 'Empuje + sprint', notes: '', exercises: [
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:65, reps:5 }, { set_number:2, weight:72.5, reps:5 }, { set_number:3, weight:77.5, reps:5 }, { set_number:4, weight:77.5, reps:5 },
    ]},
    { exercise_id: 'ex-spr', training_type_id: 'tt-otr', notes: '3 series', sets: [
      { set_number:1, duration_seconds:4.3, distance_meters:30 },
      { set_number:2, duration_seconds:4.2, distance_meters:30 },
      { set_number:3, duration_seconds:4.2, distance_meters:30 },
    ]},
  ]},
  { id: 'w-6',  date: d(35), name: 'Potencia pierna', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-pot', notes: 'Foco velocidad', sets: [
      { set_number:1, weight:60, reps:3, intensity_notes:'rápido' }, { set_number:2, weight:60, reps:3, intensity_notes:'rápido' }, { set_number:3, weight:60, reps:3, intensity_notes:'rápido' },
    ]},
    { exercise_id: 'ex-mtj', training_type_id: 'tt-pli', notes: 'Vallas 50cm', sets: [
      { set_number:1, reps:10 }, { set_number:2, reps:10 }, { set_number:3, reps:10 },
    ]},
  ]},
  { id: 'w-5',  date: d(32), name: 'Pierna — fuerza', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:90, reps:5 }, { set_number:2, weight:100, reps:5 }, { set_number:3, weight:110, reps:5 }, { set_number:4, weight:110, reps:4 },
    ]},
    { exercise_id: 'ex-cb', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, weight:15, reps:12 }, { set_number:2, weight:17.5, reps:10 }, { set_number:3, weight:17.5, reps:9 },
    ]},
  ]},
  { id: 'w-4',  date: d(28), name: 'Tirón pesado', notes: 'Buen día', exercises: [
    { exercise_id: 'ex-dl', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:110, reps:5 }, { set_number:2, weight:130, reps:3 }, { set_number:3, weight:140, reps:2 },
    ]},
    { exercise_id: 'ex-pu', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, reps:9 }, { set_number:2, reps:8 }, { set_number:3, reps:7 },
    ]},
  ]},
  { id: 'w-3',  date: d(21), name: 'Salto + empuje', notes: '', exercises: [
    { exercise_id: 'ex-jsq', training_type_id: 'tt-pli', notes: '', sets: [
      { set_number:1, reps:5, height_cm:45 }, { set_number:2, reps:5, height_cm:46 }, { set_number:3, reps:5, height_cm:47 },
    ]},
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:70, reps:5 }, { set_number:2, weight:80, reps:5 }, { set_number:3, weight:82.5, reps:4 },
    ]},
  ]},
  { id: 'w-2',  date: d(14), name: 'Pierna — fuerza', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:95, reps:5 }, { set_number:2, weight:105, reps:5 }, { set_number:3, weight:115, reps:5 }, { set_number:4, weight:115, reps:5 },
    ]},
    { exercise_id: 'ex-spr', training_type_id: 'tt-otr', notes: '', sets: [
      { set_number:1, duration_seconds:4.15, distance_meters:30 },
      { set_number:2, duration_seconds:4.1, distance_meters:30 },
      { set_number:3, duration_seconds:4.1, distance_meters:30 },
    ]},
  ]},
  { id: 'w-1',  date: d(7),  name: 'Pierna — PR', notes: 'PR sentadilla 120kg', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: 'PR', sets: [
      { set_number:1, weight:100, reps:3 }, { set_number:2, weight:110, reps:3 }, { set_number:3, weight:120, reps:3, intensity_notes:'PR' },
    ]},
    { exercise_id: 'ex-box', training_type_id: 'tt-pli', notes: '', sets: [
      { set_number:1, reps:5, height_cm:65 }, { set_number:2, reps:5, height_cm:70 }, { set_number:3, reps:5, height_cm:70 },
    ]},
  ]},
  { id: 'w-0',  date: d(2),  name: 'Empuje + potencia', notes: '', exercises: [
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:70, reps:5 }, { set_number:2, weight:80, reps:5 }, { set_number:3, weight:85, reps:5 }, { set_number:4, weight:85, reps:4 },
    ]},
    { exercise_id: 'ex-pcl', training_type_id: 'tt-pot', notes: '', sets: [
      { set_number:1, weight:55, reps:3 }, { set_number:2, weight:60, reps:3 }, { set_number:3, weight:62.5, reps:2 },
    ]},
  ]},
];

// Peso corporal — entrada semanal, cut suave 82 → 78
const BODY_WEIGHT = [
  { entry_date: d(56), weight: 82.0 },
  { entry_date: d(49), weight: 81.6 },
  { entry_date: d(42), weight: 81.1 },
  { entry_date: d(35), weight: 80.4 },
  { entry_date: d(28), weight: 80.0 },
  { entry_date: d(21), weight: 79.3 },
  { entry_date: d(14), weight: 78.8, notes: 'Buena semana' },
  { entry_date: d(7),  weight: 78.4 },
  { entry_date: d(2),  weight: 78.1 },
];

Object.assign(window, { TRAINING_TYPES, EXERCISES, WORKOUTS, BODY_WEIGHT });


// ──── src/theme.jsx ────
// Tema cálido estilo Apple Health — claro + oscuro
const THEME = {
  light: {
    name: 'light',
    bg: '#F6F1EA',           // cream warm
    surface: '#FFFFFF',
    surfaceAlt: '#FBF6EF',
    surfaceSunken: '#EFE8DD',
    text: '#1F1B16',
    textMuted: '#6E6359',
    textSubtle: '#9A9087',
    border: 'rgba(31,27,22,0.08)',
    borderStrong: 'rgba(31,27,22,0.14)',
    accent: '#E26A4A',       // warm coral (Apple Health orange-ish)
    accentSoft: 'rgba(226,106,74,0.12)',
    success: '#3DA37A',
    chartGrid: 'rgba(31,27,22,0.06)',
    shadow: '0 1px 2px rgba(31,27,22,0.04), 0 4px 16px rgba(31,27,22,0.05)',
    shadowSm: '0 1px 2px rgba(31,27,22,0.05)',
    scrim: 'rgba(31,27,22,0.45)',
    statusDark: false,
  },
  dark: {
    name: 'dark',
    bg: '#15110D',
    surface: '#1F1A14',
    surfaceAlt: '#241E17',
    surfaceSunken: '#100D09',
    text: '#F4EDE2',
    textMuted: '#A89D8E',
    textSubtle: '#75695B',
    border: 'rgba(244,237,226,0.07)',
    borderStrong: 'rgba(244,237,226,0.14)',
    accent: '#F08566',
    accentSoft: 'rgba(240,133,102,0.15)',
    success: '#4FBE93',
    chartGrid: 'rgba(244,237,226,0.06)',
    shadow: '0 2px 6px rgba(0,0,0,0.4), 0 8px 28px rgba(0,0,0,0.32)',
    shadowSm: '0 1px 2px rgba(0,0,0,0.4)',
    scrim: 'rgba(0,0,0,0.55)',
    statusDark: true,
  },
};

const ThemeContext = React.createContext(THEME.light);
const useTheme = () => React.useContext(ThemeContext);

window.THEME = THEME;
window.ThemeContext = ThemeContext;
window.useTheme = useTheme;


// ──── src/ui.jsx ────
// Helpers + iconos + componentes compartidos

const fmtDate = (iso, opts = {}) => {
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const monthsLong = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const days = ['dom','lun','mar','mié','jue','vie','sáb'];
  const [y, m, da] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, da);
  if (opts.long) return `${days[dt.getDay()]}, ${da} de ${monthsLong[m-1]}`;
  if (opts.full) return `${da} ${months[m-1]} ${String(y).slice(2)}`;
  return `${da} ${months[m-1]}`;
};

const daysAgo = (iso) => {
  const [y, m, da] = iso.split('-').map(Number);
  const target = Date.UTC(y, m - 1, da);
  const today = Date.UTC(2026, 4, 10);
  return Math.floor((today - target) / (1000 * 60 * 60 * 24));
};

const relativeDay = (iso) => {
  const n = daysAgo(iso);
  if (n === 0) return 'hoy';
  if (n === 1) return 'ayer';
  if (n < 7) return `hace ${n} días`;
  if (n < 14) return 'la semana pasada';
  if (n < 30) return `hace ${Math.floor(n/7)} sem`;
  return `hace ${Math.floor(n/30)} meses`;
};

const sum = (arr, fn = x => x) => arr.reduce((a, x) => a + (fn(x) || 0), 0);
const max = (arr, fn = x => x) => arr.reduce((a, x) => Math.max(a, fn(x) || 0), 0);

// ─── Iconos ──────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.8 }) => {
  const s = stroke;
  const p = { fill: 'none', stroke: color, strokeWidth: s, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path {...p} d="M3 11l9-8 9 8"/><path {...p} d="M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5"/></>,
    list: <><path {...p} d="M4 6h16M4 12h16M4 18h10"/></>,
    chart: <><path {...p} d="M4 19V5M4 19h16"/><path {...p} d="M8 15l3-4 3 2 4-6"/></>,
    more: <><circle {...p} cx="5" cy="12" r="1.3"/><circle {...p} cx="12" cy="12" r="1.3"/><circle {...p} cx="19" cy="12" r="1.3"/></>,
    plus: <><path {...p} d="M12 5v14M5 12h14"/></>,
    plusSm: <><path {...p} d="M12 6v12M6 12h12"/></>,
    back: <><path {...p} d="M15 5l-7 7 7 7"/></>,
    close: <><path {...p} d="M6 6l12 12M18 6L6 18"/></>,
    chev: <><path {...p} d="M9 5l7 7-7 7"/></>,
    chevDn: <><path {...p} d="M5 9l7 7 7-7"/></>,
    check: <><path {...p} d="M5 12l5 5 9-11"/></>,
    dot: <><circle cx="12" cy="12" r="3" fill={color} stroke="none"/></>,
    flame: <><path {...p} d="M12 3c1 4 5 5 5 10a5 5 0 11-10 0c0-3 2-3 2-6 1 1 3 1 3-4z"/></>,
    weight: <><rect {...p} x="3" y="8" width="18" height="9" rx="2"/><path {...p} d="M8 12v2M12 11v3M16 12v2"/></>,
    body: <><circle {...p} cx="12" cy="5" r="2.5"/><path {...p} d="M12 8v6M8 11l4-2 4 2M9 21l3-7 3 7"/></>,
    dumbbell: <><path {...p} d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/></>,
    calendar: <><rect {...p} x="3" y="5" width="18" height="16" rx="2"/><path {...p} d="M3 9h18M8 3v4M16 3v4"/></>,
    clock: <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M12 7v5l3 2"/></>,
    bolt: <><path {...p} d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></>,
    target: <><circle {...p} cx="12" cy="12" r="9"/><circle {...p} cx="12" cy="12" r="5"/><circle {...p} cx="12" cy="12" r="1.5" fill={color}/></>,
    filter: <><path {...p} d="M4 5h16l-6 8v6l-4-2v-4z"/></>,
    edit: <><path {...p} d="M4 20h4l10-10-4-4L4 16v4z"/><path {...p} d="M13 6l4 4"/></>,
    info: <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M12 11v6"/><circle cx="12" cy="8" r="1" fill={color} stroke="none"/></>,
    settings: <><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.6 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></>,
    arrow: <><path {...p} d="M5 12h14M13 5l7 7-7 7"/></>,
    trend: <><path {...p} d="M3 17l6-6 4 4 8-9"/><path {...p} d="M14 6h7v7"/></>,
    sparkles: <><path {...p} d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></>,
    search: <><circle {...p} cx="11" cy="11" r="7"/><path {...p} d="M20 20l-3.5-3.5"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name] || paths.dot}
    </svg>
  );
};

// ─── Tipo pill (Pliometría, Fuerza...) ────────────────────────
function TypePill({ type, size = 'md' }) {
  const sizes = {
    sm: { fs: 10, py: 2, px: 7, dot: 5, gap: 5 },
    md: { fs: 11, py: 3, px: 9, dot: 6, gap: 6 },
    lg: { fs: 12, py: 5, px: 11, dot: 7, gap: 7 },
  }[size];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: sizes.gap,
      padding: `${sizes.py}px ${sizes.px}px`, borderRadius: 999,
      background: type.color + '1A',
      color: type.color,
      fontSize: sizes.fs, fontWeight: 600, letterSpacing: 0.2,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: sizes.dot, height: sizes.dot, borderRadius: 99, background: type.color }} />
      {type.name}
    </span>
  );
}

// ─── Card ────────────────────────────────────────────────────
function Card({ children, style = {}, onClick, padding = 16, ...rest }) {
  const t = useTheme();
  return (
    <div onClick={onClick} style={{
      background: t.surface,
      borderRadius: 22,
      padding,
      boxShadow: t.shadow,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.1s',
      ...style,
    }} {...rest}>
      {children}
    </div>
  );
}

// ─── Section header ──────────────────────────────────────────
function SectionLabel({ children, action, onAction }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '4px 20px 8px',
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: t.textMuted }}>{children}</div>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', color: t.accent,
          fontSize: 14, fontWeight: 600, padding: 0, cursor: 'pointer',
        }}>{action}</button>
      )}
    </div>
  );
}

// ─── KPI ─────────────────────────────────────────────────────
function KPI({ label, value, unit, delta, deltaTone, sparkline, icon, accent }) {
  const t = useTheme();
  return (
    <Card padding={14} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>
        {icon && <span style={{ color: accent || t.accent, display: 'flex' }}><Icon name={icon} size={13} stroke={2.2} /></span>}
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: t.text, letterSpacing: -0.6, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, fontWeight: 600, color: t.textMuted }}>{unit}</span>}
        {delta && (
          <span style={{
            marginLeft: 'auto', fontSize: 11, fontWeight: 700,
            color: deltaTone === 'down' ? t.success : t.success,
          }}>{delta}</span>
        )}
      </div>
      {sparkline && <div style={{ height: 28, marginTop: 2 }}>{sparkline}</div>}
    </Card>
  );
}

// ─── Sparkline ───────────────────────────────────────────────
function Sparkline({ values, color, fill = true, height = 28 }) {
  const t = useTheme();
  if (!values || values.length < 2) return <div style={{ height, color: t.textSubtle, fontSize: 11 }}>—</div>;
  const w = 100, h = height;
  const min = Math.min(...values), maxV = Math.max(...values);
  const range = maxV - min || 1;
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - ((v - min) / range) * (h - 4) - 2,
  ]);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  const c = color || t.accent;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      {fill && (
        <>
          <defs>
            <linearGradient id={`g${c.replace('#','')}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={c} stopOpacity="0.28"/>
              <stop offset="1" stopColor={c} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#g${c.replace('#','')})`} />
        </>
      )}
      <path d={path} fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Botón primario ──────────────────────────────────────────
function Button({ children, onClick, variant = 'primary', disabled = false, full = false, size = 'md', style = {} }) {
  const t = useTheme();
  const styles = {
    primary: { bg: t.accent, fg: '#fff', border: 'transparent' },
    secondary: { bg: t.surfaceSunken, fg: t.text, border: 'transparent' },
    ghost: { bg: 'transparent', fg: t.accent, border: 'transparent' },
    danger: { bg: 'transparent', fg: '#D94B4B', border: 'transparent' },
  }[variant];
  const sizes = { sm: { py: 8, px: 14, fs: 13, br: 10 }, md: { py: 12, px: 18, fs: 15, br: 14 }, lg: { py: 14, px: 22, fs: 16, br: 16 } }[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: styles.bg, color: styles.fg, border: 'none',
      padding: `${sizes.py}px ${sizes.px}px`, borderRadius: sizes.br,
      fontSize: sizes.fs, fontWeight: 600, letterSpacing: -0.1,
      width: full ? '100%' : undefined,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      fontFamily: 'inherit',
      ...style,
    }}>{children}</button>
  );
}

// ─── Sheet (modal bottom sheet) ──────────────────────────────
function Sheet({ open, onClose, children, title, height = '90%' }) {
  const t = useTheme();
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: t.scrim,
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 0.18s ease',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: t.surface,
        width: '100%', maxHeight: height, height,
        borderTopLeftRadius: 26, borderTopRightRadius: 26,
        boxShadow: t.shadow,
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.24s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{
          padding: '10px 0 4px', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ width: 36, height: 5, borderRadius: 99, background: t.border }} />
        </div>
        {title && (
          <div style={{
            padding: '10px 20px 4px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>{title}</div>
            <button onClick={onClose} style={{
              background: t.surfaceSunken, border: 'none', borderRadius: 99,
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: t.textMuted, cursor: 'pointer',
            }}><Icon name="close" size={18} /></button>
          </div>
        )}
        <div style={{ overflow: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Input field ─────────────────────────────────────────────
function Field({ label, children, hint, inline = false }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', flexDirection: inline ? 'row' : 'column', gap: inline ? 12 : 6,
      alignItems: inline ? 'center' : 'stretch', justifyContent: inline ? 'space-between' : 'flex-start',
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.textMuted, letterSpacing: 0.1 }}>{label}</div>
      <div style={{ flex: inline ? 1 : undefined }}>{children}</div>
      {hint && <div style={{ fontSize: 11, color: t.textSubtle }}>{hint}</div>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', style = {}, suffix, align }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: t.surfaceSunken, borderRadius: 12,
      padding: '11px 14px', gap: 8,
    }}>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type}
        inputMode={type === 'number' ? 'decimal' : undefined}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: 16, color: t.text, fontFamily: 'inherit', textAlign: align,
          minWidth: 0, padding: 0,
          ...style,
        }} />
      {suffix && <span style={{ color: t.textMuted, fontSize: 13, fontWeight: 600 }}>{suffix}</span>}
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────
function Empty({ icon = 'info', title, subtitle, action, onAction }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      padding: '36px 28px', textAlign: 'center',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 99, background: t.surfaceSunken,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textMuted,
      }}>
        <Icon name={icon} size={22} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.45 }}>{subtitle}</div>}
      {action && <div style={{ marginTop: 6 }}><Button onClick={onAction} size="sm">{action}</Button></div>}
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────
function Toast({ message, kind = 'success', onDone }) {
  const t = useTheme();
  React.useEffect(() => {
    const id = setTimeout(onDone, 2400);
    return () => clearTimeout(id);
  }, []);
  const colors = {
    success: { bg: t.success, fg: '#fff' },
    error: { bg: '#D94B4B', fg: '#fff' },
    warning: { bg: '#E29A2E', fg: '#fff' },
  }[kind];
  return (
    <div style={{
      position: 'absolute', bottom: 110, left: 16, right: 16, zIndex: 200,
      background: colors.bg, color: colors.fg,
      borderRadius: 16, padding: '12px 16px',
      fontSize: 14, fontWeight: 600, letterSpacing: -0.1,
      boxShadow: t.shadow,
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'slideUp 0.24s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <Icon name={kind === 'success' ? 'check' : 'info'} size={18} stroke={2.5} />
      {message}
    </div>
  );
}

Object.assign(window, {
  fmtDate, daysAgo, relativeDay, sum, max,
  Icon, TypePill, Card, SectionLabel, KPI, Sparkline,
  Button, Sheet, Field, TextInput, Empty, Toast,
});


// ──── src/charts.jsx ────
// Chart components — line + bar

function LineChart({ data, color, height = 160, unit = '', formatY = (v) => v, formatX = (v) => v, padding = { top: 16, right: 16, bottom: 24, left: 36 } }) {
  const t = useTheme();
  const ref = React.useRef(null);
  const [hover, setHover] = React.useState(null);
  const [width, setWidth] = React.useState(320);

  React.useEffect(() => {
    if (ref.current) setWidth(ref.current.clientWidth);
    const r = new ResizeObserver(entries => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    if (ref.current) r.observe(ref.current);
    return () => r.disconnect();
  }, []);

  if (!data || data.length < 2) {
    return <Empty icon="info" title="Faltan datos" subtitle="Registra al menos 2 entrenamientos con esta métrica para ver la gráfica." />;
  }

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const min = Math.min(...data.map(d => d.y));
  const maxV = Math.max(...data.map(d => d.y));
  const range = maxV - min || 1;
  const yMin = min - range * 0.1;
  const yMax = maxV + range * 0.1;
  const yRange = yMax - yMin;
  const xAt = (i) => padding.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const yAt = (v) => padding.top + innerH - ((v - yMin) / yRange) * innerH;

  const pts = data.map((d, i) => [xAt(i), yAt(d.y)]);
  const path = pts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');
  const area = `${path} L${pts[pts.length-1][0]},${padding.top + innerH} L${pts[0][0]},${padding.top + innerH} Z`;

  // Y ticks (3 lines)
  const ticks = [yMin + yRange * 0.15, yMin + yRange * 0.5, yMin + yRange * 0.85];

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.round(((x - padding.left) / innerW) * (data.length - 1));
    if (idx >= 0 && idx < data.length) setHover(idx);
  };

  return (
    <div ref={ref} style={{ width: '100%', position: 'relative', userSelect: 'none', touchAction: 'pan-y' }}>
      <svg width={width} height={height}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const rect = e.currentTarget.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const idx = Math.round(((x - padding.left) / innerW) * (data.length - 1));
          if (idx >= 0 && idx < data.length) setHover(idx);
        }}
        onTouchEnd={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`lcg-${color.replace('#','')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.26" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid */}
        {ticks.map((v, i) => (
          <g key={i}>
            <line x1={padding.left} x2={width - padding.right} y1={yAt(v)} y2={yAt(v)}
              stroke={t.chartGrid} strokeWidth="1" />
            <text x={padding.left - 6} y={yAt(v) + 3} fontSize="9" fontWeight="600" fill={t.textSubtle} textAnchor="end">
              {formatY(v)}
            </text>
          </g>
        ))}

        {/* Area */}
        <path d={area} fill={`url(#lcg-${color.replace('#','')})`} />
        {/* Line */}
        <path d={path} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />

        {/* Points */}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={hover === i ? 5 : 3} fill={t.surface} stroke={color} strokeWidth={hover === i ? 2.5 : 2} />
        ))}

        {/* X labels (sparse) */}
        {data.map((d, i) => {
          if (data.length > 6 && i % Math.ceil(data.length / 5) !== 0 && i !== data.length - 1) return null;
          return (
            <text key={i} x={xAt(i)} y={height - 6} fontSize="9" fontWeight="600" fill={t.textSubtle} textAnchor="middle">
              {formatX(d.x)}
            </text>
          );
        })}

        {/* Hover */}
        {hover !== null && (
          <g>
            <line x1={xAt(hover)} x2={xAt(hover)} y1={padding.top} y2={padding.top + innerH} stroke={t.textSubtle} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {hover !== null && (
        <div style={{
          position: 'absolute',
          left: Math.max(8, Math.min(xAt(hover) - 50, width - 108)),
          top: yAt(data[hover].y) - 50,
          background: t.text, color: t.surface,
          borderRadius: 8, padding: '6px 10px',
          fontSize: 11, fontWeight: 600, lineHeight: 1.3,
          minWidth: 84, pointerEvents: 'none',
          boxShadow: t.shadow,
        }}>
          <div style={{ opacity: 0.7, fontSize: 10 }}>{formatX(data[hover].x, true)}</div>
          <div style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatY(data[hover].y)}{unit}</div>
        </div>
      )}
    </div>
  );
}

function BarChart({ data, color, height = 120, formatY = (v) => v, formatX = (v) => v }) {
  const t = useTheme();
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(320);
  React.useEffect(() => {
    if (ref.current) setWidth(ref.current.clientWidth);
    const r = new ResizeObserver(entries => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    if (ref.current) r.observe(ref.current);
    return () => r.disconnect();
  }, []);

  if (!data || data.length < 1) return <Empty icon="info" title="Faltan datos" />;

  const padding = { top: 12, right: 8, bottom: 22, left: 8 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const maxV = Math.max(...data.map(d => d.y), 1);
  const barW = innerW / data.length * 0.65;
  const gap = innerW / data.length * 0.35;

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const h = (d.y / maxV) * innerH;
          const x = padding.left + (i + 0.5) * (innerW / data.length) - barW / 2;
          const y = padding.top + innerH - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={h || 1} rx="3" fill={color} opacity={0.85} />
              <text x={x + barW/2} y={height - 6} fontSize="9" fontWeight="600" fill={t.textSubtle} textAnchor="middle">
                {formatX(d.x)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

window.LineChart = LineChart;
window.BarChart = BarChart;


// ──── src/shell.jsx ────
// Store + navigation shell

function useStore() {
  // Workouts sorted by date desc (most recent first)
  const sortedWorkouts = [...window.WORKOUTS].sort((a, b) => b.date.localeCompare(a.date));
  const [workouts, setWorkouts] = React.useState(sortedWorkouts);
  const [exercises, setExercises] = React.useState(window.EXERCISES);
  const sortedBW = [...window.BODY_WEIGHT].sort((a, b) => b.entry_date.localeCompare(a.entry_date));
  const [bodyWeight, setBodyWeight] = React.useState(sortedBW);
  const [trainingTypes] = React.useState(window.TRAINING_TYPES);

  const getType = React.useCallback((id) => trainingTypes.find(t => t.id === id), [trainingTypes]);
  const getEx = React.useCallback((id) => exercises.find(e => e.id === id), [exercises]);

  const addWorkout = (w) => setWorkouts(prev => [{ id: 'w-new-' + Date.now(), exercises: [], ...w }, ...prev]
    .sort((a, c) => c.date.localeCompare(a.date)));
  const addExercise = (e) => setExercises(prev => [...prev, { id: 'ex-new-' + Date.now(), ...e }]);
  const addBodyWeight = (b) => setBodyWeight(prev => [{ ...b }, ...prev].sort((a, c) => c.entry_date.localeCompare(a.entry_date)));

  return {
    workouts, exercises, bodyWeight, trainingTypes,
    getType, getEx,
    addWorkout, addExercise, addBodyWeight,
  };
}

// Compute aggregations for an exercise across all workouts
function exerciseProgress(exerciseId, workouts) {
  const rows = [];
  for (const w of workouts) {
    for (const we of w.exercises) {
      if (we.exercise_id !== exerciseId) continue;
      const sets = we.sets || [];
      const maxWeight = max(sets.filter(s => s.weight), s => s.weight);
      const volume = sum(sets, s => (s.weight && s.reps) ? s.weight * s.reps : 0);
      const totalReps = sum(sets, s => s.reps || 0);
      const totalDur = sum(sets, s => s.duration_seconds || 0);
      const totalDist = sum(sets, s => s.distance_meters || 0);
      const maxH = max(sets, s => s.height_cm || 0);
      rows.push({
        date: w.date, workout_id: w.id, training_type_id: we.training_type_id,
        sets_count: sets.length,
        max_weight: maxWeight || null,
        volume: volume || null,
        total_reps: totalReps || null,
        total_duration: totalDur || null,
        total_distance: totalDist || null,
        max_height: maxH || null,
      });
    }
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Top bar with large title ────────────────────────────────
function TopBar({ title, subtitle, onBack, action, statusDark }) {
  const t = useTheme();
  return (
    <div style={{ padding: '50px 20px 8px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36, marginBottom: 4 }}>
        {onBack ? (
          <button onClick={onBack} style={{
            background: t.surface, border: 'none', borderRadius: 99,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: t.text, cursor: 'pointer', boxShadow: t.shadowSm,
          }}><Icon name="back" size={18} stroke={2.2} /></button>
        ) : <div style={{ width: 36 }} />}
        {action || <div style={{ width: 36 }} />}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: t.text, letterSpacing: -0.8, lineHeight: 1.08 }}>{title}</div>
      {subtitle && <div style={{ marginTop: 4, fontSize: 14, color: t.textMuted }}>{subtitle}</div>}
    </div>
  );
}

// ─── Tab bar ─────────────────────────────────────────────────
function TabBar({ active, onChange, onNew }) {
  const t = useTheme();
  const tabs = [
    { id: 'home',     label: 'Resumen',    icon: 'home' },
    { id: 'history',  label: 'Historial',  icon: 'list' },
    { id: 'fab',      label: '',           icon: 'plus' },
    { id: 'progress', label: 'Progresión', icon: 'chart' },
    { id: 'more',     label: 'Más',        icon: 'more' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 6,
      background: t.surface,
      borderTop: `0.5px solid ${t.border}`,
      zIndex: 30,
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '0 4px' }}>
        {tabs.map(tab => {
          if (tab.id === 'fab') {
            return (
              <button key="fab" onClick={onNew} style={{
                background: t.accent, color: '#fff',
                width: 56, height: 56, borderRadius: 99,
                border: `4px solid ${t.surface}`, marginTop: -22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(226,106,74,0.4)',
              }}><Icon name="plus" size={26} stroke={2.6} /></button>
            );
          }
          const isActive = tab.id === active;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 0 2px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: isActive ? t.accent : t.textSubtle,
            }}>
              <Icon name={tab.icon} size={22} stroke={isActive ? 2.2 : 1.8} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.2 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { useStore, exerciseProgress, TopBar, TabBar });


// ──── src/pages/home.jsx ────
// Página Inicio (Resumen) — dashboard

function PageHome({ store, onNav, onOpenWorkout }) {
  const t = useTheme();
  const { workouts, exercises, bodyWeight, trainingTypes, getType, getEx } = store;

  const lastWorkout = workouts[0];
  const lastWeight = bodyWeight[0];

  // últimos 7 días
  const last7 = workouts.filter(w => daysAgo(w.date) <= 7);
  const last30 = workouts.filter(w => daysAgo(w.date) <= 30);

  // volumen total 30d
  const volume30 = sum(last30.flatMap(w => w.exercises.flatMap(e => e.sets)),
    s => (s.weight && s.reps) ? s.weight * s.reps : 0);

  // sparkline: volumen por entrenamiento, últimos 30d
  const volSpark = last30.slice().reverse().map(w =>
    sum(w.exercises.flatMap(e => e.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0)
  );

  // sparkline peso corporal
  const wSpark = bodyWeight.slice(0, 8).reverse().map(b => b.weight);

  // distribución por tipo (últimos 30d) → series count por tipo
  const typeCount = {};
  for (const w of last30) {
    for (const we of w.exercises) {
      typeCount[we.training_type_id] = (typeCount[we.training_type_id] || 0) + (we.sets?.length || 0);
    }
  }
  const totalSeries = Object.values(typeCount).reduce((a, b) => a + b, 0);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Hola 👋"
        subtitle={`${fmtDate('2026-05-10', { long: true })} · ${last7.length} ${last7.length === 1 ? 'entrenamiento' : 'entrenamientos'} esta semana`}
      />

      {/* KPI Grid */}
      <div style={{ padding: '8px 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <KPI
          label="ENTRENAMIENTOS"
          value={workouts.length}
          icon="dumbbell"
          delta={`+${last7.length} 7d`}
          sparkline={<Sparkline values={volSpark} />}
        />
        <KPI
          label="VOLUMEN 30D"
          value={Math.round(volume30 / 1000).toLocaleString('es')}
          unit="t"
          icon="bolt"
          accent="#7B5CD6"
          sparkline={<Sparkline values={volSpark} color="#7B5CD6" />}
        />
        <KPI
          label="PESO CORPORAL"
          value={lastWeight ? lastWeight.weight.toFixed(1) : '—'}
          unit="kg"
          icon="body"
          accent="#3A82C4"
          delta={lastWeight && bodyWeight[7] ? `${(lastWeight.weight - bodyWeight[7].weight).toFixed(1)}` : null}
          deltaTone="down"
          sparkline={<Sparkline values={wSpark} color="#3A82C4" />}
        />
        <KPI
          label="EJERCICIOS"
          value={exercises.length}
          icon="target"
          accent="#3DA37A"
        />
      </div>

      {/* Último entrenamiento */}
      <SectionLabel>Último entrenamiento</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card onClick={() => onOpenWorkout(lastWorkout.id)} padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: t.textMuted, textTransform: 'uppercase' }}>
                {relativeDay(lastWorkout.date)} · {fmtDate(lastWorkout.date)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.text, marginTop: 2 }}>{lastWorkout.name}</div>
            </div>
            <Icon name="chev" size={16} color={t.textSubtle} stroke={2.2} />
          </div>
          <div style={{ height: 1, background: t.border }} />
          <div style={{ padding: '10px 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lastWorkout.exercises.map((we, i) => {
              const ex = getEx(we.exercise_id);
              const ty = getType(we.training_type_id);
              const setsCount = we.sets.length;
              const maxW = max(we.sets, s => s.weight || 0);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{ex?.name}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 3 }}>
                      <TypePill type={ty} size="sm" />
                      <span style={{ fontSize: 12, color: t.textMuted }}>
                        {setsCount} {setsCount === 1 ? 'serie' : 'series'}{maxW ? ` · ${maxW}kg` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Distribución por tipo (30d) */}
      <SectionLabel>Distribución 30 días</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, letterSpacing: 0.2, marginBottom: 10 }}>
            {totalSeries} series totales
          </div>
          {/* Barra stacked */}
          <div style={{ display: 'flex', height: 12, borderRadius: 99, overflow: 'hidden', background: t.surfaceSunken }}>
            {trainingTypes.map(tt => {
              const pct = totalSeries ? (typeCount[tt.id] || 0) / totalSeries * 100 : 0;
              if (!pct) return null;
              return <div key={tt.id} style={{ width: `${pct}%`, background: tt.color }} />;
            })}
          </div>
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 8, columnGap: 16 }}>
            {trainingTypes.map(tt => {
              const count = typeCount[tt.id] || 0;
              const pct = totalSeries ? Math.round(count / totalSeries * 100) : 0;
              return (
                <div key={tt.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: tt.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.text, flex: 1 }}>{tt.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <SectionLabel>Acciones rápidas</SectionLabel>
      <div style={{ padding: '0 16px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <QuickAction icon="weight" label="Registrar peso" color="#3A82C4" onClick={() => onNav('body-weight')} />
        <QuickAction icon="dumbbell" label="Nuevo ejercicio" color="#3DA37A" onClick={() => onNav('exercises')} />
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }) {
  const t = useTheme();
  return (
    <Card onClick={onClick} padding={14} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12,
        background: color + '1A', color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={20} stroke={2} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
    </Card>
  );
}

window.PageHome = PageHome;


// ──── src/pages/new-workout.jsx ────
// Página Nuevo Entrenamiento — flujo principal

function PageNewWorkout({ store, onBack, onSaved }) {
  const t = useTheme();
  const { exercises, trainingTypes, getEx, getType, addWorkout } = store;

  const today = new Date('2026-05-10').toISOString().slice(0, 10);
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState(today);
  const [notes, setNotes] = React.useState('');
  const [showNotes, setShowNotes] = React.useState(false);
  const [items, setItems] = React.useState([]); // [{exercise_id, training_type_id, notes, sets:[...]}]
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const totalSets = sum(items, it => it.sets.length);
  const totalVolume = sum(items.flatMap(it => it.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0);

  const addExerciseToWorkout = (ex) => {
    setItems(prev => [...prev, {
      exercise_id: ex.id,
      training_type_id: ex.default_type || 'tt-otr',
      notes: '',
      sets: [{ set_number: 1 }],
    }]);
    setPickerOpen(false);
  };

  const updateItem = (idx, fn) => setItems(prev => prev.map((it, i) => i === idx ? fn(it) : it));
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));

  const addSet = (idx) => updateItem(idx, it => {
    const last = it.sets[it.sets.length - 1] || {};
    return { ...it, sets: [...it.sets, {
      set_number: it.sets.length + 1,
      // copy hints from last set
      weight: last.weight, reps: last.reps,
    }]};
  });

  const updateSet = (itemIdx, setIdx, patch) => updateItem(itemIdx, it => ({
    ...it,
    sets: it.sets.map((s, i) => i === setIdx ? { ...s, ...patch } : s),
  }));

  const removeSet = (itemIdx, setIdx) => updateItem(itemIdx, it => ({
    ...it,
    sets: it.sets.filter((_, i) => i !== setIdx).map((s, i) => ({ ...s, set_number: i + 1 })),
  }));

  const canSave = name.trim() && items.length > 0 && items.every(it => it.sets.length > 0);

  const handleSave = () => {
    if (!canSave) return;
    addWorkout({
      date,
      name: name.trim(),
      notes: notes.trim() || undefined,
      exercises: items,
    });
    onSaved && onSaved();
  };

  return (
    <div style={{ paddingBottom: 140 }}>
      <TopBar
        title="Nuevo entrenamiento"
        onBack={onBack}
        action={
          <button onClick={handleSave} disabled={!canSave} style={{
            background: canSave ? t.accent : t.surfaceSunken,
            color: canSave ? '#fff' : t.textSubtle,
            border: 'none', borderRadius: 99,
            padding: '8px 16px', fontSize: 14, fontWeight: 700,
            cursor: canSave ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}>Guardar</button>
        }
      />

      {/* Form básico */}
      <div style={{ padding: '4px 16px 12px' }}>
        <Card padding={0}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del entrenamiento"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 20, fontWeight: 700, color: t.text,
                fontFamily: 'inherit', letterSpacing: -0.3,
                padding: 0, width: '100%',
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              {['Pierna — fuerza', 'Empuje', 'Tirón', 'Salto + potencia'].slice(0, 3).map(suggest => (
                <button key={suggest} onClick={() => setName(suggest)} style={{
                  background: t.surfaceSunken, border: 'none', borderRadius: 99,
                  padding: '5px 10px', fontSize: 11, fontWeight: 600,
                  color: t.textMuted, cursor: 'pointer', fontFamily: 'inherit',
                }}>{suggest}</button>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: t.border }} />
          <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="calendar" size={18} color={t.textMuted} stroke={1.8} />
            <input
              type="date" value={date} onChange={(e) => setDate(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 15, fontWeight: 600, color: t.text, fontFamily: 'inherit',
              }}
            />
            <span style={{ fontSize: 13, color: t.textMuted }}>{relativeDay(date)}</span>
          </div>
          <div style={{ height: 1, background: t.border }} />
          {showNotes ? (
            <div style={{ padding: '10px 16px' }}>
              <textarea
                value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Notas del entrenamiento…"
                rows={2}
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 14, color: t.text, fontFamily: 'inherit', resize: 'none',
                  padding: 0,
                }}
              />
            </div>
          ) : (
            <button onClick={() => setShowNotes(true)} style={{
              width: '100%', padding: '10px 16px', textAlign: 'left',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 500, color: t.textMuted, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon name="plusSm" size={16} /> Añadir notas
            </button>
          )}
        </Card>
      </div>

      {/* Resumen sticky */}
      {items.length > 0 && (
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8 }}>
          <SummaryPill label="Ejercicios" value={items.length} />
          <SummaryPill label="Series" value={totalSets} />
          {totalVolume > 0 && <SummaryPill label="Volumen" value={`${(totalVolume / 1000).toFixed(1)}t`} />}
        </div>
      )}

      {/* Items */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, idx) => (
          <WorkoutItem
            key={idx} idx={idx} item={item}
            getEx={getEx} getType={getType} trainingTypes={trainingTypes}
            onChangeType={(typeId) => updateItem(idx, it => ({ ...it, training_type_id: typeId }))}
            onChangeNotes={(n) => updateItem(idx, it => ({ ...it, notes: n }))}
            onRemove={() => removeItem(idx)}
            onAddSet={() => addSet(idx)}
            onUpdateSet={(sIdx, patch) => updateSet(idx, sIdx, patch)}
            onRemoveSet={(sIdx) => removeSet(idx, sIdx)}
          />
        ))}
      </div>

      {/* Add exercise button */}
      <div style={{ padding: '14px 16px' }}>
        <button onClick={() => setPickerOpen(true)} style={{
          width: '100%', padding: '14px',
          background: t.surface, color: t.accent,
          border: `1.5px dashed ${t.accent}55`,
          borderRadius: 16, cursor: 'pointer',
          fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icon name="plus" size={18} stroke={2.4} />
          Añadir ejercicio
        </button>
      </div>

      <ExercisePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        exercises={exercises} trainingTypes={trainingTypes} getType={getType}
        onPick={addExerciseToWorkout}
      />
    </div>
  );
}

function SummaryPill({ label, value }) {
  const t = useTheme();
  return (
    <div style={{
      flex: 1, background: t.surface, borderRadius: 12,
      padding: '8px 12px', boxShadow: t.shadowSm,
      display: 'flex', flexDirection: 'column', gap: 0,
    }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 16, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

// ─── Item del entrenamiento ──────────────────────────────────
function WorkoutItem({ idx, item, getEx, getType, trainingTypes, onChangeType, onChangeNotes, onRemove, onAddSet, onUpdateSet, onRemoveSet }) {
  const t = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [typeOpen, setTypeOpen] = React.useState(false);
  const ex = getEx(item.exercise_id);
  const currentType = getType(item.training_type_id);

  return (
    <Card padding={0}>
      {/* Header */}
      <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, background: currentType.color + '20',
          color: currentType.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>{idx + 1}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{ex?.name}</div>
          <button onClick={() => setTypeOpen(true)} style={{
            background: 'none', border: 'none', padding: '4px 0 0', cursor: 'pointer', display: 'flex',
          }}>
            <TypePill type={currentType} size="sm" />
            <span style={{ marginLeft: 4, color: t.textSubtle, display: 'flex', alignItems: 'center' }}>
              <Icon name="chevDn" size={12} stroke={2.5} />
            </span>
          </button>
        </div>
        <button onClick={onRemove} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          color: t.textSubtle,
        }}><Icon name="close" size={18} /></button>
      </div>

      {/* Type picker dropdown */}
      {typeOpen && (
        <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {trainingTypes.map(tt => {
            const active = tt.id === item.training_type_id;
            return (
              <button key={tt.id} onClick={() => { onChangeType(tt.id); setTypeOpen(false); }} style={{
                background: active ? tt.color : tt.color + '14',
                color: active ? '#fff' : tt.color,
                border: 'none', borderRadius: 99,
                padding: '6px 12px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{tt.name}</button>
            );
          })}
        </div>
      )}

      {/* Series header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px',
        gap: 8, padding: '8px 16px 6px',
        fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: t.textSubtle, textTransform: 'uppercase',
      }}>
        <div>#</div>
        <div>Peso</div>
        <div>Reps</div>
        <div></div>
      </div>

      {/* Series */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {item.sets.map((set, sIdx) => (
          <SetRow
            key={sIdx} set={set} number={sIdx + 1}
            onUpdate={(patch) => onUpdateSet(sIdx, patch)}
            onRemove={() => onRemoveSet(sIdx)}
          />
        ))}
      </div>

      {/* Add set */}
      <button onClick={onAddSet} style={{
        width: '100%', padding: '12px 16px',
        background: 'none', border: 'none', borderTop: `1px solid ${t.border}`,
        cursor: 'pointer',
        fontSize: 13, fontWeight: 600, color: t.accent, fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        <Icon name="plusSm" size={14} stroke={2.4} />
        Añadir serie
      </button>
    </Card>
  );
}

// ─── Set Row ─────────────────────────────────────────────────
function SetRow({ set, number, onUpdate, onRemove }) {
  const t = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const isComplete = (set.weight && set.reps) || set.duration_seconds || set.distance_meters || set.height_cm;

  return (
    <div style={{
      borderTop: `1px solid ${t.border}`,
      background: isComplete ? 'transparent' : 'transparent',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px',
        gap: 8, padding: '8px 16px', alignItems: 'center',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 99,
          background: isComplete ? t.success + '20' : t.surfaceSunken,
          color: isComplete ? t.success : t.textMuted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
        }}>{number}</div>
        <NumberCell value={set.weight} onChange={(v) => onUpdate({ weight: v })} unit="kg" />
        <NumberCell value={set.reps} onChange={(v) => onUpdate({ reps: v })} integer />
        <button onClick={() => setExpanded(e => !e)} style={{
          background: expanded ? t.accentSoft : 'transparent', border: 'none', cursor: 'pointer',
          width: 28, height: 28, borderRadius: 99,
          color: expanded ? t.accent : t.textMuted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={expanded ? 'chevDn' : 'more'} size={16} stroke={2.2} />
        </button>
      </div>
      {expanded && (
        <div style={{
          padding: '0 16px 12px', display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
        }}>
          <ExtraCell label="DURACIÓN" value={set.duration_seconds} onChange={(v) => onUpdate({ duration_seconds: v })} unit="s" />
          <ExtraCell label="DISTANCIA" value={set.distance_meters} onChange={(v) => onUpdate({ distance_meters: v })} unit="m" />
          <ExtraCell label="ALTURA" value={set.height_cm} onChange={(v) => onUpdate({ height_cm: v })} unit="cm" />
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
            <input
              value={set.intensity_notes || ''}
              onChange={(e) => onUpdate({ intensity_notes: e.target.value })}
              placeholder="Intensidad (ej. rápido, PR)"
              style={{
                flex: 1, background: t.surfaceSunken, border: 'none', outline: 'none',
                borderRadius: 10, padding: '8px 12px',
                fontSize: 13, color: t.text, fontFamily: 'inherit',
              }}
            />
            <button onClick={onRemove} style={{
              background: 'none', border: 'none', color: '#D94B4B',
              fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
              padding: '0 4px',
            }}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function NumberCell({ value, onChange, unit, integer }) {
  const t = useTheme();
  return (
    <div style={{
      background: t.surfaceSunken, borderRadius: 10,
      padding: '8px 10px', display: 'flex', alignItems: 'baseline', gap: 4,
    }}>
      <input
        value={value ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          if (v === '') return onChange(undefined);
          const parsed = integer ? parseInt(v, 10) : parseFloat(v);
          if (!isNaN(parsed)) onChange(parsed);
        }}
        inputMode="decimal"
        placeholder="—"
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: 15, fontWeight: 600, color: t.text, fontFamily: 'inherit',
          minWidth: 0, padding: 0, fontVariantNumeric: 'tabular-nums',
        }}
      />
      {unit && <span style={{ fontSize: 11, fontWeight: 600, color: t.textSubtle }}>{unit}</span>}
    </div>
  );
}

function ExtraCell({ label, value, onChange, unit }) {
  const t = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.5 }}>{label}</span>
      <NumberCell value={value} onChange={onChange} unit={unit} />
    </div>
  );
}

// ─── Exercise picker sheet ───────────────────────────────────
function ExercisePicker({ open, onClose, exercises, trainingTypes, getType, onPick }) {
  const t = useTheme();
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState(null);

  const filtered = exercises.filter(ex => {
    if (q && !ex.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter && ex.default_type !== filter) return false;
    return true;
  });

  return (
    <Sheet open={open} onClose={onClose} title="Añadir ejercicio" height="80%">
      <div style={{ padding: '8px 20px 12px' }}>
        <div style={{
          background: t.surfaceSunken, borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="search" size={18} color={t.textMuted} stroke={2} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar ejercicio"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit',
            }}/>
        </div>
        <div style={{ display: 'flex', gap: 6, overflow: 'auto', marginTop: 10, paddingBottom: 4 }}>
          <FilterChip active={!filter} onClick={() => setFilter(null)}>Todos</FilterChip>
          {trainingTypes.map(tt => (
            <FilterChip key={tt.id} active={filter === tt.id} color={tt.color} onClick={() => setFilter(filter === tt.id ? null : tt.id)}>
              {tt.name}
            </FilterChip>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(ex => {
          const ty = getType(ex.default_type);
          return (
            <button key={ex.id} onClick={() => onPick(ex)} style={{
              background: t.surfaceAlt, border: 'none', borderRadius: 14,
              padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: ty?.color + '20', color: ty?.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="dumbbell" size={18} stroke={2} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{ex.name}</div>
                {ty && <div style={{ marginTop: 3 }}><TypePill type={ty} size="sm" /></div>}
              </div>
              <Icon name="plus" size={20} color={t.accent} stroke={2.4} />
            </button>
          );
        })}
        {filtered.length === 0 && (
          <Empty icon="search" title="Sin resultados" subtitle="Prueba con otra búsqueda o crea un ejercicio nuevo." />
        )}
      </div>
    </Sheet>
  );
}

function FilterChip({ children, active, color, onClick }) {
  const t = useTheme();
  return (
    <button onClick={onClick} style={{
      background: active ? (color || t.text) : t.surfaceSunken,
      color: active ? '#fff' : t.textMuted,
      border: 'none', borderRadius: 99,
      padding: '6px 12px', fontSize: 12, fontWeight: 600,
      cursor: 'pointer', fontFamily: 'inherit',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>{children}</button>
  );
}

window.PageNewWorkout = PageNewWorkout;


// ──── src/pages/history.jsx ────
// Página Historial

function PageHistory({ store, onOpenWorkout }) {
  const t = useTheme();
  const { workouts, getEx, getType } = store;

  // Group by week
  const grouped = React.useMemo(() => {
    const groups = {};
    for (const w of workouts) {
      const ago = daysAgo(w.date);
      let key;
      if (ago <= 0) key = 'Esta semana';
      else if (ago <= 7) key = 'Esta semana';
      else if (ago <= 14) key = 'La semana pasada';
      else if (ago <= 30) key = 'Este mes';
      else if (ago <= 60) key = 'Mes pasado';
      else key = 'Anteriores';
      (groups[key] = groups[key] || []).push(w);
    }
    return groups;
  }, [workouts]);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Historial"
        subtitle={`${workouts.length} entrenamientos`}
      />

      {Object.entries(grouped).map(([label, list]) => (
        <div key={label}>
          <SectionLabel>{label}</SectionLabel>
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {list.map(w => <WorkoutCard key={w.id} workout={w} getEx={getEx} getType={getType} onClick={() => onOpenWorkout(w.id)} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkoutCard({ workout, getEx, getType, onClick }) {
  const t = useTheme();
  const totalSets = sum(workout.exercises, e => e.sets.length);
  const types = [...new Set(workout.exercises.map(e => e.training_type_id))]
    .map(id => getType(id)).filter(Boolean);
  const volume = sum(workout.exercises.flatMap(e => e.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0);

  return (
    <Card onClick={onClick} padding={14}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: types[0]?.color + '18' || t.surfaceSunken,
          color: types[0]?.color || t.textMuted,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{workout.date.slice(8, 10)}</span>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 1 }}>
            {fmtDate(workout.date).slice(-3)}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{workout.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
            {types.map(ty => <TypePill key={ty.id} type={ty} size="sm" />)}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>{totalSets} series</div>
          {volume > 0 && <div style={{ fontSize: 11, color: t.textSubtle, marginTop: 2 }}>{(volume / 1000).toFixed(1)}t vol</div>}
        </div>
      </div>
    </Card>
  );
}

// ─── Detalle de entrenamiento ────────────────────────────────
function PageWorkoutDetail({ store, workoutId, onBack }) {
  const t = useTheme();
  const { workouts, getEx, getType } = store;
  const w = workouts.find(x => x.id === workoutId);
  if (!w) return null;

  const totalSets = sum(w.exercises, e => e.sets.length);
  const totalVolume = sum(w.exercises.flatMap(e => e.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0);
  const types = [...new Set(w.exercises.map(e => e.training_type_id))].map(id => getType(id)).filter(Boolean);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title={w.name}
        subtitle={fmtDate(w.date, { long: true })}
        onBack={onBack}
      />

      {/* Stats */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', gap: 8 }}>
        <SummaryStat label="Ejercicios" value={w.exercises.length} />
        <SummaryStat label="Series" value={totalSets} />
        {totalVolume > 0 && <SummaryStat label="Volumen" value={`${(totalVolume / 1000).toFixed(1)}t`} />}
      </div>

      {types.length > 0 && (
        <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {types.map(ty => <TypePill key={ty.id} type={ty} size="md" />)}
        </div>
      )}

      {w.notes && (
        <div style={{ padding: '0 16px 12px' }}>
          <Card padding={12} style={{ background: t.accentSoft, boxShadow: 'none', display: 'flex', gap: 8 }}>
            <Icon name="info" size={16} color={t.accent} />
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.4 }}>{w.notes}</div>
          </Card>
        </div>
      )}

      {/* Ejercicios */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {w.exercises.map((we, i) => (
          <ExerciseDetailCard
            key={i} we={we} getEx={getEx} getType={getType} idx={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

function SummaryStat({ label, value }) {
  const t = useTheme();
  return (
    <Card padding={12} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </Card>
  );
}

function ExerciseDetailCard({ we, getEx, getType, idx }) {
  const t = useTheme();
  const ex = getEx(we.exercise_id);
  const ty = getType(we.training_type_id);
  const volume = sum(we.sets, s => (s.weight && s.reps) ? s.weight * s.reps : 0);
  const maxW = max(we.sets, s => s.weight || 0);

  // Detect which columns to show
  const hasWeight = we.sets.some(s => s.weight);
  const hasReps = we.sets.some(s => s.reps);
  const hasDur = we.sets.some(s => s.duration_seconds);
  const hasDist = we.sets.some(s => s.distance_meters);
  const hasH = we.sets.some(s => s.height_cm);

  return (
    <Card padding={0}>
      <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: ty.color + '1A',
          color: ty.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>{idx}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{ex?.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5, flexWrap: 'wrap' }}>
            <TypePill type={ty} size="sm" />
            {maxW > 0 && <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>máx {maxW}kg</span>}
            {volume > 0 && <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>vol {(volume / 1000).toFixed(1)}t</span>}
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `28px ${hasWeight ? '1fr' : ''} ${hasReps ? '1fr' : ''} ${hasDur ? '1fr' : ''} ${hasDist ? '1fr' : ''} ${hasH ? '1fr' : ''}`.replace(/\s+/g, ' ').trim(),
        gap: 8, padding: '6px 16px 4px',
        fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: t.textSubtle, textTransform: 'uppercase',
      }}>
        <div>#</div>
        {hasWeight && <div>Peso</div>}
        {hasReps && <div>Reps</div>}
        {hasDur && <div>Dur</div>}
        {hasDist && <div>Dist</div>}
        {hasH && <div>Alt</div>}
      </div>

      {we.sets.map((s, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: `28px ${hasWeight ? '1fr' : ''} ${hasReps ? '1fr' : ''} ${hasDur ? '1fr' : ''} ${hasDist ? '1fr' : ''} ${hasH ? '1fr' : ''}`.replace(/\s+/g, ' ').trim(),
          gap: 8, padding: '8px 16px',
          borderTop: `1px solid ${t.border}`,
          fontSize: 14, fontVariantNumeric: 'tabular-nums', alignItems: 'center',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 99, background: t.surfaceSunken,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: t.textMuted,
          }}>{s.set_number}</div>
          {hasWeight && <div style={{ color: t.text, fontWeight: 600 }}>{s.weight ? `${s.weight}kg` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasReps && <div style={{ color: t.text, fontWeight: 600 }}>{s.reps ?? <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasDur && <div style={{ color: t.text }}>{s.duration_seconds ? `${s.duration_seconds}s` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasDist && <div style={{ color: t.text }}>{s.distance_meters ? `${s.distance_meters}m` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasH && <div style={{ color: t.text }}>{s.height_cm ? `${s.height_cm}cm` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
        </div>
      ))}

      {/* Intensity / notes */}
      {we.sets.some(s => s.intensity_notes) && (
        <div style={{ padding: '8px 16px 12px', borderTop: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {we.sets.filter(s => s.intensity_notes).map((s, i) => (
            <div key={i} style={{ fontSize: 12, color: t.textMuted }}>
              <span style={{ fontWeight: 700 }}>#{s.set_number}</span> · {s.intensity_notes}
            </div>
          ))}
        </div>
      )}
      {we.notes && (
        <div style={{ padding: '8px 16px 12px', borderTop: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted }}>
          {we.notes}
        </div>
      )}
    </Card>
  );
}

window.PageHistory = PageHistory;
window.PageWorkoutDetail = PageWorkoutDetail;


// ──── src/pages/exercises.jsx ────
// Página Ejercicios

function PageExercises({ store, onBack, onPickForProgress }) {
  const t = useTheme();
  const { exercises, trainingTypes, workouts, getType, addExercise } = store;
  const [filter, setFilter] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [createOpen, setCreateOpen] = React.useState(false);

  const filtered = exercises.filter(ex => {
    if (q && !ex.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === 'none' && ex.default_type) return false;
    else if (filter && filter !== 'none' && ex.default_type !== filter) return false;
    return true;
  });

  // count uses
  const uses = React.useMemo(() => {
    const m = {};
    for (const w of workouts) for (const we of w.exercises) m[we.exercise_id] = (m[we.exercise_id] || 0) + 1;
    return m;
  }, [workouts]);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Ejercicios"
        subtitle={`${exercises.length} en tu catálogo`}
        onBack={onBack}
        action={
          <button onClick={() => setCreateOpen(true)} style={{
            background: t.accent, color: '#fff',
            border: 'none', borderRadius: 99,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(226,106,74,0.3)',
          }}><Icon name="plus" size={20} stroke={2.4} /></button>
        }
      />

      {/* Search + filter */}
      <div style={{ padding: '4px 16px 12px' }}>
        <div style={{
          background: t.surface, borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: t.shadowSm,
        }}>
          <Icon name="search" size={18} color={t.textMuted} stroke={2} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar ejercicio"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit',
            }}/>
        </div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, overflow: 'auto' }}>
        <FilterChip active={!filter} onClick={() => setFilter(null)}>Todos</FilterChip>
        {trainingTypes.map(tt => (
          <FilterChip key={tt.id} active={filter === tt.id} color={tt.color} onClick={() => setFilter(filter === tt.id ? null : tt.id)}>
            {tt.name}
          </FilterChip>
        ))}
        <FilterChip active={filter === 'none'} onClick={() => setFilter(filter === 'none' ? null : 'none')}>Sin tipo</FilterChip>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(ex => {
          const ty = ex.default_type ? getType(ex.default_type) : null;
          return (
            <Card key={ex.id} padding={12} onClick={() => onPickForProgress && onPickForProgress(ex.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: ty ? ty.color + '1A' : t.surfaceSunken,
                  color: ty ? ty.color : t.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon name="dumbbell" size={18} stroke={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: t.text, lineHeight: 1.2 }}>{ex.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                    {ty ? <TypePill type={ty} size="sm" /> : <span style={{ fontSize: 11, color: t.textSubtle, fontStyle: 'italic' }}>sin tipo por defecto</span>}
                    {uses[ex.id] > 0 && (
                      <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>· {uses[ex.id]} usos</span>
                    )}
                  </div>
                </div>
                <Icon name="chev" size={14} color={t.textSubtle} stroke={2.2} />
              </div>
            </Card>
          );
        })}
        {filtered.length === 0 && <Empty icon="search" title="No hay ejercicios" subtitle="Cambia el filtro o crea uno nuevo." action="Crear ejercicio" onAction={() => setCreateOpen(true)} />}
      </div>

      <CreateExerciseSheet
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        trainingTypes={trainingTypes}
        onCreate={(data) => { addExercise(data); setCreateOpen(false); }}
      />
    </div>
  );
}

function CreateExerciseSheet({ open, onClose, trainingTypes, onCreate }) {
  const t = useTheme();
  const [name, setName] = React.useState('');
  const [typeId, setTypeId] = React.useState(null);
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (open) { setName(''); setTypeId(null); setNotes(''); }
  }, [open]);

  const canCreate = name.trim().length > 0;

  return (
    <Sheet open={open} onClose={onClose} title="Nuevo ejercicio" height="75%">
      <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Nombre">
          <TextInput value={name} onChange={setName} placeholder="Ej. Sentadilla frontal" />
        </Field>

        <Field label="Tipo por defecto" hint="Opcional. Podrás elegir otro tipo en cada entrenamiento.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <button onClick={() => setTypeId(null)} style={{
              background: !typeId ? t.text : t.surfaceSunken,
              color: !typeId ? t.surface : t.textMuted,
              border: 'none', borderRadius: 99,
              padding: '7px 12px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Sin tipo</button>
            {trainingTypes.map(tt => {
              const active = tt.id === typeId;
              return (
                <button key={tt.id} onClick={() => setTypeId(tt.id)} style={{
                  background: active ? tt.color : tt.color + '14',
                  color: active ? '#fff' : tt.color,
                  border: 'none', borderRadius: 99,
                  padding: '7px 12px', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>{tt.name}</button>
              );
            })}
          </div>
        </Field>

        <Field label="Notas">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
            placeholder="Cómo ejecutarlo, variantes, recordatorios…"
            style={{
              width: '100%', background: t.surfaceSunken, border: 'none', outline: 'none',
              borderRadius: 12, padding: '11px 14px', resize: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}/>
        </Field>

        <Button full disabled={!canCreate} onClick={() => onCreate({ name: name.trim(), default_type: typeId, notes: notes.trim() })}>
          Crear ejercicio
        </Button>
      </div>
    </Sheet>
  );
}

window.PageExercises = PageExercises;


// ──── src/pages/progress.jsx ────
// Página Progresión

function PageProgress({ store, onBack, initialExerciseId }) {
  const t = useTheme();
  const { exercises, workouts, getEx, getType } = store;
  const [selectedId, setSelectedId] = React.useState(initialExerciseId || null);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  // exercises ranked by usage
  const ranked = React.useMemo(() => {
    const uses = {};
    for (const w of workouts) for (const we of w.exercises) uses[we.exercise_id] = (uses[we.exercise_id] || 0) + 1;
    return exercises.map(e => ({ ...e, count: uses[e.id] || 0 })).sort((a, b) => b.count - a.count);
  }, [exercises, workouts]);

  React.useEffect(() => {
    if (!selectedId && ranked.length > 0) setSelectedId(ranked[0].id);
  }, []);

  const selected = selectedId ? getEx(selectedId) : null;
  const rows = selectedId ? exerciseProgress(selectedId, workouts) : [];

  // metrics available
  const hasWeight = rows.some(r => r.max_weight);
  const hasVolume = rows.some(r => r.volume);
  const hasDuration = rows.some(r => r.total_duration);
  const hasDistance = rows.some(r => r.total_distance);
  const hasHeight = rows.some(r => r.max_height);

  const weightSeries = rows.filter(r => r.max_weight).map(r => ({ x: r.date, y: r.max_weight }));
  const volumeSeries = rows.filter(r => r.volume).map(r => ({ x: r.date, y: r.volume }));
  const durationSeries = rows.filter(r => r.total_duration).map(r => ({ x: r.date, y: r.total_duration }));
  const heightSeries = rows.filter(r => r.max_height).map(r => ({ x: r.date, y: r.max_height }));

  // deltas
  const delta = (s) => {
    if (s.length < 2) return null;
    const first = s[0].y, last = s[s.length - 1].y;
    const diff = last - first;
    const pct = ((diff / first) * 100).toFixed(1);
    return { diff: diff.toFixed(1), pct };
  };

  const fmtX = (iso, full) => full ? fmtDate(iso, { long: true }) : fmtDate(iso).replace(' ', '\n');

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Progresión"
        onBack={onBack}
        subtitle={selected ? selected.name : 'Selecciona un ejercicio'}
      />

      {/* Exercise selector */}
      <div style={{ padding: '4px 16px 12px' }}>
        <button onClick={() => setPickerOpen(true)} style={{
          width: '100%', background: t.surface, border: 'none', borderRadius: 14,
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer', boxShadow: t.shadow, fontFamily: 'inherit',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: selected && selected.default_type ? getType(selected.default_type).color + '1A' : t.surfaceSunken,
            color: selected && selected.default_type ? getType(selected.default_type).color : t.textMuted,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon name="target" size={18} stroke={2} /></div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: 0.3, textTransform: 'uppercase' }}>EJERCICIO</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{selected ? selected.name : 'Elegir…'}</div>
          </div>
          <Icon name="chev" size={16} color={t.textSubtle} stroke={2.2} />
        </button>
      </div>

      {!selected && (
        <Empty icon="target" title="Selecciona un ejercicio" subtitle="Toca arriba para ver su progresión." />
      )}

      {selected && rows.length === 0 && (
        <Empty icon="info" title="Aún sin entrenamientos" subtitle={`Empieza a registrar series de ${selected.name} para ver progresión.`} />
      )}

      {selected && rows.length > 0 && (
        <>
          {/* Summary chips */}
          <div style={{ padding: '0 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {hasWeight && (
              <StatPill label="PESO MÁX" value={`${max(rows, r => r.max_weight || 0)}`} unit="kg"
                delta={delta(weightSeries)} color="#D94B4B" />
            )}
            {hasVolume && (
              <StatPill label="VOL MÁX" value={`${(max(rows, r => r.volume || 0) / 1000).toFixed(1)}`} unit="t"
                delta={delta(volumeSeries)} color="#7B5CD6" />
            )}
            {hasHeight && (
              <StatPill label="ALTURA MÁX" value={`${max(rows, r => r.max_height || 0)}`} unit="cm"
                delta={delta(heightSeries)} color="#3DA37A" />
            )}
            {hasDuration && (
              <StatPill label="DUR ÚLTIMA" value={`${rows[rows.length-1].total_duration?.toFixed(1)}`} unit="s"
                color="#E68A2E" />
            )}
            <StatPill label="ENTRENAMIENTOS" value={rows.length} color={t.text} />
          </div>

          {/* Charts */}
          {hasWeight && (
            <ChartCard title="Peso máximo por sesión" subtitle="Mayor peso levantado en cada entrenamiento">
              <LineChart data={weightSeries} color="#D94B4B"
                formatY={(v) => `${Math.round(v)}`} unit="kg"
                formatX={(iso, full) => fmtX(iso, full)} />
            </ChartCard>
          )}

          {hasVolume && (
            <ChartCard title="Volumen total" subtitle="Peso × repeticiones por sesión">
              <BarChart data={volumeSeries} color="#7B5CD6"
                formatY={(v) => `${(v/1000).toFixed(1)}t`}
                formatX={(iso) => fmtDate(iso).slice(0, 6)} />
            </ChartCard>
          )}

          {hasHeight && (
            <ChartCard title="Altura máxima" subtitle="Pico de cada sesión">
              <LineChart data={heightSeries} color="#3DA37A"
                formatY={(v) => `${Math.round(v)}`} unit="cm"
                formatX={(iso, full) => fmtX(iso, full)} />
            </ChartCard>
          )}

          {hasDuration && (
            <ChartCard title="Duración" subtitle="Tiempo total de la sesión">
              <LineChart data={durationSeries} color="#E68A2E"
                formatY={(v) => `${v.toFixed(1)}`} unit="s"
                formatX={(iso, full) => fmtX(iso, full)} />
            </ChartCard>
          )}

          {/* Table */}
          <SectionLabel>Historial</SectionLabel>
          <div style={{ padding: '0 16px 24px' }}>
            <Card padding={0}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 70px 60px 60px',
                gap: 8, padding: '10px 14px',
                fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: t.textSubtle, textTransform: 'uppercase',
              }}>
                <div>Fecha · Tipo</div>
                <div style={{ textAlign: 'right' }}>Máx</div>
                <div style={{ textAlign: 'right' }}>Vol</div>
                <div style={{ textAlign: 'right' }}>Series</div>
              </div>
              {[...rows].reverse().map((r, i) => {
                const ty = getType(r.training_type_id);
                return (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 70px 60px 60px',
                    gap: 8, padding: '10px 14px', alignItems: 'center',
                    borderTop: `1px solid ${t.border}`,
                    fontSize: 13, fontVariantNumeric: 'tabular-nums',
                  }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{fmtDate(r.date)}</div>
                      {ty && <div style={{ marginTop: 3 }}><TypePill type={ty} size="sm" /></div>}
                    </div>
                    <div style={{ textAlign: 'right', color: t.text, fontWeight: 600 }}>{r.max_weight ? `${r.max_weight}kg` : '—'}</div>
                    <div style={{ textAlign: 'right', color: t.text, fontWeight: 600 }}>{r.volume ? `${(r.volume/1000).toFixed(1)}t` : '—'}</div>
                    <div style={{ textAlign: 'right', color: t.textMuted }}>{r.sets_count}</div>
                  </div>
                );
              })}
            </Card>
          </div>
        </>
      )}

      <Sheet open={pickerOpen} onClose={() => setPickerOpen(false)} title="Elige ejercicio" height="80%">
        <div style={{ padding: '8px 16px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ranked.map(ex => {
            const ty = ex.default_type ? getType(ex.default_type) : null;
            const isSel = ex.id === selectedId;
            return (
              <button key={ex.id} onClick={() => { setSelectedId(ex.id); setPickerOpen(false); }} style={{
                background: isSel ? t.accentSoft : t.surfaceAlt,
                border: 'none', borderRadius: 14,
                padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: ty ? ty.color + '1A' : t.surfaceSunken,
                  color: ty ? ty.color : t.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="dumbbell" size={16} stroke={2} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{ex.name}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>
                    {ex.count > 0 ? `${ex.count} ${ex.count === 1 ? 'entrenamiento' : 'entrenamientos'}` : 'Sin datos'}
                  </div>
                </div>
                {isSel && <Icon name="check" size={20} color={t.accent} stroke={2.4} />}
              </button>
            );
          })}
        </div>
      </Sheet>
    </div>
  );
}

function StatPill({ label, value, unit, delta, color }) {
  const t = useTheme();
  return (
    <Card padding={12}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: t.textMuted }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: color || t.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, fontWeight: 600, color: t.textMuted }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ fontSize: 11, marginTop: 3, color: parseFloat(delta.diff) > 0 ? t.success : t.textMuted, fontWeight: 700 }}>
          {parseFloat(delta.diff) > 0 ? '+' : ''}{delta.diff} ({delta.pct}%)
        </div>
      )}
    </Card>
  );
}

function ChartCard({ title, subtitle, children }) {
  const t = useTheme();
  return (
    <div style={{ padding: '0 16px 12px' }}>
      <Card padding={14}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{subtitle}</div>}
        <div style={{ marginTop: 10 }}>{children}</div>
      </Card>
    </div>
  );
}

window.PageProgress = PageProgress;


// ──── src/pages/body-weight.jsx ────
// Página Peso corporal

function PageBodyWeight({ store, onBack }) {
  const t = useTheme();
  const { bodyWeight, addBodyWeight } = store;
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const sorted = [...bodyWeight].sort((a, b) => a.entry_date.localeCompare(b.entry_date));
  const data = sorted.map(b => ({ x: b.entry_date, y: b.weight }));
  const latest = bodyWeight[0];
  const first = sorted[0];
  const delta = latest && first ? (latest.weight - first.weight).toFixed(1) : null;
  const minW = Math.min(...sorted.map(b => b.weight));
  const maxW = Math.max(...sorted.map(b => b.weight));

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Peso corporal"
        onBack={onBack}
        action={
          <button onClick={() => setOpen(true)} style={{
            background: '#3A82C4', color: '#fff', border: 'none', borderRadius: 99,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(58,130,196,0.3)',
          }}><Icon name="plus" size={20} stroke={2.4} /></button>
        }
      />

      {/* Big number + chart */}
      <div style={{ padding: '4px 16px 12px' }}>
        <Card padding={16}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4, color: t.textMuted, textTransform: 'uppercase' }}>ACTUAL</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: t.text, letterSpacing: -1, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                  {latest ? latest.weight.toFixed(1) : '—'}
                </span>
                <span style={{ fontSize: 16, fontWeight: 600, color: t.textMuted }}>kg</span>
              </div>
              {delta && (
                <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: parseFloat(delta) < 0 ? t.success : t.textMuted }}>
                  {parseFloat(delta) > 0 ? '+' : ''}{delta} kg desde {fmtDate(first.entry_date)}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right', fontSize: 11, color: t.textSubtle, fontWeight: 600 }}>
              <div>máx {maxW.toFixed(1)}kg</div>
              <div style={{ marginTop: 2 }}>mín {minW.toFixed(1)}kg</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <LineChart data={data} color="#3A82C4" height={140}
              formatY={(v) => `${v.toFixed(1)}`}
              formatX={(iso) => fmtDate(iso).slice(0, 6)} />
          </div>
        </Card>
      </div>

      {/* Historial */}
      <SectionLabel>Historial</SectionLabel>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bodyWeight.map((b, i) => {
          const prev = bodyWeight[i + 1];
          const change = prev ? (b.weight - prev.weight).toFixed(1) : null;
          return (
            <Card key={b.entry_date} padding={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: '#3A82C418', color: '#3A82C4',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}><Icon name="body" size={18} stroke={2} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{fmtDate(b.entry_date, { long: true })}</div>
                {b.notes && <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{b.notes}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{b.weight.toFixed(1)}<span style={{ fontSize: 12, fontWeight: 600, color: t.textMuted }}>kg</span></div>
                {change && (
                  <div style={{ fontSize: 11, fontWeight: 700, color: parseFloat(change) < 0 ? t.success : (parseFloat(change) > 0 ? '#D94B4B' : t.textMuted), marginTop: 2 }}>
                    {parseFloat(change) > 0 ? '+' : ''}{change}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <AddWeightSheet
        open={open} onClose={() => setOpen(false)}
        onSave={(b) => { addBodyWeight(b); setOpen(false); setToast('Peso registrado'); }}
      />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

function AddWeightSheet({ open, onClose, onSave }) {
  const t = useTheme();
  const today = new Date('2026-05-10').toISOString().slice(0, 10);
  const [date, setDate] = React.useState(today);
  const [weight, setWeight] = React.useState('');
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (open) { setDate(today); setWeight(''); setNotes(''); }
  }, [open]);

  const can = parseFloat(weight) > 0;

  return (
    <Sheet open={open} onClose={onClose} title="Registrar peso" height="68%">
      <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Peso (kg)">
          <div style={{
            background: t.surfaceSunken, borderRadius: 14,
            padding: '20px 16px', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6,
          }}>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} inputMode="decimal" placeholder="0.0"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 44, fontWeight: 700, color: t.text, fontFamily: 'inherit',
                textAlign: 'center', width: 140, padding: 0,
                fontVariantNumeric: 'tabular-nums', letterSpacing: -1,
              }}/>
            <span style={{ fontSize: 18, fontWeight: 600, color: t.textMuted }}>kg</span>
          </div>
        </Field>
        <Field label="Fecha">
          <TextInput value={date} onChange={setDate} type="date" />
        </Field>
        <Field label="Notas (opcional)">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
            placeholder="Ej. después de entrenar, en ayunas…"
            style={{
              width: '100%', background: t.surfaceSunken, border: 'none', outline: 'none',
              borderRadius: 12, padding: '11px 14px', resize: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit', boxSizing: 'border-box',
            }}/>
        </Field>
        <Button full disabled={!can} onClick={() => onSave({ entry_date: date, weight: parseFloat(weight), notes: notes.trim() || undefined })}>
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}

window.PageBodyWeight = PageBodyWeight;


// ──── src/pages/more.jsx ────
// Páginas Más + Configuración

function PageMore({ store, onNav, onBack }) {
  const t = useTheme();
  const { workouts, exercises, bodyWeight } = store;

  const items = [
    { id: 'exercises', label: 'Ejercicios', icon: 'dumbbell', color: '#3DA37A', desc: `${exercises.length} en catálogo` },
    { id: 'body-weight', label: 'Peso corporal', icon: 'body', color: '#3A82C4', desc: `${bodyWeight.length} registros` },
    { id: 'progress', label: 'Progresión', icon: 'chart', color: '#7B5CD6', desc: 'Evolución por ejercicio' },
    { id: 'settings', label: 'Configuración', icon: 'settings', color: '#8A8378', desc: 'Tipos, info, ajustes' },
  ];

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar title="Más" subtitle={`${workouts.length} entrenamientos · ${exercises.length} ejercicios`} />

      <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(item => (
          <Card key={item.id} onClick={() => onNav(item.id)} padding={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: item.color + '18', color: item.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}><Icon name={item.icon} size={20} stroke={1.9} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{item.label}</div>
              <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{item.desc}</div>
            </div>
            <Icon name="chev" size={16} color={t.textSubtle} stroke={2.2} />
          </Card>
        ))}
      </div>

      {/* Brand footer */}
      <div style={{ textAlign: 'center', padding: '40px 16px 24px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>fitness_tracker</div>
        <div style={{ fontSize: 11, color: t.textSubtle, marginTop: 4 }}>v0.1 · prototipo</div>
      </div>
    </div>
  );
}

function PageSettings({ store, onBack }) {
  const t = useTheme();
  const { trainingTypes, workouts, exercises, bodyWeight } = store;

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar title="Configuración" onBack={onBack} />

      <SectionLabel>Sobre el proyecto</SectionLabel>
      <div style={{ padding: '0 16px 12px' }}>
        <Card padding={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: t.accentSoft, color: t.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon name="flame" size={22} stroke={1.8} /></div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>fitness_tracker</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>App personal de seguimiento</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
            Registra entrenamientos por tipo (pliometría, potencia, fuerza, hipertrofia u otro), series con métricas flexibles y la evolución de tu peso corporal.
          </div>
        </Card>
      </div>

      <SectionLabel>Tipos de entrenamiento</SectionLabel>
      <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {trainingTypes.map(tt => (
          <Card key={tt.id} padding={14}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 4, height: 36, borderRadius: 99, background: tt.color, flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{tt.name}</span>
                </div>
                <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4, lineHeight: 1.45 }}>{tt.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <SectionLabel>Datos</SectionLabel>
      <div style={{ padding: '0 16px 12px' }}>
        <Card padding={0}>
          <SettingsRow label="Entrenamientos" value={workouts.length} />
          <SettingsRow label="Ejercicios" value={exercises.length} />
          <SettingsRow label="Registros de peso" value={bodyWeight.length} />
          <SettingsRow label="Total series" value={sum(workouts, w => sum(w.exercises, e => e.sets.length))} last />
        </Card>
      </div>

      <SectionLabel>Stack</SectionLabel>
      <div style={{ padding: '0 16px 32px' }}>
        <Card padding={0}>
          <SettingsRow label="Backend" value="Supabase / PostgreSQL" />
          <SettingsRow label="Frontend" value="Streamlit" />
          <SettingsRow label="Gráficas" value="Plotly" />
          <SettingsRow label="Datos" value="Pandas" last />
        </Card>
      </div>
    </div>
  );
}

function SettingsRow({ label, value, last }) {
  const t = useTheme();
  return (
    <div style={{
      padding: '12px 16px',
      borderBottom: last ? 'none' : `1px solid ${t.border}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, color: t.textMuted, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

window.PageMore = PageMore;
window.PageSettings = PageSettings;


// ──── src/app.jsx ────
// Main App — navigation orchestrator

function App() {
  const store = useStore();

  // Tweaks state — only dark/light
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "dark": false
  }/*EDITMODE-END*/);
  const theme = tweaks.dark ? THEME.dark : THEME.light;

  // Navigation stack
  const [stack, setStack] = React.useState([{ page: 'home' }]);
  const [activeTab, setActiveTab] = React.useState('home');
  const [toast, setToast] = React.useState(null);

  const current = stack[stack.length - 1];

  const navigate = (page, ctx = {}) => {
    setStack([{ page, ctx }]);
    if (['home', 'history', 'progress', 'more'].includes(page)) setActiveTab(page);
  };
  const push = (page, ctx = {}) => setStack(prev => [...prev, { page, ctx }]);
  const back = () => {
    setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const openWorkout = (id) => push('workout-detail', { workoutId: id });
  const showToast = (msg) => setToast(msg);

  const onTab = (tab) => navigate(tab);
  const onNew = () => push('new-workout');

  let pageEl;
  switch (current.page) {
    case 'home':
      pageEl = <PageHome store={store} onNav={navigate} onOpenWorkout={openWorkout} />;
      break;
    case 'history':
      pageEl = <PageHistory store={store} onOpenWorkout={openWorkout} />;
      break;
    case 'workout-detail':
      pageEl = <PageWorkoutDetail store={store} workoutId={current.ctx.workoutId} onBack={back} />;
      break;
    case 'new-workout':
      pageEl = <PageNewWorkout store={store} onBack={back}
        onSaved={() => { back(); showToast('Entrenamiento guardado'); navigate('history'); }} />;
      break;
    case 'exercises':
      pageEl = <PageExercises store={store} onBack={back} onPickForProgress={(id) => push('progress', { exerciseId: id })} />;
      break;
    case 'progress':
      pageEl = <PageProgress store={store} onBack={current.ctx.exerciseId ? back : undefined} initialExerciseId={current.ctx.exerciseId} />;
      break;
    case 'body-weight':
      pageEl = <PageBodyWeight store={store} onBack={back} />;
      break;
    case 'more':
      pageEl = <PageMore store={store} onNav={(p) => push(p)} />;
      break;
    case 'settings':
      pageEl = <PageSettings store={store} onBack={back} />;
      break;
    default:
      pageEl = <div>404</div>;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{
        height: '100%', width: '100%',
        background: theme.bg, color: theme.text,
        position: 'relative', overflow: 'hidden',
        fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        colorScheme: theme.name,
      }}>
        <div style={{
          height: '100%', width: '100%', overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          {pageEl}
        </div>

        <TabBar active={activeTab} onChange={onTab} onNew={onNew} />

        {toast && <Toast message={toast} onDone={() => setToast(null)} />}

        <TweaksPanel title="Tweaks">
          <TweakSection label="Apariencia">
            <TweakToggle label="Modo oscuro" value={tweaks.dark} onChange={(v) => setTweak('dark', v)} />
          </TweakSection>
        </TweaksPanel>
      </div>
    </ThemeContext.Provider>
  );
}

window.App = App;

