import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "flights", label: "Flights" },
  { id: "hotel", label: "Hotel" },
  { id: "experiences", label: "Experiences" },
  { id: "food", label: "Food" },
  { id: "itinerary", label: "Itinerary" },
  { id: "budget", label: "Budget" },
  { id: "tips", label: "Tips" },
];

const FOOD_DATA = {
  steaks: [
    {
      name: "Peter Luger",
      location: "Williamsburg, Brooklyn · est. 1887",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&q=80",
      mustTry: "Porterhouse for Two",
      price: "$120–$140 le steak",
      why: "Dry-aged sur place depuis 1887, sélectionné à la main par le boucher. La croûte caramélisée est servie sur assiette brûlante avec beurre fondu. C'est LE steak qui définit New York — rien ne s'en approche.",
      tip: "💡 Secret : le burger au bar le midi (~$18) est un hack légendaire. Cash/débit only, pas de CB.",
    },
    {
      name: "Keens Steakhouse",
      location: "Midtown · est. 1885",
      img: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop&q=80",
      mustTry: "Mutton Chop (750g)",
      price: "~$51–55",
      why: "Un saddle cut de 26 oz d'agneau mature grillé à 540°C. Keens est le seul restaurant au monde qui le sert ainsi. Les 45 000 pipes d'argile au plafond (JP Morgan, Teddy Roosevelt) font partie de l'expérience.",
      tip: "💡 Plus grande collection de scotch single malt des USA. Commander un Macallan rare après le repas.",
    },
  ],
  burgers: [
    {
      name: "Minetta Tavern",
      location: "Greenwich Village",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80",
      mustTry: "Black Label Burger ($38)",
      price: "$38",
      why: "Blend custom de boeuf dry-aged par Pat LaFrieda sur brioche Balthazar. Anthony Bourdain le classait comme son burger favori au monde. La viande a un goût de steak concentré, pas de burger standard.",
      tip: "💡 Réserver sur Resy 30 jours avant. Commander aussi le bone marrow en entrée.",
    },
    {
      name: "J.G. Melon",
      location: "Upper East Side",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop&q=80",
      mustTry: "Cheeseburger + Cottage Fries",
      price: "~$15–18",
      why: "Nommé meilleur burger de NYC par Bloomberg et Bobby Flay. Pas de chichi : parfaitement assaisonné, cuit au grill avec un fromage fondu impeccable. Le contre-pied total du burger à $38.",
      tip: "💡 Cash only, walk-in only. Les cottage fries (rondelles de pomme de terre) sont non-négociables.",
    },
  ],
  pizza: [
    {
      name: "Lucali",
      location: "Carroll Gardens, Brooklyn",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&q=80",
      mustTry: "Plain Margherita Pie (18\")",
      price: "~$35–40",
      why: "Mark Iacono fait chaque pizza à la main dans un four à 900°F, dans un candy shop aux chandelles. Pâte d'une finesse folle, mozzarella fraîche parfaite. Beyoncé et Jay-Z viennent ici régulièrement.",
      tip: "💡 BYOB ! Apporter du vin. Arriver à 15h30 pour la waitlist (ouverture 17h). Cash only. Commander aussi le calzone.",
    },
    {
      name: "Joe's Pizza",
      location: "Greenwich Village · est. 1975",
      img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop&q=80",
      mustTry: "Classic Cheese Slice",
      price: "~$4–5",
      why: "LA slice new-yorkaise. Pâte fine, sauce légèrement sucrée, fromage qui s'étire. Tu plies en deux et tu manges en marchant — le geste iconique de NYC. Spider-Man y travaillait dans le film.",
      tip: "💡 7 Carmine St est l'original. Ouvert jusqu'à 4–5h du matin. Parfait en late-night.",
    },
    {
      name: "Prince Street Pizza",
      location: "Nolita",
      img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop&q=80",
      mustTry: "Spicy Spring Pepperoni Square",
      price: "~$6–7",
      why: "La part la plus Instagrammée de NYC — pepperoni cups croustillants, pâte sicilienne épaisse, sauce fra diavolo épicée. Un style unique qui n'existe nulle part ailleurs.",
      tip: "💡 Arriver avant 11h30 pour éviter la file. La Soho Square (fromage) est aussi excellente.",
    },
  ],
  italian: [
    {
      name: "Carbone",
      location: "Greenwich Village",
      img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&q=80",
      mustTry: "Spicy Rigatoni Vodka",
      price: "$150–200/pers.",
      why: "L'italien-américain le plus hype de la planète. Serveurs en smoking, ambiance Rat Pack. Les pâtes vodka sont si addictives qu'il existe des comptes Instagram dédiés à ce seul plat. Crème infusée aux piments calabrais.",
      tip: "💡 Résa IMPOSSIBLE : Resy à 10h00 pile, 30 jours avant, ça part en 10 sec. Demander les Meatballs off-menu.",
    },
    {
      name: "Via Carota",
      location: "West Village",
      img: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600&h=400&fit=crop&q=80",
      mustTry: "Cacio e Pepe",
      price: "$70–100/pers.",
      why: "Charme farmhouse italien, ingrédients sublimés par la simplicité. Pecorino romano vieilli + poivre noir frais — 3 ingrédients, perfection absolue. Le cadre du West Village en hiver est magique.",
      tip: "💡 Walk-in : arriver avant 17h, attente 1–3h. Les places au bar servent le menu complet avec moins d'attente.",
    },
    {
      name: "Emilio's Ballato",
      location: "Nolita, Houston St",
      img: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=600&h=400&fit=crop&q=80",
      mustTry: "Veal Antonio (off-menu)",
      price: "~$80–120/pers.",
      why: "Pas de résa, pas de site web, pas de menu visible. Le Veal Antonio : escalope de 450g, sauce vodka, mozzarella fondante, prosciutto. Taylor Swift, Rihanna et Justin Bieber sont des réguliers.",
      tip: "💡 Walk-in only, 1–2.5h d'attente. Mardi = moins d'1h. Demander « What's good tonight? » — ils adorent.",
    },
    {
      name: "I Sodi",
      location: "West Village, Bleecker St",
      img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&q=80",
      mustTry: "Lasagna al Forno",
      price: "$90–130/pers.",
      why: "James Beard Award. La chef Rita Sodi cuisine de la vraie toscane. Sa lasagne : 5 couches de ragù bolognese, béchamel et pâte fraîche gratinée. Tiny restaurant, énorme impact.",
      tip: "💡 Plus dur que Carbone. Résas à MINUIT sur Resy. Alarme à 23h59.",
    },
  ],
  delis: [
    {
      name: "Katz's Delicatessen",
      location: "Lower East Side · est. 1888",
      img: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=600&h=400&fit=crop&q=80",
      mustTry: "Pastrami on Rye + Moutarde",
      price: "~$29–30",
      why: "Le deli le plus célèbre au monde (When Harry Met Sally). Le pastrami est fumé 30 jours, tranché à la main. Chaque bouchée est juteuse, poivrée, fond en bouche.",
      tip: "💡 Tip cash $2–5 au cutter AVANT — portions plus généreuses. Ne JAMAIS demander « lean ». Ne pas perdre le ticket.",
    },
    {
      name: "Russ & Daughters",
      location: "Lower East Side · est. 1914",
      img: "https://images.unsplash.com/photo-1585325701956-60dd6c8b20d7?w=600&h=400&fit=crop&q=80",
      mustTry: "Bagel, Cream Cheese & Lox",
      price: "~$15–22",
      why: "110 ans d'expertise : saumon fumé écossais tranché si finement qu'il est presque translucide. Sur bagel frais avec cream cheese aux oignons — le breakfast qui définit NYC. Michelin Bib Gourmand.",
      tip: "💡 À 3 blocks de Katz's — faire les deux le même matin. Le Café sur Orchard St a des tables.",
    },
  ],
  desserts: [
    {
      name: "Levain Bakery",
      location: "Multiple locations",
      img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop&q=80",
      mustTry: "Dark Choc Chip & Walnut Cookie",
      price: "~$5–6",
      why: "170g de pur bonheur. Croûte croustillante dehors, centre fondant gooey comme un brownie dedans. Pas un cookie normal — c'est un dessert complet déguisé en cookie.",
      tip: "💡 TOUJOURS demander « warm » — le centre fondant est 10x meilleur tiède. UES ou UWS = moins de queue.",
    },
    {
      name: "Jacques Torres",
      location: "DUMBO, Brooklyn",
      img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&h=400&fit=crop&q=80",
      mustTry: "Wicked Hot Chocolate",
      price: "~$5–7",
      why: "Le « Mr. Chocolate » de NYC. Son Wicked Hot Chocolate : piment ancho, chipotle, cannelle — épicé, riche, réconfortant. Après 4h dans le froid de décembre, c'est le meilleur moment de ta journée.",
      tip: "💡 Shop DUMBO = le plus atmosphérique (sous le Manhattan Bridge). Acheter aussi les bonbons en souvenir.",
    },
    {
      name: "Dominique Ansel",
      location: "SoHo, Spring St",
      img: "https://images.unsplash.com/photo-1509365390695-33aee754301f?w=600&h=400&fit=crop&q=80",
      mustTry: "Blossoming Hot Chocolate",
      price: "~$7–8",
      why: "L'inventeur du Cronut. Le Blossoming Hot Chocolate : une fleur en marshmallow qui s'ouvre lentement quand on verse le lait chaud. De l'art comestible, magique en hiver.",
      tip: "💡 Le Cronut change de parfum chaque mois — commander aussi. Arriver tôt pour éviter la rupture de stock.",
    },
  ],
};

function useInView(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>{children}</div>
  );
}

function SectionTitle({ sup, title, sub }) {
  return (
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        {sup && <div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{sup}</div>}
        <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.15, margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontFamily: "var(--f-body)", fontSize: 16, color: "var(--muted)", marginTop: 14, maxWidth: 600, marginInline: "auto", lineHeight: 1.7 }}>{sub}</p>}
      </div>
    </FadeIn>
  );
}

function StatCard({ icon, value, label, delay = 0 }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 16, padding: "28px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 24, color: "var(--gold)", fontWeight: 400 }}>{value}</div>
        <div style={{ fontFamily: "var(--f-sans)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>{label}</div>
      </div>
    </FadeIn>
  );
}

function FeatureCard({ emoji, title, desc, price, delay = 0 }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(212,175,55,0.12)", borderRadius: 16, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 30, marginBottom: 12 }}>{emoji}</div>
        <h3 style={{ fontFamily: "var(--f-display)", fontSize: 19, color: "var(--cream)", fontWeight: 400, margin: "0 0 10px" }}>{title}</h3>
        <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.7, flex: 1, margin: 0 }}>{desc}</p>
        {price && <div style={{ fontFamily: "var(--f-sans)", fontSize: 11, color: "var(--gold)", marginTop: 14, letterSpacing: 1 }}>{price}</div>}
      </div>
    </FadeIn>
  );
}

function FoodCard({ item, delay = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden", background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
          {!imgError && <img src={item.img} alt={item.name} onLoad={() => setImgLoaded(true)} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.6s ease" }} />}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "65%", background: "linear-gradient(transparent, rgba(10,10,15,0.9))" }} />
          <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(212,175,55,0.92)", color: "#0a0a0f", fontFamily: "var(--f-sans)", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20 }}>MUST TRY</div>
          <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 24, color: "var(--cream)", fontWeight: 400 }}>{item.name}</div>
            <div style={{ fontFamily: "var(--f-sans)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(212,175,55,0.8)", marginTop: 3 }}>{item.location}</div>
          </div>
        </div>
        <div style={{ padding: "22px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(212,175,55,0.08)", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontFamily: "var(--f-sans)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>COMMANDER ABSOLUMENT</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 17, color: "var(--cream)", fontStyle: "italic" }}>{item.mustTry}</div>
            </div>
            <div style={{ fontFamily: "var(--f-sans)", fontSize: 13, color: "var(--gold)", fontWeight: 500, background: "rgba(212,175,55,0.08)", padding: "4px 12px", borderRadius: 12, whiteSpace: "nowrap" }}>{item.price}</div>
          </div>
          <p style={{ fontFamily: "var(--f-body)", fontSize: 14.5, color: "var(--muted)", lineHeight: 1.75, margin: "0 0 14px" }}>{item.why}</p>
          <div style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 12, padding: "11px 15px" }}>
            <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--cream)", lineHeight: 1.65, margin: 0 }}>{item.tip}</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function DayCard({ day, date, title, highlights, meal, delay = 0 }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div onClick={() => setOpen(!open)} style={{ background: open ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${open ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.06)"}`, borderRadius: 16, padding: "22px 26px", cursor: "pointer", transition: "all 0.4s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), #b8860b)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-display)", fontSize: 17, color: "#0a0a0f", fontWeight: 600, flexShrink: 0 }}>{day}</div>
            <div>
              <div style={{ fontFamily: "var(--f-sans)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>{date}</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 17, color: "var(--cream)", fontWeight: 400 }}>{title}</div>
            </div>
          </div>
          <div style={{ color: "var(--gold)", fontSize: 18, transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</div>
        </div>
        {open && (
          <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid rgba(212,175,55,0.1)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>✦</span>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{h}</span>
                </div>
              ))}
            </div>
            {meal && (
              <div style={{ marginTop: 14, padding: "11px 15px", borderRadius: 10, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <span style={{ fontFamily: "var(--f-sans)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)" }}>🍽 DINING </span>
                <span style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--cream)", marginLeft: 8 }}>{meal}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

function FoodCatHeader({ icon, title }) {
  return (
    <FadeIn>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, marginTop: 56, paddingBottom: 14, borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <h3 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 400, color: "var(--cream)", margin: 0, fontStyle: "italic" }}>{title}</h3>
      </div>
    </FadeIn>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); }, { threshold: 0.2, rootMargin: "-20% 0px -40% 0px" });
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const navVis = scrollY > 500;

  return (
    <div style={{ "--f-display": "'Playfair Display', Georgia, serif", "--f-body": "'Cormorant Garamond', 'Times New Roman', serif", "--f-sans": "'DM Sans', 'Helvetica Neue', sans-serif", "--bg": "#0a0a0f", "--cream": "#f5f0e8", "--gold": "#d4af37", "--muted": "#a09b8c", "--red": "#c41e3a", background: "var(--bg)", color: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0a0a0f}::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.3);border-radius:3px}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes snow1{0%{transform:translateY(-10vh) translateX(0)}100%{transform:translateY(110vh) translateX(20px)}}
        @keyframes snow2{0%{transform:translateY(-10vh) translateX(0)}100%{transform:translateY(110vh) translateX(-15px)}}
        @keyframes snow3{0%{transform:translateY(-10vh) translateX(0)}100%{transform:translateY(110vh) translateX(10px)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.15)}50%{box-shadow:0 0 40px rgba(212,175,55,0.3)}}
      `}</style>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: navVis ? "rgba(10,10,15,0.92)" : "transparent", backdropFilter: navVis ? "blur(20px)" : "none", borderBottom: navVis ? "1px solid rgba(212,175,55,0.1)" : "none", transition: "all 0.5s ease", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", gap: 4, padding: "14px 0", flexWrap: "wrap", opacity: navVis ? 1 : 0, transform: navVis ? "translateY(0)" : "translateY(-10px)", transition: "all 0.4s ease" }}>
          {SECTIONS.filter(s => s.id !== "hero").map((s) => (
            <a key={s.id} href={`#${s.id}`} style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", color: activeSection === s.id ? "var(--gold)" : "var(--muted)", padding: "6px 14px", borderRadius: 20, background: activeSection === s.id ? "rgba(212,175,55,0.1)" : "transparent", transition: "all 0.3s ease" }}>{s.label}</a>
          ))}
        </div>
      </nav>

      {/* Snow */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: `${(i * 5.26) % 100}%`, top: `-${(i * 3.7) % 10}vh`, width: (i % 3) + 2, height: (i % 3) + 2, borderRadius: "50%", background: "rgba(255,255,255,0.12)", animation: `snow${(i % 3) + 1} ${8 + (i % 5) * 2.5}s linear infinite`, animationDelay: `${(i * 0.7) % 10}s` }} />
        ))}
      </div>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", padding: "60px 24px", background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)" }}>
        <FadeIn delay={0.2}><div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "var(--gold)", marginBottom: 24, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>Bangkok → Dubai → New York</div></FadeIn>
        <FadeIn delay={0.4}><h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(36px, 8vw, 80px)", fontWeight: 400, lineHeight: 1.05, color: "var(--cream)", maxWidth: 800 }}>Christmas<br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>in New York</span></h1></FadeIn>
        <FadeIn delay={0.6}><p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(16px, 2.5vw, 22px)", color: "var(--muted)", maxWidth: 520, lineHeight: 1.7, marginTop: 24 }}>10 jours d'ultra-luxe · Emirates First Class A380 · The Plaza Hotel · Le rêve de Maman j'ai raté l'avion</p></FadeIn>
        <FadeIn delay={0.8}>
          <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap", justifyContent: "center" }}>
            {[{ v: "Dec 12–21", l: "2026" }, { v: "$97K–142K", l: "Budget Total" }, { v: "2", l: "Voyageurs" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "var(--cream)" }}>{s.v}</div>
                <div style={{ fontFamily: "var(--f-sans)", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "var(--gold)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={1}><div style={{ marginTop: 60, animation: "float 3s ease-in-out infinite" }}><a href="#flights" style={{ color: "var(--gold)", textDecoration: "none", fontSize: 24 }}>↓</a></div></FadeIn>
      </section>

      {/* FLIGHTS */}
      <section id="flights" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle sup="Le Voyage" title="Emirates First Class A380" sub="Suites privées, douche à 35 000 pieds, Dom Pérignon, chauffeur Mercedes S-Class." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          <StatCard icon="✈️" value="BKK → DXB → JFK" label="Route" delay={0.1} />
          <StatCard icon="🛏" value="14 Suites" label="Cabine" delay={0.2} />
          <StatCard icon="🚿" value="Spa" label="Douche" delay={0.3} />
          <StatCard icon="🍾" value="Dom P." label="Champagne" delay={0.4} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <FeatureCard emoji="🪟" title="Suite Privée" desc="Porte coulissante, minibar, lit 2m, pyjamas hydratants, kit Bvlgari et casque B&W à garder." delay={0.1} />
          <FeatureCard emoji="🍽" title="Gastronomie à la Demande" desc="Caviar, Royal Doulton, Dom Pérignon, Dalmore King Alexander III, Hennessy Paradis." delay={0.2} />
          <FeatureCard emoji="🏛" title="Lounge Dubai" desc="Plus grand First lounge au monde : gastro, bar Moët, cigares, spa et cirage." delay={0.3} />
        </div>
        <FadeIn delay={0.2}><div style={{ marginTop: 40, padding: 32, borderRadius: 20, background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(196,30,58,0.04) 100%)", border: "1px solid rgba(212,175,55,0.15)", textAlign: "center" }}><div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>2 Billets A/R First Class</div><div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(30px, 5vw, 50px)", color: "var(--cream)", fontWeight: 400 }}>$56,000 — $70,000</div><div style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--muted)", marginTop: 10 }}>Réserver 4–6 mois avant · emirates.com · Vérifier « Airbus 380 »</div></div></FadeIn>
      </section>

      {/* HOTEL */}
      <section id="hotel" style={{ padding: "100px 24px", background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.03), transparent)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionTitle sup="L'Hôtel" title="The Plaza Hotel" sub="L'hôtel de Kevin McCallister. Vue Central Park, décorations spectaculaires, luxe intemporel." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            <StatCard icon="🏨" value="5 Étoiles" label="Classement" delay={0.1} />
            <StatCard icon="🛌" value="2 Chambres" label="Deluxe King" delay={0.2} />
            <StatCard icon="🌙" value="10 Nuits" label="Durée" delay={0.3} />
            <StatCard icon="🎄" value="Iconique" label="Noël" delay={0.4} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <FeatureCard emoji="🎬" title="'Lost in New York'" desc="Limo privée 4h : Empire State, Rockefeller, Carnegie Hall — tous les lieux du film." delay={0.1} />
            <FeatureCard emoji="🫖" title="Palm Court Tea" desc="Afternoon tea festif sous le plafond en vitrail. Accès prioritaire résidents." delay={0.2} />
            <FeatureCard emoji="📍" title="Emplacement" desc="Central Park à vos pieds, Bergdorf en face, Rockefeller à 10 min." delay={0.3} />
          </div>
          <FadeIn delay={0.2}><div style={{ marginTop: 40, padding: 32, borderRadius: 20, background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(196,30,58,0.04) 100%)", border: "1px solid rgba(212,175,55,0.15)", textAlign: "center" }}><div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>2 Chambres · 10 Nuits · Taxes Incluses</div><div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(30px, 5vw, 50px)", color: "var(--cream)", fontWeight: 400 }}>$28,000 — $39,000</div></div></FadeIn>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="experiences" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle sup="La Magie" title="Expériences de Noël" sub="NYC en décembre = un film grandeur nature." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          <FeatureCard emoji="🎄" title="Rockefeller Tree" desc="Sapin 23m, 50K LED, étoile Swarovski. Gratuit, semaine après 21h30." price="GRATUIT" delay={0.05} />
          <FeatureCard emoji="💃" title="Rockettes" desc="Christmas Spectacular : Parade des Soldats, finale sous la neige." price="$400–$700/2" delay={0.1} />
          <FeatureCard emoji="🩰" title="Casse-Noisette" desc="Balanchine au Lincoln Center. 90 danseurs, sapin de 12m." price="DÈS $59" delay={0.15} />
          <FeatureCard emoji="🏠" title="Dyker Heights" desc="Brooklyn, 300K+ lumières/maison. Bus tour + chocolat chaud." price="$59–$79" delay={0.2} />
          <FeatureCard emoji="⛸" title="Patinoire Rockefeller" desc="L'iconique rink sous le sapin. VIP lounge chauffé dispo." price="$22–$204" delay={0.25} />
          <FeatureCard emoji="🐴" title="Calèche" desc="Central Park, couvertures, skyline illuminée." price="$72–$141" delay={0.3} />
          <FeatureCard emoji="🏬" title="Vitrines Fifth Ave" desc="Bergdorf, Tiffany, Saks light show, Macy's." price="GRATUIT" delay={0.35} />
          <FeatureCard emoji="🚂" title="Holiday Train Show" desc="200 répliques NYC miniatures + 25 trains. Botanical Garden." price="$35–$43" delay={0.4} />
          <FeatureCard emoji="🔭" title="Top of the Rock" desc="ESB en rouge/vert + Central Park. Meilleur panorama de Noël." price="$42–$71" delay={0.45} />
        </div>
      </section>

      {/* ===== FOOD — THE BIG SECTION ===== */}
      <section id="food" style={{ padding: "100px 24px", background: "linear-gradient(180deg, transparent, rgba(196,30,58,0.02), transparent)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionTitle sup="La Table" title="Les Restaurants Iconiques" sub="Pour chaque adresse : la photo, LE plat à commander, et pourquoi c'est non-négociable." />

          <FoodCatHeader icon="🥩" title="Steakhouses Légendaires" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {FOOD_DATA.steaks.map((item, i) => <FoodCard key={item.name} item={item} delay={i * 0.1} />)}
          </div>

          <FoodCatHeader icon="🍔" title="Les Meilleurs Burgers" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {FOOD_DATA.burgers.map((item, i) => <FoodCard key={item.name} item={item} delay={i * 0.1} />)}
          </div>

          <FoodCatHeader icon="🍕" title="Le Pèlerinage Pizza" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {FOOD_DATA.pizza.map((item, i) => <FoodCard key={item.name} item={item} delay={i * 0.1} />)}
          </div>

          <FoodCatHeader icon="🇮🇹" title="Les Italiens Impossibles" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {FOOD_DATA.italian.map((item, i) => <FoodCard key={item.name} item={item} delay={i * 0.1} />)}
          </div>

          <FoodCatHeader icon="🥯" title="Delis & Bagels Historiques" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {FOOD_DATA.delis.map((item, i) => <FoodCard key={item.name} item={item} delay={i * 0.1} />)}
          </div>

          <FoodCatHeader icon="🍪" title="Desserts & Chocolat Chaud" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {FOOD_DATA.desserts.map((item, i) => <FoodCard key={item.name} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section id="itinerary" style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle sup="Le Planning" title="Itinéraire Jour par Jour" sub="10 jours orchestrés. Cliquer pour développer." />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <DayCard day="1" date="Sam 12 Déc" title="Arrivée & Première Soirée" highlights={["Arrivée JFK, chauffeur Emirates → The Plaza", "Sieste jet lag (BKK +12h)", "Déco du Plaza + Champagne Bar", "Rockefeller Tree + Saks Light Show"]} meal="Room service au Plaza ou Palm Court" />
          <DayCard day="2" date="Dim 13 Déc" title="Fifth Avenue & Central Park" highlights={["Palm Court Holiday Tea", "Vitrines : Bergdorf → Tiffany → Saks", "Calèche Central Park 60 min", "King Cole Bar au St. Regis"]} meal="Keens Steakhouse — Mutton Chop + scotch" />
          <DayCard day="3" date="Lun 14 Déc" title="Lower East Side & SoHo" highlights={["Russ & Daughters (bagel + lox)", "Katz's (pastrami on rye) — 3 blocks", "SoHo + Dominique Ansel (Cronut)", "Prince Street Pizza (Spicy Spring)"]} meal="Emilio's Ballato — Veal Antonio off-menu" />
          <DayCard day="4" date="Mar 15 Déc" title="Brooklyn Day" highlights={["Peter Luger lunch (burger ou porterhouse)", "DUMBO + Jacques Torres Wicked Hot Choc", "Bus tour Dyker Heights Lights"]} meal="Rubirosa — Tie Dye vodka pizza" />
          <DayCard day="5" date="Mer 16 Déc" title="Rockettes & Rockefeller" highlights={["Patinage Rockefeller Center", "Radio City Christmas Spectacular", "Photos au sapin au crépuscule"]} meal="Joe's Pizza + Carbone (si résa)" />
          <DayCard day="6" date="Jeu 17 Déc" title="West Village & Nutcracker" highlights={["Central Park : Bethesda, Bow Bridge", "J.G. Melon — burger + cottage fries", "Levain Bakery — cookies chauds", "The Nutcracker Lincoln Center 19h"]} meal="Via Carota — Cacio e Pepe walk-in 21h30" />
          <DayCard day="7" date="Ven 18 Déc" title="Marchés & Midtown" highlights={["Bryant Park Winter Village (180+ shops)", "Shake Shack original Madison Sq Park", "Union Square Holiday Market", "Top of the Rock au sunset"]} meal="Minetta Tavern — Black Label Burger" />
          <DayCard day="8" date="Sam 19 Déc" title="Pèlerinage Lucali" highlights={["Carroll Gardens 15h pour la waitlist", "BYOB + cash only", "DUMBO photos nocturnes", "230 Fifth rooftop igloos"]} meal="Lucali — Margherita + calzone aux chandelles" />
          <DayCard day="9" date="Dim 20 Déc" title="Botanical Garden & Grand Dîner" highlights={["Holiday Train Show (2h)", "Corner Bistro — dive-bar burger", "Macy's vitrines", "Empire State Building de nuit"]} meal="Torrisi ou I Sodi — dîner d'adieu" />
          <DayCard day="10" date="Lun 21 Déc" title="Dernier Matin & Départ" highlights={["Wollman Rink patinage vue skyline", "Zabar's souvenirs (babka, rugelach)", "Derniers moments au Plaza", "Chauffeur Emirates → JFK EK202 ~23h"]} meal="Champagne Bar — farewell drink" />
        </div>
      </section>

      {/* BUDGET */}
      <section id="budget" style={{ padding: "100px 24px", background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.04), transparent)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionTitle sup="Le Budget" title="Estimation Totale" sub="No limit. 2 personnes, 10 jours." />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { c: "✈️ Vols", d: "2× Emirates First A380 A/R", r: "$56,000 – $70,000" },
              { c: "🏨 Hôtel", d: "Plaza, 2 chambres × 10 nuits", r: "$28,000 – $39,000" },
              { c: "🍽 Restos", d: "~$300–500/jour pour 2", r: "$3,000 – $5,000" },
              { c: "🎄 Activités", d: "Rockettes, Nutcracker, etc.", r: "$1,500 – $3,000" },
              { c: "🚗 Transport", d: "Uber Black, 10 jours", r: "$2,000 – $4,000" },
              { c: "🛍 Shopping", d: "Fifth Ave (optionnel)", r: "$5,000 – $20,000" },
              { c: "💵 Tips", d: "Hôtel, restos, chauffeurs", r: "$1,000 – $2,000" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderRadius: 12, background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 17, color: "var(--cream)" }}>{item.c}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{item.d}</div>
                  </div>
                  <div style={{ fontFamily: "var(--f-sans)", fontSize: 14, color: "var(--gold)", letterSpacing: 1, fontWeight: 500, whiteSpace: "nowrap" }}>{item.r}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 32, padding: 40, borderRadius: 20, textAlign: "center", background: "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(196,30,58,0.06))", border: "1px solid rgba(212,175,55,0.25)", animation: "pulseGlow 4s ease-in-out infinite" }}>
              <div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>Total · 2 Personnes</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(34px, 6vw, 60px)", color: "var(--cream)", fontWeight: 400 }}>$97,000 — $142,000</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "var(--muted)", marginTop: 14 }}>Shopping en sus · Réserver tôt = $10K+ d'économies</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle sup="Les Essentiels" title="Calendrier de Réservation" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { w: "Juin 2026", t: "Vols Emirates First + chambres Plaza (vue Central Park)" },
            { w: "Août 2026", t: "Billets Rockettes + Nutcracker" },
            { w: "Nov 2026", t: "Résas Carbone, Torrisi, I Sodi — Resy 10h00, 30 jours avant" },
            { w: "Nov 2026", t: "Patinage Rockefeller + Dyker Heights + Top of the Rock" },
          ].map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "18px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.08)", borderRadius: 14 }}>
                <div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", background: "rgba(212,175,55,0.1)", padding: "6px 14px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>{t.w}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "var(--cream)", lineHeight: 1.6 }}>{t.t}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ marginTop: 48, padding: 28, borderRadius: 20, background: "rgba(196,30,58,0.06)", border: "1px solid rgba(196,30,58,0.15)" }}>
            <div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>⚠️ À ne pas oublier</div>
            {["💵 Cash : Peter Luger, J.G. Melon, Corner Bistro, Lucali — pas de CB. Prévoir $500+.", "📱 App Resy : créer le compte MAINTENANT. C'est le portail pour Carbone, Torrisi, I Sodi, Via Carota.", "🧥 Météo : 0–7°C. Manteaux chauds, gants, écharpes. Surtout pour Dyker Heights.", "🚗 Transport : Uber Black. Brooklyn = voiture. Midtown = marcher."].map((tip, i) => (
              <div key={i} style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginBottom: i < 3 ? 10 : 0 }}>{tip}</div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "80px 24px 40px", textAlign: "center", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <FadeIn>
          <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(24px, 4vw, 40px)", color: "var(--cream)", fontWeight: 400, fontStyle: "italic" }}>Merry Christmas, you filthy animal.</div>
          <div style={{ fontFamily: "var(--f-sans)", fontSize: 12, color: "var(--muted)", marginTop: 20, letterSpacing: 3, textTransform: "uppercase" }}>Bangkok → New York · Décembre 2026</div>
          <div style={{ marginTop: 24, fontSize: 32 }}>🎄✨🗽</div>
        </FadeIn>
      </footer>
    </div>
  );
}
