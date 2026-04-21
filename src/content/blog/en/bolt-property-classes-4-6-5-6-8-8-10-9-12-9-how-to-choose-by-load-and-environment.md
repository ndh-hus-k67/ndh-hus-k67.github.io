---
title: "Bolt Property Classes 4.6/5.6/8.8/10.9/12.9 — Choosing by Load and Environment"
description: "Decode ISO bolt property classes 4.6–12.9 (Rm/Re), compare them quickly, and choose for load, vibration, and corrosion exposure."
seoTitle: "Bolt Property Classes 4.6–12.9: How to Choose"
seoDescription: "Understand bolt property classes 4.6/5.6/8.8/10.9/12.9, decode Rm/Re, and pick the right class for load, vibration, and corrosion exposure."
translationKey: "blog-day2-bolt-property-class"
pubDate: 2026-04-22
cardImage: "@/images/blog/bang-cap-ben-bu-long.avif"
cardImageAlt: "How to choose bolt property classes 4.6 5.6 8.8 10.9 12.9 by load and environment"
readTime: 11
tags: ["property class", "bolts", "8.8", "10.9", "12.9", "ISO 898-1", "guide"]
faq:
  - question: "Is 8.8 always better than 4.6?"
    answer: "Not always. 8.8 is stronger, but the best choice depends on the joint design, internal threads, tightening method, and corrosion requirements."
  - question: "Should I upgrade from 8.8 to 10.9/12.9 for safety?"
    answer: "Only if the design/spec allows it. Upgrading can overload female threads or joint members and may change the failure mode."
---

Bolt diameter (M) and thread pitch (P) tell you whether parts **fit**. But to make a joint **safe under load**, you need the right **property class**—for example **4.6 / 5.6 / 8.8 / 10.9 / 12.9**.

This post explains what these numbers mean (ISO concept), how to read them quickly, and how to choose based on **load** and **environment**.

## 1. What is a bolt “property class”?

For carbon steel and alloy steel bolts, the property class typically follows **ISO 898-1** and is written as **x.y** (e.g. **8.8**).

It’s related to:
- **Rm**: ultimate tensile strength
- **Re**: yield strength

Quick decoding rules (based on the marking convention):
- Rm ≈ 100 × x (MPa)
- Re ≈ (y/10) × Rm

Example **8.8**:
- Rm ≈ 100 × 8 = 800 MPa
- Re ≈ 0.8 × 800 = 640 MPa

## 2. Quick comparison table: 4.6 → 12.9

| Class | Approx. Rm (MPa) | Approx. Re (MPa) | Quick note |
|---|---:|---:|---|
| 4.6 | 400 | 240 | Light duty, simple joints |
| 5.6 | 500 | 300 | Slightly stronger light/medium duty |
| 8.8 | 800 | 640 | Common industrial “default” |
| 10.9 | 1000 | 900 | Higher load, needs good tightening practice |
| 12.9 | 1200 | 1080 | Very high strength, more specialized use |

Notes:
- Values above are **approximate** for quick understanding. Always verify with the applicable standard and supplier data for final design.
- “Stronger” is not automatically “better” if corrosion, fatigue, or brittle failure risks dominate.

## 3. Choosing by load: a practical mindset

### Step 1: Identify the main load case
- **Tension** (clamping/anchoring)
- **Shear** (transverse loading)
- **Combined + vibration** (machines and dynamic joints)

In many bolted joints, the goal is to create enough **preload (clamp force)** so parts don’t slip and the load is distributed predictably. Higher classes can support higher preload—*if* the female thread, bearing surfaces, and tightening method are appropriate.

### Step 2: Map typical use to class (rule-of-thumb)
- **4.6 / 5.6**: household fixtures, light frames, low static loads.
- **8.8**: common machinery and structural assemblies.
- **10.9**: high loads or space-limited designs where higher strength is required.
- **12.9**: fixtures, tooling, and applications requiring high clamp force and stiffness with tight process control.

If you’re replacing existing bolts, match the **original class** or follow the equipment design spec. “Upgrading” class can overload internal threads, distort joint members, or shift failure to a different mode.

## 4. Choosing by environment: corrosion protection matters

### Indoor / dry environments
- A wide range of classes can work; select based mainly on load and tightening method.
- Choose coating/finish for basic rust protection and appearance.

### Outdoor / high humidity / coastal exposure
Think in two dimensions:
1) Required strength (property class)
2) Required corrosion resistance (material/coating)

Practical guidance:
- For corrosion-driven applications, consider **stainless steel**—but note stainless uses different designations (e.g. A2-70, A4-80), not 8.8/10.9.
- If you need both **high strength** and **corrosion resistance**, it’s often a steel class like 8.8/10.9 paired with an appropriate protective system (depends on supplier and spec).

### Important note for high-strength bolts (10.9 / 12.9)
- Some surface treatments (especially if poorly controlled) can increase risk of **hydrogen embrittlement**.
- For critical joints, prioritize suppliers with clear, controlled coating processes and QC.

## 5. Selection checklist (load + environment)

- Is the joint mainly **tension**, **shear**, or **combined**?
- Static load or **vibration/fatigue**?
- Do you need high preload/clamp force?
- What is the corrosion exposure (humidity, salt, chemicals)?
- What coating is specified—and is it appropriate for higher classes?
- Can the female thread and joint members support the selected class and tightening torque?

## 6. Quick examples (for reference)

- **Indoor machine frame, medium load, light vibration**: class **8.8** is often a balanced choice.
- **High load with limited space**: consider **10.9** if the joint and process support it.
- **Tooling/fixtures requiring stiffness and clamp force**: may require **12.9**.
- **Outdoor applications prioritizing corrosion resistance**: evaluate stainless or suitable corrosion protection systems—don’t choose by strength alone.

For product categories, see: [Bolts](/en/bolts).

Back to basics: [How to Read Metric Bolt Sizes (M6/M8/M10) and Thread Pitch (P)](/en/blog/how-to-read-metric-bolt-sizes-m6-m8-m10-thread-pitch-p/).

> Note: This is a general guide. Safety-critical joints should be designed and verified against the relevant standards and application-specific requirements.
