/**
 * Treatments and services.
 *
 * All copy and prices here are DRAFT: written in plain language for nervous
 * patients and agreed to be reviewed and signed off by the clinicians.
 * Prices are guide "from" prices in ZAR for 2026.
 */

import type { Faq } from "./site";

export type TreatmentCategory = "dental" | "medical";

export type Treatment = {
  slug: string;
  category: TreatmentCategory;
  name: string;
  /** One soft line under the title. */
  tagline: string;
  /** Card blurb: one or two short sentences. */
  summary: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the tall arch crop on the treatment page. */
  imagePosition?: string;
  /** Doctor and dentist both involved (e.g. sedation in the dental chair). */
  sharedCare?: boolean;
  price: { from: string; note?: string };
  facts: { time: string; visits: string; comfort: string };
  /** "In simple terms": short paragraphs, no jargon. */
  simple: string[];
  goodFor: string[];
  steps: { title: string; text: string }[];
  aftercare: string[];
  faqs: Faq[];
};

const img = (id: string, w = 1200, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const treatments: Treatment[] = [
  /* ============================ DENTAL ============================ */
  {
    slug: "consultation-and-x-rays",
    category: "dental",
    name: "Consultation & X-rays",
    tagline: "A calm first look, and a clear plan.",
    summary: "A full check of your teeth and gums, with X-rays so nothing is missed. You leave with a written plan and prices.",
    image: img("photo-1619691249147-c5689d88016b"),
    imageAlt: "Dentist showing a patient their X-ray on a tablet",
    price: { from: "R850", note: "Includes check-up and two bitewing X-rays" },
    facts: { time: "30-45 minutes", visits: "1 visit", comfort: "No pain, no needles" },
    simple: [
      "This is where everything starts. We look at each tooth, check your gums, and take small X-rays that show what the eye can't see, like decay between teeth or under old fillings.",
      "Then we sit you up, show you the pictures on screen, and talk you through what we found in plain language. If you need treatment, you get a written plan with the cost of each step. You decide what happens next.",
    ],
    goodFor: [
      "Anyone who hasn't seen a dentist in over six months",
      "New patients, including children",
      "Toothache, sensitivity or bleeding gums",
      "A second opinion on a treatment plan",
    ],
    steps: [
      { title: "We talk first", text: "Tell us about any worries, pain or bad experiences. Nothing happens until you're ready." },
      { title: "A gentle check", text: "We check every tooth, your gums, bite and the soft tissues of your mouth." },
      { title: "Quick X-rays", text: "Small digital X-rays take seconds and use a very low dose of radiation." },
      { title: "Your plan", text: "We explain what we found and give you a written plan with prices." },
    ],
    aftercare: [
      "Nothing special. You can eat, drink and go back to work straight away.",
      "Take your plan home and think it over. There's no pressure to book on the day.",
    ],
    faqs: [
      { q: "Are dental X-rays safe?", a: "Yes. Digital X-rays use a very small dose, roughly the same as a few hours of natural background radiation. We only take the ones we need. Let us know if you might be pregnant." },
      { q: "Will it hurt?", a: "No. A check-up involves no needles and no drilling. If any area is sensitive, tell us and we'll be extra gentle." },
      { q: "How often should I have a check-up?", a: "For most people, every six to twelve months. We'll suggest what's right for you based on your teeth and gums." },
      { q: "Can my medical aid pay?", a: "Most plans cover a yearly check-up and X-rays from your savings or day-to-day benefits. We'll give you the codes so you can check." },
    ],
  },
  {
    slug: "professional-dental-cleaning",
    category: "dental",
    name: "Professional dental cleaning",
    tagline: "Fresh, smooth teeth and healthier gums.",
    summary: "We gently remove the hard build-up your toothbrush can't, then polish your teeth smooth.",
    image: img("photo-1674775372064-8c75d3f8c757"),
    imageAlt: "Smiling woman having her teeth cleaned",
    price: { from: "R750", note: "Scale and polish" },
    facts: { time: "30-45 minutes", visits: "1 visit", comfort: "Mild, numbing gel available" },
    simple: [
      "Even with good brushing, plaque hardens into tartar. Tartar sticks to your teeth like limescale in a kettle, and only a dental instrument can remove it. Left alone, it causes bleeding gums, bad breath and eventually loose teeth.",
      "We use a gentle ultrasonic scaler and fine hand tools to lift the tartar away, then polish your teeth so plaque struggles to stick. Most people say their mouth feels brand new.",
    ],
    goodFor: [
      "Bleeding gums when you brush or floss",
      "Bad breath that won't go away",
      "Stains from coffee, tea or smoking",
      "Everyone, every six months",
    ],
    steps: [
      { title: "Check your gums", text: "We measure your gum health so we can track it over time." },
      { title: "Remove tartar", text: "A fine ultrasonic tip and water spray lift the build-up away." },
      { title: "Polish", text: "A gritty paste polishes away surface stains and leaves teeth smooth." },
      { title: "Tips for home", text: "We show you any spots you might be missing when you brush." },
    ],
    aftercare: [
      "Your gums may feel a bit tender for a day. A warm salt-water rinse helps.",
      "Some sensitivity to cold is normal for a day or two.",
      "Keep brushing twice a day and clean between your teeth daily.",
    ],
    faqs: [
      { q: "Does a cleaning hurt?", a: "Most people feel vibration and water, not pain. If your gums are sensitive, we can use a numbing gel or a little local anaesthetic." },
      { q: "Will it damage my enamel?", a: "No. The instruments are designed to remove tartar, not tooth. Regular cleanings protect your enamel." },
      { q: "Why do my gums bleed afterwards?", a: "Inflamed gums bleed easily. Once the tartar is gone, they usually heal and stop bleeding within a week or two." },
    ],
  },
  {
    slug: "fillings",
    category: "dental",
    name: "Fillings",
    tagline: "Small repairs, made to match your tooth.",
    summary: "We clean out decay and rebuild the tooth with a tooth-coloured filling that blends in.",
    image: img("photo-1681939282781-341ac4f61996"),
    imageAlt: "Dentist examining a patient's teeth with a mirror",
    price: { from: "R950", note: "Per tooth, white (composite) filling" },
    facts: { time: "30-60 minutes", visits: "1 visit", comfort: "Fully numbed" },
    simple: [
      "A cavity is a small hole caused by decay. It won't heal by itself, and it grows over time. Catching it early means a small, simple filling instead of something bigger later.",
      "We numb the tooth so you feel no pain, gently remove the decay, and fill the space with a white material shaded to match your tooth. It sets hard in seconds under a blue light.",
    ],
    goodFor: [
      "Cavities found at your check-up",
      "Chipped or slightly broken teeth",
      "Replacing old silver (amalgam) fillings",
      "Sensitivity to sweet or cold",
    ],
    steps: [
      { title: "Numbing", text: "A numbing gel first, then a slow, gentle injection. Most people barely feel it." },
      { title: "Clean the tooth", text: "We remove the decay and shape the tooth for the filling." },
      { title: "Fill and shape", text: "Tooth-coloured material is placed in layers and set with a light." },
      { title: "Check your bite", text: "We polish the filling and make sure your bite feels natural." },
    ],
    aftercare: [
      "Your lip and cheek will be numb for 2-3 hours. Avoid hot drinks and chewing until it wears off.",
      "You can eat normally once the numbness is gone. White fillings are fully set when you leave.",
      "Mild sensitivity for a few days is normal. Call us if it lasts longer than two weeks.",
    ],
    faqs: [
      { q: "Will I feel the injection?", a: "We use numbing gel first and inject slowly, which makes a big difference. Most patients feel a small pinch at most." },
      { q: "How long does a filling last?", a: "A white filling usually lasts 7-10 years or more, depending on its size and how you care for your teeth." },
      { q: "Should I replace my old silver fillings?", a: "Only if they're cracked, leaking or decayed underneath. We'll tell you honestly whether they need replacing." },
    ],
  },
  {
    slug: "extractions",
    category: "dental",
    name: "Extractions",
    tagline: "When a tooth can't be saved, we take care of you.",
    summary: "Gentle removal of a painful, broken or problem tooth, with you fully numbed throughout.",
    image: img("photo-1606811842243-af7e16970c1f"),
    imageAlt: "Dentist calmly talking with a patient in the dental chair",
    price: { from: "R750", note: "Simple extraction. Surgical removal from R2,200" },
    facts: { time: "20-60 minutes", visits: "1 visit", comfort: "Fully numbed, sedation available" },
    simple: [
      "We always try to save a tooth first. But sometimes a tooth is too broken, too infected, or a wisdom tooth is causing trouble, and removing it is the kindest option.",
      "You'll be fully numb, so you feel pressure but not pain. We explain each step as we go and you can raise your hand to pause at any time. If you're very anxious, we can do it under sedation.",
    ],
    goodFor: [
      "Badly broken or decayed teeth",
      "Painful or infected wisdom teeth",
      "Loose teeth from gum disease",
      "Making space before braces or dentures",
    ],
    steps: [
      { title: "X-ray and plan", text: "We look at the roots first so there are no surprises." },
      { title: "Numbing", text: "We numb the area well and check it's working before we begin." },
      { title: "Gentle removal", text: "The tooth is eased out slowly. You'll feel pressure, not pain." },
      { title: "Healing", text: "We place gauze, and stitches if needed, and give you written aftercare." },
    ],
    aftercare: [
      "Bite on the gauze for 30-45 minutes. Some oozing for the first day is normal.",
      "Don't rinse, spit, smoke or drink through a straw for 24 hours. This protects the healing clot.",
      "Eat soft, cool foods on the other side for a few days. Take pain relief as advised.",
      "From the next day, rinse gently with warm salt water after meals.",
    ],
    faqs: [
      { q: "Will it hurt?", a: "Not during the extraction, because the area is fully numb. Afterwards it may ache for a few days, which normal pain relief manages well." },
      { q: "What is a dry socket?", a: "It's when the blood clot in the socket comes out too early, which can be painful. Not smoking and not rinsing for the first 24 hours greatly reduces the risk. If it happens, we can treat it quickly." },
      { q: "Do I need to replace the tooth?", a: "Not always, but a gap can let other teeth shift. We'll talk you through options such as a bridge or denture." },
    ],
  },
  {
    slug: "root-canal-therapy",
    category: "dental",
    name: "Root canal therapy",
    tagline: "Save your tooth, and stop the pain.",
    summary: "We clean out an infected nerve inside the tooth so you can keep it. It feels much like a filling.",
    image: img("photo-1777793389944-f7165259a05c"),
    imageAlt: "Dentist holding a tooth model showing the root canals",
    price: { from: "R3,800", note: "Front tooth. Back teeth from R6,500. Crown quoted separately" },
    facts: { time: "60-90 minutes", visits: "1-2 visits", comfort: "Fully numbed" },
    simple: [
      "Inside every tooth is a soft core called the pulp, with a nerve and blood vessels. When decay or a crack lets bacteria reach it, it becomes infected, and that's what causes a throbbing toothache.",
      "In a root canal treatment, we numb the tooth, remove the infected pulp, clean the tiny canals and seal them. The pain usually settles quickly, and you keep your own tooth. Its reputation is far worse than the reality: most people say it felt like a long filling.",
    ],
    goodFor: [
      "Severe or throbbing toothache",
      "Pain that keeps you up at night",
      "Lingering sensitivity to hot or cold",
      "A swelling or pimple on the gum",
    ],
    steps: [
      { title: "Numbing", text: "We make sure the tooth is completely numb before we start." },
      { title: "Clean the canals", text: "The infected pulp is removed and the canals gently cleaned." },
      { title: "Seal", text: "The canals are filled and sealed to keep bacteria out." },
      { title: "Protect", text: "Back teeth usually need a crown afterwards to stop them cracking." },
    ],
    aftercare: [
      "The tooth may be tender for a few days. Normal pain relief helps.",
      "Avoid chewing hard foods on that side until the final filling or crown is placed.",
      "Keep your follow-up appointment. A crown protects the tooth for the long term.",
    ],
    faqs: [
      { q: "Is a root canal painful?", a: "Modern root canal treatment is done fully numbed and feels much like a filling. It's the infection that hurts, and the treatment relieves it." },
      { q: "Isn't it better to just pull the tooth?", a: "Keeping your own tooth is usually best for chewing and for the teeth around it. Replacing a missing tooth later often costs more. We'll talk through both options honestly." },
      { q: "Why do I need a crown afterwards?", a: "A tooth that has had a root canal becomes more brittle. A crown holds it together so it doesn't crack." },
    ],
  },
  {
    slug: "dentures",
    category: "dental",
    name: "Dentures",
    tagline: "Eat, speak and smile with confidence again.",
    summary: "Comfortable, natural-looking removable teeth to replace some or all of your missing teeth.",
    image: img("photo-1777445826358-f95518f49b44"),
    imageAlt: "Hands holding a partial denture",
    price: { from: "R6,500", note: "Full acrylic denture per jaw. Partial dentures from R4,500" },
    facts: { time: "4-5 short visits", visits: "Over 3-6 weeks", comfort: "No pain, no needles" },
    simple: [
      "Dentures are removable teeth made to fit your mouth. A full denture replaces all the teeth in a jaw. A partial denture fills the gaps between your remaining teeth.",
      "We take moulds and measurements and try the teeth in before they're finished, so you can check the look, shape and colour. We adjust them until they feel right.",
    ],
    goodFor: [
      "Several missing teeth",
      "Difficulty chewing or speaking",
      "Replacing an old, loose denture",
      "A more affordable option than implants",
    ],
    steps: [
      { title: "Moulds", text: "We take impressions of your mouth. Quick and painless." },
      { title: "Bite and shade", text: "We record how your jaws meet and choose the tooth colour together." },
      { title: "Try-in", text: "You see and feel your new teeth in wax before they're finished." },
      { title: "Fit and adjust", text: "We fit the denture and fine-tune any sore spots over the next weeks." },
    ],
    aftercare: [
      "New dentures take a few weeks to get used to. Start with soft food cut into small pieces.",
      "Take them out at night and clean them with a soft brush and denture cleaner.",
      "Come back for adjustments if anything rubs. That's normal and included.",
    ],
    faqs: [
      { q: "Will people be able to tell?", a: "Modern dentures are made to look natural. We choose the shape and shade with you so they suit your face." },
      { q: "Will they feel loose?", a: "A well-made denture fits snugly. Lower full dentures can be harder to keep still, and we can talk about options that help." },
      { q: "How long do dentures last?", a: "Usually 5-8 years. Your gums change shape over time, so they may need relining to stay comfortable." },
    ],
  },
  {
    slug: "crowns-and-bridges",
    category: "dental",
    name: "Crowns & bridges",
    tagline: "Strong, natural-looking repairs that last.",
    summary: "A crown caps and protects a weak tooth. A bridge fills a gap using the teeth on either side.",
    image: img("photo-1660300110556-fa3ccf6f4eb1"),
    imageAlt: "Ceramic crowns on a dental model",
    price: { from: "R7,500", note: "Per crown. Three-unit bridge from R18,000" },
    facts: { time: "60-90 minutes", visits: "2 visits", comfort: "Fully numbed" },
    simple: [
      "A crown is a custom-made cap that fits over a tooth. It covers it completely, protecting a tooth that's cracked, heavily filled or has had a root canal.",
      "A bridge replaces a missing tooth. It's a false tooth held in place by crowns on the teeth on either side. Both are made in a dental lab and shaded to match your teeth.",
    ],
    goodFor: [
      "Cracked or broken teeth",
      "Teeth with very large fillings",
      "Protecting a tooth after a root canal",
      "Replacing one or two missing teeth",
    ],
    steps: [
      { title: "Prepare", text: "We numb the tooth and shape it so the crown can fit over it." },
      { title: "Impression", text: "We take a mould and choose the shade with you." },
      { title: "Temporary crown", text: "You leave with a temporary crown while the lab makes yours, about two weeks." },
      { title: "Fit", text: "We check the fit, colour and bite, then cement it in place." },
    ],
    aftercare: [
      "Be gentle with the temporary crown. Avoid sticky foods and floss by sliding the floss out sideways.",
      "Your new crown may feel slightly different for a few days.",
      "Brush and floss as normal. Clean under a bridge with a floss threader or small brush.",
    ],
    faqs: [
      { q: "How long does a crown last?", a: "With good care, 10-15 years or longer." },
      { q: "Will it look natural?", a: "Yes. Ceramic crowns are shaded to match your other teeth and reflect light the way natural enamel does." },
      { q: "Crown, bridge or implant: which is right for me?", a: "It depends on your teeth, bone, health and budget. We'll explain the pros and cons of each in plain terms and refer you for implants if that's the best fit." },
    ],
  },
  {
    slug: "veneers",
    category: "dental",
    name: "Veneers",
    tagline: "A natural, confident smile.",
    summary: "Thin, tooth-coloured layers placed on the front of your teeth to change their shape, colour or size.",
    image: img("photo-1654373535457-383a0a4d00f9"),
    imageAlt: "Close-up of a natural-looking smile",
    price: { from: "R2,500", note: "Composite, per tooth. Porcelain from R7,500 per tooth" },
    facts: { time: "1-2 hours", visits: "1-3 visits", comfort: "Little to no numbing" },
    simple: [
      "A veneer is a thin shell bonded onto the front of a tooth. It can close small gaps, cover chips or stains, and even out teeth that are uneven in size or shape.",
      "Composite veneers are sculpted directly onto your teeth in one visit. Porcelain veneers are made in a lab and are tougher and more stain-resistant. We'll help you choose, and we always aim for a smile that looks like yours, only better.",
    ],
    goodFor: [
      "Chipped or worn front teeth",
      "Stains that whitening can't shift",
      "Small gaps between teeth",
      "Teeth of uneven size or shape",
    ],
    steps: [
      { title: "Smile consult", text: "We talk about what you'd like to change and take photos." },
      { title: "Preview", text: "We can show you a mock-up of the new shape before anything is done." },
      { title: "Prepare", text: "Little or no tooth is removed, so numbing is often not needed." },
      { title: "Bond and polish", text: "The veneers are bonded, shaped and polished to a natural shine." },
    ],
    aftercare: [
      "Treat veneers like your own teeth: brush, floss and keep up your check-ups.",
      "Avoid biting nails, pens or opening packets with your teeth.",
      "If you grind at night, we may suggest a night guard to protect them.",
    ],
    faqs: [
      { q: "Do veneers damage my teeth?", a: "Composite veneers need little or no tooth removal. Porcelain veneers need a thin layer removed. We always choose the most conservative option that will achieve your goal." },
      { q: "How long do they last?", a: "Composite veneers usually last 5-7 years and can be repaired. Porcelain veneers often last 10-15 years." },
      { q: "Can I whiten my teeth first?", a: "Yes, and we recommend it. Veneers are matched to your teeth, so whiten first if you'd like a brighter shade overall." },
    ],
  },
  {
    slug: "sedation",
    category: "dental",
    name: "Sedation",
    tagline: "Relaxed, calm, and looked after.",
    summary: "If you're very anxious, sedation helps you feel calm and drowsy during treatment, given in our rooms by our doctor.",
    image: img("photo-1666214277730-e9c7e755e5a3"),
    imageAlt: "A relaxed patient chatting with her doctor",
    imagePosition: "30% 50%",
    sharedCare: true,
    price: { from: "R650", note: "Happy gas. IV sedation from R2,800 per session" },
    facts: { time: "Depends on treatment", visits: "Same visit as treatment", comfort: "Calm and drowsy" },
    simple: [
      "Sedation is medicine that helps you relax. You stay awake and can respond, but you feel calm and drowsy and often remember very little afterwards.",
      "We offer happy gas (nitrous oxide) through a small nose mask, which wears off within minutes. For deeper relaxation, we offer sedation through a small drip in your hand. Our medical doctor gives the sedation and monitors your breathing, heart rate and oxygen throughout, while the dentist does the treatment.",
    ],
    goodFor: [
      "Strong fear of the dentist",
      "A strong gag reflex",
      "Longer or more complex treatment",
      "Patients who struggle to sit still for long",
    ],
    steps: [
      { title: "Health check", text: "Our doctor reviews your medical history and medication beforehand." },
      { title: "Settle in", text: "We get you comfortable and connect a small monitor to your finger." },
      { title: "Relax", text: "The sedation is given and you drift into a calm, drowsy state." },
      { title: "Recover", text: "You rest with us until you're steady, then go home with your escort." },
    ],
    aftercare: [
      "With IV sedation you must have an adult take you home and stay with you for the rest of the day.",
      "Don't drive, operate machinery, sign documents or drink alcohol for 24 hours after IV sedation.",
      "After happy gas alone you can usually drive yourself home after a short rest.",
    ],
    faqs: [
      { q: "Will I be asleep?", a: "No. With sedation you're awake but deeply relaxed. If you'd prefer to be fully asleep, ask us about general anaesthesia." },
      { q: "Who gives the sedation?", a: "Our medical doctor gives and monitors the sedation in our rooms, so the dentist can focus fully on your treatment." },
      { q: "Do I need to fast?", a: "Not for happy gas. For IV sedation you'll be given clear fasting instructions, usually no food for six hours beforehand." },
      { q: "Is it safe?", a: "Sedation is very safe when given by a trained doctor with proper monitoring. We'll check your health history first and tell you if another option suits you better." },
    ],
  },
  {
    slug: "general-anaesthesia",
    category: "dental",
    name: "General anaesthesia",
    tagline: "Fully asleep, fully looked after.",
    summary: "For extensive treatment, young children or severe anxiety, you can be completely asleep, here in our rooms.",
    image: img("photo-1681939282741-9ace0a227977"),
    imageAlt: "Clinician preparing a relaxed patient in the treatment chair",
    sharedCare: true,
    price: { from: "R4,500", note: "Anaesthetic fee. Dental treatment quoted separately" },
    facts: { time: "Depends on treatment", visits: "1 visit + check-up", comfort: "Fully asleep" },
    simple: [
      "Under general anaesthesia you are completely asleep. You won't feel, hear or remember the treatment. It means a lot of dental work can be done safely in one visit.",
      "Our medical doctor puts you to sleep and stays with you the whole time, watching your breathing, heart and oxygen levels, while our dentist does the treatment. When it's done, you wake up gently in our rooms.",
    ],
    goodFor: [
      "Young children who need several treatments",
      "Severe dental anxiety",
      "Patients with special needs",
      "Long or complex treatment in one visit",
    ],
    steps: [
      { title: "Pre-anaesthetic check", text: "A consultation with our doctor to review your health and plan safely." },
      { title: "On the day", text: "Arrive fasted with your escort. We settle you in and place a small drip." },
      { title: "Treatment", text: "You sleep through the treatment while the doctor monitors you closely." },
      { title: "Wake up", text: "You recover with us until you're ready to go home." },
    ],
    aftercare: [
      "An adult must take you home and stay with you for 24 hours.",
      "Rest for the day. Don't drive, drink alcohol or make important decisions for 24 hours.",
      "Start with sips of water, then light, soft food.",
      "We'll call you the next day to check how you're doing.",
    ],
    faqs: [
      { q: "Is general anaesthesia safe in a practice?", a: "When given by a trained doctor with proper monitoring and emergency equipment, it is very safe for healthy patients. Our doctor assesses everyone beforehand, and if a hospital setting is safer for you, we'll refer you." },
      { q: "How long must I fast?", a: "Usually no food for six hours and clear fluids only up to two hours before. We'll give you exact written instructions." },
      { q: "Can children have it?", a: "Yes. We often recommend it for young children who need a lot of treatment, so they don't develop a fear of the dentist." },
      { q: "Will medical aid cover it?", a: "Some plans cover anaesthesia for dental treatment, especially for young children. We'll give you the codes so you can get pre-authorisation." },
    ],
  },
  {
    slug: "teeth-whitening",
    category: "dental",
    name: "Professional teeth whitening",
    tagline: "A brighter smile, done safely.",
    summary: "Safely lift years of stains with professional whitening, in the chair or with custom trays at home.",
    image: img("photo-1599566219227-2efe0c9b7f5f"),
    imageAlt: "A woman laughing with a bright, natural smile",
    price: { from: "R3,200", note: "Take-home kit. In-chair whitening from R4,800" },
    facts: { time: "60-90 minutes in-chair", visits: "1-2 visits", comfort: "Mild sensitivity possible" },
    simple: [
      "Over time, coffee, tea, red wine and smoking stain your teeth. Professional whitening uses a safe gel that gently lifts those stains from inside the enamel.",
      "You can whiten in the chair in about an hour, or at home with custom-made trays over two weeks. Both work well, and both are much safer than whitening products bought online.",
    ],
    goodFor: [
      "Yellow or stained teeth",
      "A special occasion like a wedding",
      "Before getting veneers or crowns",
      "Healthy teeth and gums",
    ],
    steps: [
      { title: "Check first", text: "We make sure your teeth and gums are healthy enough to whiten." },
      { title: "Choose your option", text: "In-chair for speed, or custom trays to whiten at home." },
      { title: "Whiten", text: "Your gums are protected and the gel is applied safely." },
      { title: "Keep it bright", text: "We give you tips and top-up gel to maintain your shade." },
    ],
    aftercare: [
      "Some sensitivity for a day or two is common. A sensitive toothpaste helps.",
      "Avoid coffee, tea, red wine and smoking for 48 hours after whitening.",
      "Results last 1-3 years, longer with occasional top-ups.",
    ],
    faqs: [
      { q: "Is whitening safe?", a: "Yes, when supervised by a dentist. We check your teeth first and use regulated strengths that protect your enamel." },
      { q: "Will it whiten my fillings or crowns?", a: "No. Whitening only works on natural teeth. We'll plan around any fillings or crowns at the front." },
      { q: "How white will my teeth get?", a: "It varies from person to person. Most people go several shades lighter. We aim for a bright but natural result." },
    ],
  },

  /* ============================ MEDICAL ============================ */
  {
    slug: "gp-consultations",
    category: "medical",
    name: "GP consultations",
    tagline: "A doctor who takes the time to listen.",
    summary: "Unhurried appointments for illness, injuries, check-ups and anything that's worrying you.",
    image: img("photo-1659989693409-5adc97274bed"),
    imageAlt: "Doctor smiling while explaining something to a patient",
    price: { from: "R550", note: "Standard consultation" },
    facts: { time: "15-30 minutes", visits: "Same-day slots", comfort: "Unhurried" },
    simple: [
      "See our GP for everyday illnesses and worries: flu, infections, rashes, aches, injuries, sick notes, scripts and referrals.",
      "We book appointments far enough apart that you're never rushed. Bring a list of questions. We'll answer every one.",
    ],
    goodFor: [
      "Colds, flu and infections",
      "Aches, pains and minor injuries",
      "Sick notes and repeat scripts",
      "Referrals to specialists",
    ],
    steps: [
      { title: "Book", text: "Call or WhatsApp. Same-day appointments are often available." },
      { title: "Talk", text: "Tell us what's going on. We listen before we examine." },
      { title: "Examine", text: "A careful, respectful examination, with a chaperone if you'd like one." },
      { title: "Plan", text: "A clear explanation, treatment and follow-up if needed." },
    ],
    aftercare: [
      "Follow your treatment plan and finish any course of antibiotics.",
      "WhatsApp us if you're not improving or have questions about your medication.",
    ],
    faqs: [
      { q: "Can I get a same-day appointment?", a: "Usually, yes. We keep slots open every day for people who are unwell." },
      { q: "Do you do sick notes?", a: "Yes, when you've been seen and examined by our doctor." },
      { q: "Can I bring a family member?", a: "Of course. You're welcome to bring someone for support." },
    ],
  },
  {
    slug: "chronic-care",
    category: "medical",
    name: "Chronic care",
    tagline: "Steady, ongoing care for long-term conditions.",
    summary: "Regular reviews, scripts and support for high blood pressure, diabetes, asthma, thyroid and more.",
    image: img("photo-1758691462123-8a17ae95d203"),
    imageAlt: "Doctor measuring a patient's blood pressure",
    price: { from: "R550", note: "Per review. Tests charged separately" },
    facts: { time: "20-30 minutes", visits: "Every 3-6 months", comfort: "Routine and simple" },
    simple: [
      "Living with a long-term condition is easier with a doctor who knows you. We track your numbers over time, adjust your medication, and help you with practical changes that fit your life.",
      "We also help with chronic medication applications for your medical aid, so your scripts are covered.",
    ],
    goodFor: [
      "High blood pressure",
      "Type 2 diabetes",
      "Asthma and COPD",
      "Thyroid conditions and high cholesterol",
    ],
    steps: [
      { title: "Review", text: "We check how you've been feeling and how your medication is working." },
      { title: "Measure", text: "Blood pressure, sugar, weight and any blood tests that are due." },
      { title: "Adjust", text: "We fine-tune your treatment and set simple, realistic goals." },
      { title: "Script", text: "Repeat scripts and chronic medication forms for your medical aid." },
    ],
    aftercare: [
      "Take your medication as prescribed, even when you feel well.",
      "Keep a simple record of your readings if we give you a home monitor.",
    ],
    faqs: [
      { q: "Can you help with my chronic medication application?", a: "Yes. We'll complete the forms and submit them to your medical aid with you." },
      { q: "How often do I need to come in?", a: "Usually every three to six months once you're stable, and more often while we're adjusting treatment." },
    ],
  },
  {
    slug: "womens-health",
    category: "medical",
    name: "Women's health",
    tagline: "Care from a doctor who understands.",
    summary: "Pap smears, contraception, family planning, pregnancy care and menopause support, from a female doctor.",
    image: img("photo-1632053652571-a6a45052bbbd"),
    imageAlt: "Doctor talking with a pregnant patient",
    price: { from: "R750", note: "Consultation with Pap smear. Lab fees may apply" },
    facts: { time: "20-30 minutes", visits: "1 visit", comfort: "Private and gentle" },
    simple: [
      "Some health questions are easier to ask a woman. Our female GP offers private, respectful care for every stage of life.",
      "From your first Pap smear to pregnancy and menopause, we explain everything clearly and go at your pace.",
    ],
    goodFor: [
      "Pap smears and breast checks",
      "Contraception and family planning",
      "Early pregnancy care",
      "Period problems and menopause",
    ],
    steps: [
      { title: "Talk privately", text: "A relaxed conversation about your health and any concerns." },
      { title: "Examine gently", text: "Only with your consent, explained step by step." },
      { title: "Tests", text: "Any samples are sent to the lab, and we contact you with results." },
      { title: "Plan", text: "Clear next steps and options that suit you." },
    ],
    aftercare: [
      "We'll contact you with your results, usually within a week.",
      "WhatsApp us any time with follow-up questions.",
    ],
    faqs: [
      { q: "How often should I have a Pap smear?", a: "Generally every three years from age 25, or as your doctor advises." },
      { q: "Can I bring my partner or a friend?", a: "Yes, you're welcome to bring someone with you." },
    ],
  },
  {
    slug: "family-and-child-health",
    category: "medical",
    name: "Family & child health",
    tagline: "One practice for the whole family.",
    summary: "Gentle care for babies, children and teens, from coughs and fevers to growth checks and school forms.",
    image: img("photo-1676313027775-a5a3dca6f98b"),
    imageAlt: "Doctor gently listening to a young child's chest",
    price: { from: "R550", note: "Child consultation" },
    facts: { time: "15-30 minutes", visits: "Same-day slots", comfort: "Child-friendly" },
    simple: [
      "Children aren't small adults, and a sick child is stressful for everyone. We take our time, explain things to your child in a way they understand, and keep visits as calm as possible.",
      "And because our dentist is next door, you can often book the whole family's check-ups on the same day.",
    ],
    goodFor: [
      "Fevers, coughs, ear and chest infections",
      "Rashes, allergies and tummy bugs",
      "Growth and development checks",
      "School, sport and camp forms",
    ],
    steps: [
      { title: "Settle in", text: "We say hello and let your child get comfortable first." },
      { title: "Gentle check", text: "We examine your child on your lap if they prefer." },
      { title: "Explain", text: "You get a clear plan, and your child gets a simple explanation." },
      { title: "Follow up", text: "WhatsApp us if things don't improve as expected." },
    ],
    aftercare: [
      "Watch for warning signs we'll go through with you, and call if you're worried.",
      "Keep your child home until the fever has been gone for 24 hours.",
    ],
    faqs: [
      { q: "From what age do you see children?", a: "From newborns. We see babies, children and teenagers." },
      { q: "Can my child see the doctor and dentist on the same day?", a: "Yes, just tell us when you book and we'll line up the appointments." },
    ],
  },
  {
    slug: "health-checks",
    category: "medical",
    name: "Health checks & screening",
    tagline: "Know your numbers, and stay ahead.",
    summary: "Quick checks of blood pressure, sugar, cholesterol and weight, with a doctor to explain what they mean.",
    image: img("photo-1631815587646-b85a1bb027e1"),
    imageAlt: "Blood pressure being measured",
    price: { from: "R450", note: "Basic screening. Full blood panel quoted separately" },
    facts: { time: "20 minutes", visits: "1 visit", comfort: "Quick finger-prick" },
    simple: [
      "Many health problems, like high blood pressure or diabetes, have no symptoms at first. A simple screening picks them up early, when they're easiest to manage.",
      "We check your blood pressure, blood sugar, cholesterol and weight, and explain what your numbers mean for you.",
    ],
    goodFor: [
      "Adults over 30, once a year",
      "A family history of heart disease or diabetes",
      "Work or insurance medicals",
      "Peace of mind",
    ],
    steps: [
      { title: "Measure", text: "Blood pressure, weight and waist measurement." },
      { title: "Finger-prick", text: "A quick test for sugar and cholesterol, results in minutes." },
      { title: "Explain", text: "We go through your results in plain language." },
      { title: "Next steps", text: "Simple advice, and further tests only if needed." },
    ],
    aftercare: [
      "Keep a copy of your results to compare next year.",
      "If anything needs follow-up, we'll book it with you before you leave.",
    ],
    faqs: [
      { q: "Do I need to fast?", a: "For the most accurate cholesterol and sugar results, avoid food for 8 hours beforehand. Water is fine." },
      { q: "Does medical aid cover screenings?", a: "Many plans cover a yearly screening from preventive benefits. We'll give you the codes." },
    ],
  },
];

export const dentalTreatments = treatments.filter((t) => t.category === "dental");
export const medicalTreatments = treatments.filter((t) => t.category === "medical");

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function treatmentHref(t: Pick<Treatment, "slug">) {
  return `/treatments/${t.slug}`;
}
