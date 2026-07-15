/**
 * Ten looping animated glyphs — one motion signature per value.
 * Class hooks (g-*) are styled globally in Values.tsx's <style>; loops are
 * wired in Values.tsx's useGSAP.
 */
export function Glyph({ id }: { id: string }) {
  switch (id) {
    case "g1": return (
      <svg viewBox="0 0 300 190">
        <circle cx="130" cy="90" r="46" className="g-acc" />
        <line x1="163" y1="123" x2="196" y2="156" className="g-acc" strokeWidth="5" />
        <g className="orbit" style={{ transformOrigin: "130px 90px" }}>
          <text x="130" y="14" className="g-txt" fontSize="26" textAnchor="middle">?</text>
          <text x="216" y="96" className="g-txt" fontSize="19" textAnchor="middle">?</text>
          <text x="130" y="180" className="g-txt" fontSize="22" textAnchor="middle">?</text>
          <text x="46" y="96" className="g-txt" fontSize="17" textAnchor="middle">?</text>
        </g>
        <text x="130" y="97" className="g-txtm" fontSize="15" textAnchor="middle">DATA</text>
      </svg>
    );
    case "g2": return (
      <svg viewBox="0 0 300 190">
        <text x="112" y="118" className="g-txt" fontSize="92" textAnchor="middle" fontWeight="800">80</text>
        <rect x="172" y="62" width="104" height="46" rx="8" className="g-acc" />
        <text x="224" y="92" className="ctx-word g-txt" fontSize="21" textAnchor="middle">%</text>
        <line x1="30" y1="150" x2="270" y2="150" className="g-mut" />
        <text x="150" y="172" className="g-txtm" fontSize="12" textAnchor="middle" letterSpacing=".2em">SAME NUMBER · DIFFERENT MEANING</text>
      </svg>
    );
    case "g3": return (
      <svg viewBox="0 0 300 190">
        <path d="M60 24 H240 L170 96 V150 L130 168 V96 Z" className="g-acc" />
        <g>
          <circle cx="118" cy="8" r="6" className="g-accf drop" />
          <circle cx="150" cy="-6" r="6" className="g-mutf drop" />
          <circle cx="182" cy="4" r="6" className="g-accf drop" />
          <circle cx="134" cy="-16" r="6" className="g-mutf drop" />
          <circle cx="166" cy="-24" r="6" className="g-accf drop" />
        </g>
        <text x="245" y="178" className="g-txtm" fontSize="12" textAnchor="end" letterSpacing=".14em">ONLY VERIFIED PASSES</text>
      </svg>
    );
    case "g4": return (
      <svg viewBox="0 0 300 190">
        <g className="gearbox">
          <circle cx="82" cy="72" r="30" className="g-mut" />
          <circle cx="132" cy="98" r="20" className="g-mut" />
          <circle cx="94" cy="128" r="14" className="g-mut" />
          <line x1="60" y1="52" x2="104" y2="92" className="g-mut" />
        </g>
        <line x1="216" y1="150" x2="216" y2="70" className="g-acc" strokeWidth="4" />
        <circle cx="216" cy="62" r="9" className="g-accf lever-knob" />
        <line x1="176" y1="150" x2="256" y2="150" className="g-acc" />
        <text x="216" y="176" className="g-txtm" fontSize="12" textAnchor="middle" letterSpacing=".16em">ONE LEVER</text>
      </svg>
    );
    case "g5": return (
      <svg viewBox="0 0 300 190">
        <line x1="30" y1="150" x2="270" y2="40" className="g-mut" strokeDasharray="7 7" />
        <path className="ev-curve g-acc" strokeWidth="3.5" d="M30 150 Q100 40 160 92 T270 60" pathLength={100} strokeDasharray="100" strokeDashoffset="100" />
        <g>
          <circle cx="52" cy="132" r="6" className="g-accf pt" /><circle cx="92" cy="86" r="6" className="g-accf pt" />
          <circle cx="128" cy="108" r="6" className="g-accf pt" /><circle cx="168" cy="88" r="6" className="g-accf pt" />
          <circle cx="206" cy="72" r="6" className="g-accf pt" /><circle cx="246" cy="66" r="6" className="g-accf pt" />
        </g>
      </svg>
    );
    case "g6": return (
      <svg viewBox="0 0 300 190">
        <g className="flipcard" style={{ transformOrigin: "150px 95px" }}>
          <rect x="60" y="55" width="180" height="80" rx="10" className="g-acc" />
          <text className="flip-front g-txt" x="150" y="105" fontSize="30" textAnchor="middle" fontWeight="800">99% ✓</text>
          <text className="flip-back g-txt" x="150" y="98" fontSize="19" textAnchor="middle" opacity="0">RECALL: 12%</text>
          <text className="flip-back g-txtm" x="150" y="120" fontSize="12" textAnchor="middle" opacity="0">FALSE NEGATIVES: HIGH</text>
        </g>
      </svg>
    );
    case "g7": return (
      <svg viewBox="0 0 300 190">
        <circle cx="272" cy="96" r="8" className="g-accf" />
        <path className="route g-acc" strokeWidth="3.5" d="M20 96 C80 96 90 40 150 60 S 230 140 264 98" pathLength={100} strokeDasharray="100" strokeDashoffset="100" />
        <path className="g-mut" d="M20 96 H250" strokeDasharray="6 8" />
        <text x="20" y="150" className="g-txtm" fontSize="12" letterSpacing=".14em">PLAN A FAILED → PLAN B SHIPPED</text>
      </svg>
    );
    case "g8": return (
      <svg viewBox="0 0 300 190">
        <rect x="70" y="34" width="160" height="110" rx="10" className="g-acc" />
        <g clipPath="inset(0)">
          <circle cx="120" cy="76" r="16" className="g-acc inner-gear" style={{ transformOrigin: "120px 76px" }} />
          <circle cx="176" cy="76" r="10" className="g-mut" />
          <line x1="96" y1="112" x2="204" y2="112" className="g-mut" />
          <line x1="96" y1="124" x2="170" y2="124" className="g-acc" />
          <rect className="doorL g-accf" x="70" y="34" width="80" height="110" opacity=".95" />
          <rect className="doorR g-accf" x="150" y="34" width="80" height="110" opacity=".95" />
        </g>
        <text x="150" y="172" className="g-txtm" fontSize="12" textAnchor="middle" letterSpacing=".16em">NO BLACK BOXES</text>
      </svg>
    );
    case "g9": return (
      <svg viewBox="0 0 300 190">
        <g className="rows9">
          <rect x="40" y="30" width="220" height="18" rx="3" className="g-mut" />
          <rect x="40" y="58" width="220" height="18" rx="3" className="g-mut" />
          <rect x="40" y="86" width="220" height="18" rx="3" className="g-mut" />
        </g>
        <g className="people9" opacity="0">
          <g className="g-acc"><circle cx="90" cy="120" r="10" /><path d="M74 158 Q90 134 106 158" /></g>
          <g className="g-acc"><circle cx="150" cy="120" r="10" /><path d="M134 158 Q150 134 166 158" /></g>
          <g className="g-acc"><circle cx="210" cy="120" r="10" /><path d="M194 158 Q210 134 226 158" /></g>
        </g>
        <text x="40" y="44" className="g-txtm" fontSize="11">ID 1042 …</text>
      </svg>
    );
    case "g10": return (
      <svg viewBox="0 0 300 190">
        <path className="loop10 g-acc" strokeWidth="3.5" d="M150 95 C150 45 60 45 60 95 C60 145 150 145 150 95 C150 45 240 45 240 95 C240 145 150 145 150 95" />
        <circle className="orb10" r="7" fill="#E0F11F" />
        <text x="150" y="180" className="g-txtm" fontSize="12" textAnchor="middle" letterSpacing=".2em">OBSERVE → LEARN → BUILD → REPEAT</text>
      </svg>
    );
    default: return null;
  }
}
