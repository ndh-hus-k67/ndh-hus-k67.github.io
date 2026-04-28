---
title: "Common Mistakes When Choosing Bolt Length (With a Thread Engagement Formula)"
description: "Bolts that are too short or too long cause real failures: stripped threads, bottoming out, or joints that never clamp. Learn a practical bolt-length formula and how to size minimum thread engagement for tapped holes."
seoTitle: "How to Choose Bolt Length Correctly | Thread Engagement Formula"
seoDescription: "A practical guide to bolt length: add up grip thickness, washers, nut height and thread protrusion. For tapped holes, use a thread engagement (Le) rule of thumb and avoid bottoming out."
translationKey: "blog-bolt-length-thread-engagement"
pubDate: 2026-04-28
cardImage: "@/images/blog/chon-chieu-dai-bu-long-va-an-ren.avif"
cardImageAlt: "Guide to choosing bolt length and calculating thread engagement"
readTime: 11
tags: ["bolts", "bolt length", "thread engagement", "tapped holes", "guide"]
faq:
  - question: "How many threads should protrude past the nut?"
    answer: "A common practical target is about 1–3 threads (1–3 pitches) beyond the nut—enough to ensure full nut engagement without leaving an excessively long tail." 
  - question: "What is the minimum thread engagement for a tapped hole?"
    answer: "Rule of thumb: steel into steel is often ≥ 1×d. For softer tapped materials (aluminum and softer alloys), designers often aim for ≥ 1.5×d to 2×d. For critical joints, follow the design standard." 
  - question: "Why can the joint still be loose even if the bolt length looks right?"
    answer: "Partially threaded bolts can ‘run out’ of thread: the nut may hit the unthreaded shank before the joint is clamped. The fix is ensuring the nut sits on threaded portion (or using fully threaded fasteners where appropriate)."
---

Choosing the “right” **bolt length** is one of those details that quietly determines whether a joint is reliable—or becomes a source of stripped threads, bottoming out, and fasteners that loosen prematurely.

This post covers the most common mistakes and gives **practical formulas** you can use in the shop for both:
- **Through-bolts with a nut**, and
- **Screws/bolts into tapped holes**, where **thread engagement** matters.

## 1) Mistake #1: Not identifying the joint type

Start by deciding which joint you have:

### A) Through-bolt + nut
The bolt goes through the parts and is tightened with a **nut**.

### B) Bolt/screw into a tapped hole
The fastener passes through a clearance hole and **engages internal threads** in a tapped component.

They look similar, but the “enough thread” requirement is different:
- With a **nut**: you typically want full nut height engaged and **1–3 threads protruding**.
- With a **tapped hole**: you need sufficient **engagement length $L_e$** to avoid stripping the internal threads.

## 2) Mistake #2: Measuring bolt length incorrectly

For most hex bolts and socket head cap screws, length is measured **from under the head to the tip**.

A common exception:
- **Countersunk (flat head) screws**: length is often measured **including the head**.

When replacing existing hardware, make sure you’re comparing the same head style.

## 3) Mistake #3: Forgetting the full stack-up

List everything the bolt passes through:
- Total clamped thickness: $t_1 + t_2 + \dots$
- Washer stack thickness: $t_w$
- Nut height: $t_n$ (if used)

Many “off by 2–3 mm” issues come from forgetting washers.

## 4) Practical bolt-length formulas

### 4.1) Through-bolt + nut

A quick, reliable shop formula:

$$
L \approx t_\text{grip} + t_\text{washers} + t_\text{nut} + L_\text{protrusion}
$$

Where:
- $t_\text{grip}$: total thickness of parts being clamped.
- $t_\text{washers}$: total washer thickness.
- $t_\text{nut}$: nut height.
- $L_\text{protrusion}$: bolt end beyond the nut.

**Protrusion guideline:**
- Common target: **1–3 thread pitches**.
- Using pitch $P$: $L_\text{protrusion} \approx (1\text{ to }3)\,P$.

#### Example (nut)
- M10 coarse pitch: $P = 1.5\,\text{mm}$
- Two plates: 8 mm + 6 mm → $t_\text{grip}=14$ mm
- One washer: 2 mm → $t_w=2$ mm
- Nut height: ~8 mm → $t_n=8$ mm
- Target 2 threads protruding → $L_\text{prot} \approx 2P = 3$ mm

$$
L \approx 14 + 2 + 8 + 3 = 27\,\text{mm}
$$

Choose the nearest common size: **M10×30**.

### 4.2) Into a tapped hole (thread engagement)

For tapped holes, you’re choosing length to achieve engagement $L_e$ **without bottoming out**.

A practical sizing approach:

$$
L \approx t_\text{clearance parts} + t_\text{washers} + L_e + \Delta
$$

Where:
- $t_\text{clearance parts}$: total thickness of the parts the screw passes through as clearance holes.
- $L_e$: required thread engagement length in the tapped material.
- $\Delta$: safety allowance for tolerances and to prevent bottoming in blind holes.
  - A common rule: $\Delta \approx 1\text{–}2\,P$.

## 5) Thread engagement ($L_e$) rules of thumb

There isn’t a single “universal” number, but a widely used rule of thumb is:

- **Steel into steel**:
  $$L_e \ge 1.0\,d$$
- **Softer tapped materials** (aluminum and softer alloys):
  $$L_e \ge 1.5\,d \text{ to } 2.0\,d$$

Where $d$ is the nominal thread diameter (M8 → $d=8\,\text{mm}$).

**Important notes:**
- If you cannot achieve $L_e$ because the tapped part is thin, don’t “just torque harder”. Consider alternatives like **rivet nuts**, **thread inserts**, or a different joint design.
- For high loads, fatigue, vibration, or safety-critical joints, follow the applicable **design standard/spec**.

#### Example (tapped hole)
- M8 screw ($d=8$, $P=1.25$)
- Clearance part thickness: 5 mm
- Tapped part: aluminum → target $L_e \ge 1.5d = 12$ mm
- Blind-hole allowance: $\Delta \approx 2P = 2.5$ mm

$$
L \approx 5 + 12 + 2.5 = 19.5\,\text{mm}
$$

Select **M8×20** and confirm the **usable thread depth**.

## 6) Mistake #4: Ignoring partially threaded bolts

Many standard bolts have an **unthreaded shank**. If the shank ends up under the nut, the nut can “stop” on the smooth section before the joint is clamped.

Symptoms:
- Torque rises quickly, but the joint still has a gap.

Prevention:
- Ensure the nut seats on the **threaded portion**, or use **fully threaded** fasteners when appropriate.

## 7) Mistake #5: Choosing too long (bottoming out, interference)

Overlong fasteners can cause:
- Mechanical interference with nearby parts.
- **Bottoming out** in blind tapped holes → sudden torque spike → stripped threads or cracked parts.

A simple check for blind holes:
- Measure the hole depth and confirm **usable thread depth**, then keep some clearance at the bottom.

## 8) A 5-step checklist

1) Identify the joint type: **nut** vs **tapped hole**.
2) Sum your stack-up: $t_\text{grip}$ and washers.
3) With a nut: add nut height and target **1–3 threads** protrusion.
4) With tapped holes: choose $L_e$ by material and add $\Delta$ to avoid bottoming.
5) Verify shank/thread coverage and clearance.

If you want a quick refresher on metric sizes and pitch notation, see: [How to Read Metric Bolt Sizes (M6/M8/M10) and Thread Pitch (P)](/en/blog/how-to-read-metric-bolt-sizes-m6-m8-m10-thread-pitch-p/).

Category links: [Bolts](/en/bolts) · [Screws](/en/screws)
