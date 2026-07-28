# AI-Generated Architectural Experience — 10-Day POC Plan

## 1. Purpose
Create a private, shareable browser experience that demonstrates the company’s ability to turn an existing architectural aerial render into a photoreal, interactive, AI-generated destination story.

The audience is a developer/investor, while the experience lets them feel the project as a future guest. The success test is: **a viewer says, “I want this for my development.”**

## 2. Chosen reference and narrative adaptation
**Candidate:** `sahl hashesh.png` — a resort-style aerial render in a desert setting.

The image has strong architecture, road arrival, palms, pools, and an oasis-like landscape. It does **not** show a real sea edge or marina, so the proof-of-concept should be framed as:

> **Arrive at the resort → discover its central oasis.**

Do not force a waterfront story onto this masterplan. The central pool/garden promenade becomes the deep-dive destination.

## 3. Scope boundary: the vertical slice
This is not a reusable platform and not a complete masterplan experience. It is one excellent, end-to-end journey.

### Included
- One company-approved aerial render, enhanced and reinterpreted with AI
- 6–8 second cinematic introduction
- One subtle looping aerial masterplan with two fixed hotspots
- Arrival hero scene with ambient loop, sound, and 1–2 contextual popups
- Central oasis/pool promenade deeper scene with ambient loop, sound, and 1–2 contextual popups
- One experimental seamless transition/fly-through only if it works by day 6
- A polished fallback transition
- Minimal fictional destination identity
- Private shareable web link
- Lightweight behind-the-scenes case-study view

### Explicitly excluded
- A full explorable resort
- Hotel, retail, residential, or beach scenes beyond the two-scene journey
- A reusable project-upload/generation platform
- Mobile, touchscreen, offline, and broad browser support
- Invented figures presented as facts

## 4. Audience, tone, and experience principles

### Audience
- Primary: developer/investor
- Secondary: future guest/end buyer
- First usage: self-guided, but presented by the creator during internal review

### Required emotional response
1. Anticipation
2. Confidence
3. Desire

### Visual language
- Photoreal cinematic luxury
- Warm clear coastal/desert late afternoon, light breeze, calm water
- Progression: golden afternoon → sunset → blue hour
- Architecture is the anchor; public life proves its value
- Slow, stabilized camera movement only
- Quiet, minimal, full-screen interface with restrained type and a single identity accent colour

## 5. Final user flow

### 0. Start screen
- Full-screen still or very subtle motion
- Fictional destination name/wordmark
- `Start experience` button
- Sound enabled only after this click

### 1. Six-to-eight second introduction
A fast, elegant sequence:
1. Enhanced aerial establishes the desert-oasis destination
2. Short arrival/detail beat
3. One concise value line
4. Dissolve into the interactive masterplan

No voice-over in version one. Use a subtle musical bed.

### 2. Explorable masterplan
- Enhanced aerial becomes a seamless, subtle loop
- Fixed hotspot: **Arrival**
- Fixed hotspot: **Central Oasis**
- On hover: loop gently dims/pauses; destination label appears
- A quiet first-use cue: `Choose a destination`

### 3. Arrival hero scene
- Golden-afternoon arrival court / gateway
- Gentle forward glide loop
- Arrival ambience: light wind, distant vehicle arrival, palms, subtle guest activity
- Contextual hotspots (maximum two):
  - Arrival moment: lifestyle text + a qualitative value statement
  - Architecture/landscape moment: lifestyle text + a qualitative value statement
- Embedded visual exit: `Discover the oasis`
- Persistent minimal `Back to masterplan` control

### 4. Central oasis / pool promenade scene
- Sunset moving toward blue hour
- Slow lateral promenade movement
- Ambient loop: water, light wind, distant conversation, restrained evening dining atmosphere
- Contextual hotspots (maximum two):
  - Pool/promenade social moment
  - Evening destination / landscape moment
- Persistent `Back to masterplan` control

### 5. Transition rule
- Preferred final transition: short controlled fade/blur plus sound bridge.
- Optional experiment: one AI-generated arrival-to-oasis fly-through.
- **Decision gate:** if it is not convincing by day 6, remove it from the final route. Do not let it endanger the finished demo.

## 6. Content rules

### Project truth sheet — create on day 1
Get a 30-minute briefing from the project team and record:
- Site boundary and surrounding roads
- Non-negotiable building masses and heights
- Main arrival route
- Pool/oasis circulation and key landscape features
- Program and landmark elements
- Elements AI may improve versus elements it must preserve
- Public-use permission confirmation

### AI fidelity rule
**Design-faithful, not pixel-identical.** Preserve layout, building locations, circulation, masses, and identifiable landmark elements. AI may enrich materials, planting, lighting, people, vehicles, water, and atmosphere.

### Popup copy rule
- One short lifestyle line + one concise value/design insight.
- Use verified project facts where available.
- If numbers are needed before verified data exists, use fictional **concept scenario assumptions** under the fictional destination identity. Never imply they are approved project metrics.

## 7. Production asset list

| Asset | Purpose | Target |
|---|---|---|
| Source aerial + annotated truth sheet | Design anchor | 1 |
| Enhanced masterplan still | Main spatial reference | 1 approved image |
| Masterplan loop | Navigation background | 6–10 sec seamless loop |
| Opening intro | Start of story | 6–8 sec |
| Arrival hero still | Quality benchmark and video source | 1 approved image |
| Arrival loop | Scene ambience | 5–8 sec seamless loop |
| Oasis hero still | Quality benchmark and video source | 1 approved image |
| Oasis loop | Scene ambience | 5–8 sec seamless loop |
| Optional fly-through | Experimental transition | 1 only |
| Ambient audio loops | Immersion | intro + arrival + oasis |
| UI identity | Cohesion | wordmark, type, accent colour |
| Process captures | Case study | before/after + selected prompts/assets |

## 8. AI and asset workflow

1. **Choose a small tool stack on day 1–2.** Higgsfield and Magnific are available; test tools, then lock one primary image workflow, one video workflow, and one sound workflow.
2. **Generate stills before video.** Approve a still for each scene before attempting motion.
3. **Use the aerial and approved scene stills as references.** Do not generate each frame or scene from unrelated prompts.
4. **Create short loops.** Short, subtle movement is more reliable than ambitious sequences.
5. **Curate, do not endlessly regenerate.** Pick a quality threshold and move on once an asset supports the story.
6. **Keep a lightweight asset log.** For every chosen asset, record source/reference, model/tool, final prompt, chosen output, and decision reason.

## 9. Web prototype approach

Build a desktop-first, single-page custom web prototype.

### Suggested technical shape
- React + Vite + TypeScript
- Full-screen scene state machine: `start → intro → masterplan → arrival → oasis`
- Local/config-driven scene manifest for video, audio, hotspots, labels, and popup content
- Video elements for loops; graceful poster-image fallback
- HTML/CSS overlays for hotspots and popups
- Sound managed per scene; a visible mute control after start
- Host privately on a simple shareable deployment

### Interaction safeguards
- `Start experience` is required before audio begins
- `Skip to masterplan` is always available during intro
- First-use hints disappear after interaction
- `Back to masterplan` is always visible in scene views
- Keep hotspots large enough and labels clear for a laptop presentation

## 10. Ten-day sprint

### Day 1 — choose and anchor
- Confirm project permission and select the reference render
- Obtain the project-team briefing
- Write the truth sheet
- Create a 10–15 image reference/mood board
- Define fictional destination name, minimal wordmark, typography, accent colour

**Output:** approved design constraints and visual direction.

### Day 2 — tool research and visual tests
- Test image enhancement, image generation, video loop, and sound tools
- Run the same small prompt/reference experiment across candidates
- Decide the locked production stack
- Establish prompt structure and negative constraints

**Output:** one visual rulebook and one selected tool stack.

### Day 3 — masterplan
- Enhance/reinterpret aerial while preserving layout
- Create masterplan poster still and loop
- Mark hotspot positions and validate them against the truth sheet

**Output:** approved interactive masterplan asset.

### Day 4 — arrival scene
- Generate/curate arrival still
- Produce arrival loop and ambient audio
- Draft two popup texts

**Output:** arrival scene asset package.

### Day 5 — oasis scene
- Generate/curate central oasis still
- Produce oasis loop and ambient audio
- Draft two popup texts
- Hold an early review with one design lead and one commercial colleague

**Output:** oasis asset package and feedback list.

### Day 6 — build and transition gate
- Build start, intro, masterplan, scene navigation, hotspots, popups, and sound controls
- Test one fly-through experiment
- Make the fly-through/fallback decision

**Output:** complete but rough clickable journey.

### Day 7 — integration and story polish
- Integrate final assets, controlled transitions, and sound bridges
- Apply feedback to copy, hotspot placement, and hierarchy
- Add onboarding cues and quality fallbacks

**Output:** internally reviewable private link.

### Day 8 — refinement
- Fix visual discontinuities and AI artifacts in the most visible frames
- Improve load behaviour, loop seams, audio transitions, and text readability
- Capture before/after and process material

**Output:** presentation candidate.

### Day 9 — self-guided test
- Ask reviewers to: (1) find the oasis; (2) open a detail popup; (3) explain the value they understood
- Record friction and misunderstandings
- Make only high-impact corrections

**Output:** validated interaction and final change list.

### Day 10 — ship
- Final QA in Chrome on the presentation laptop
- Deploy/private-share final link
- Prepare a concise behind-the-scenes case-study deck/page
- Rehearse a 60–90 second presenter walkthrough

**Output:** shareable POC plus process proof.

## 11. Quality gates

### Must be true before shipping
- A viewer can navigate without explanation
- The masterplan remains spatially credible to the project team
- Each scene reads as part of one coherent destination and time-of-day arc
- Loops have no distracting artifact at the seam
- Audio never begins without user intent and can be muted
- All figures are verified or explicitly framed as fictional scenario assumptions
- The link works in Chrome on the presentation laptop

### Cut, rather than compromise
1. Experimental fly-through
2. Second popup in each scene
3. Extra intro shots
4. Extra sound detail
5. Any third location

Never cut the enhanced masterplan, arrival scene, oasis scene, clear navigation, or polish pass.

## 12. Portfolio/process case study
Keep this separate from the client-like journey. Show:
1. Original aerial reference
2. Truth-sheet constraints
3. AI enhancement and scene exploration
4. Selected final stills and loops
5. Prompt/asset log excerpts
6. The final interactive flow
7. What was learned and what would be scaled next

## 13. Immediate next actions
1. Confirm this resort aerial is the selected project or provide the next candidate.
2. Get the project-team briefing and make the truth sheet.
3. Create a small reference board for “desert oasis, cinematic luxury, late afternoon to blue hour.”
4. Run day-2 tool tests before generating final assets.
