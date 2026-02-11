// import { Disease, Product, Testimonial } from './types';
// Cloud name
// djswqd6sd
// API key
// 416911498741665
// API secret
// bVo8zHkixfK7QMkEY4lh2Pgef3w

// CLOUDINARY_URL=cloudinary://416911498741665:bVo8zHkixfK7QMkEY4lh2Pgef3w@djswqd6sd

// # create a .env.local file and copy these variables

// # mongodb connection string
// MONGODB_URI=mongodb+srv://Urban_Veda_user:lFxsSfGAsP4b9Q4l@urban-veda.1mvvezy.mongodb.net/?appName=Urban-Veda

// # cloudinary configuration
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djswqd6sd
// CLOUDINARY_API_KEY=416911498741665
// CLOUDINARY_API_SECRET=bVo8zHkixfK7QMkEY4lh2Pgef3w
// NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

// # admin authentication
// # generate hash: node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 12));"
// ADMIN_PASSWORD_HASH=$2b$12$9P3rU69GB5C7xZjUIplqSufMbvsuxjce8UBr9TgK9S5BHrduhgDaG
// # Password UrbanVeda@123.c0m
// JWT_SECRET=UrbanVedaSecretKey@@#??Sobha.567
// NEXT_PUBLIC_SITE_URL=http://localhost:3000
// NODE_ENV=development

// i get this error

// Error: Cannot apply unknown utility class `border-border`. Are you using CSS modules or similar and missing `@reference`? https://tailwindcss.com/docs/functions-and-directives#reference-directive
//     [at onInvalidCandidate (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:21:1314)]
//     [at Te (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:16:36652)]
//     [at D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:21:355]
//     [at Rr (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:3:1718)]
//     [at _ (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:3:1377)]
//     [at $e (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:21:172)]
//     [at un (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:38:294)]
//     [at process.processTicksAndRejections (node:internal/process/task_queues:105:5)]
//     [at async cn (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\tailwindcss\dist\lib.js:38:631)]
//     [at async Xr (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\@tailwindcss\node\dist\index.js:10:3417)]
// ○ Compiling / ...
// ⨯ ./src/app/globals.css
// Error evaluating Node.js code
// CssSyntaxError: tailwindcss: D:\Urban Veda\Urban-Veda-Static\urban-veda\src\app\globals.css:1:1: Cannot apply unknown utility class `border-border`. Are you using CSS modules or similar and missing `@reference`? https://tailwindcss.com/docs/functions-and-directives#reference-directive
//     [at Input.error (turbopack:///[project]/node_modules/postcss/lib/input.js:135:16)]
//     [at Root.error (turbopack:///[project]/node_modules/postcss/lib/node.js:146:32)]
//     [at Object.Once (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\@tailwindcss\postcss\dist\index.js:10:6911)]
//     [at process.processTicksAndRejections (node:internal/process/task_queues:105:5)]
//     [at async LazyResult.runAsync (turbopack:///[project]/node_modules/postcss/lib/lazy-result.js:293:11)]
//     [at async transform (turbopack:///[turbopack-node]/transforms/postcss.ts:70:34)]
//     [at async run (turbopack:///[turbopack-node]/ipc/evaluate.ts:92:23)]

// Import trace:
//   Client Component Browser:
//     ./src/app/globals.css [Client Component Browser]
//     ./src/app/layout.tsx [Server Component]

// ⚠ ./tailwind.config.ts:92:13
// Module not found: Can't resolve 'tailwindcss-animate'
//   90 |     },
//   91 |   },
// > 92 |   plugins: [require("tailwindcss-animate")],
//      |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//   93 | };
//   94 |
//   95 | export default config;

// https://nextjs.org/docs/messages/module-not-found

// ⨯ Error: Cannot find module 'critters'
// Require stack:
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\post-process.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\render.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\route-modules\pages\module.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\route-modules\pages\builtin\_error.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\load-default-error-components.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\dev\next-dev-server.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\next.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\lib\start-server.js
//     at ignore-listed frames {
//   code: 'MODULE_NOT_FOUND',
//   requireStack: [Array]
// }
// Error [ModuleBuildError]: ./src/app/globals.css
// Error evaluating Node.js code
// CssSyntaxError: tailwindcss: D:\Urban Veda\Urban-Veda-Static\urban-veda\src\app\globals.css:1:1: Cannot apply unknown utility class `border-border`. Are you using CSS modules or similar and missing `@reference`? https://tailwindcss.com/docs/functions-and-directives#reference-directive
//     [at Input.error (turbopack:///[project]/node_modules/postcss/lib/input.js:135:16)]
//     [at Root.error (turbopack:///[project]/node_modules/postcss/lib/node.js:146:32)]
//     [at Object.Once (D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\@tailwindcss\postcss\dist\index.js:10:6911)]
//     [at process.processTicksAndRejections (node:internal/process/task_queues:105:5)]
//     [at async LazyResult.runAsync (turbopack:///[project]/node_modules/postcss/lib/lazy-result.js:293:11)]
//     [at async transform (turbopack:///[turbopack-node]/transforms/postcss.ts:70:34)]
//     [at async run (turbopack:///[turbopack-node]/ipc/evaluate.ts:92:23)]

// Import trace:
//   Client Component Browser:
//     ./src/app/globals.css [Client Component Browser]
//     ./src/app/layout.tsx [Server Component]

//     at ignore-listed frames
// ⚠ ./tailwind.config.ts:92:13
// Module not found: Can't resolve 'tailwindcss-animate'
//   90 |     },
//   91 |   },
// > 92 |   plugins: [require("tailwindcss-animate")],
//      |             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//   93 | };
//   94 |
//   95 | export default config;

// https://nextjs.org/docs/messages/module-not-found

// ⨯ Error: Cannot find module 'critters'
// Require stack:
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\post-process.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\render.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\route-modules\pages\module.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\route-modules\pages\builtin\_error.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\load-default-error-components.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\dev\next-dev-server.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\next.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\lib\start-server.js
//     at ignore-listed frames {
//   code: 'MODULE_NOT_FOUND',
//   requireStack: [Array]
// }
// Error: Cannot find module 'critters'
// Require stack:
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\post-process.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\render.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\route-modules\pages\module.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\route-modules\pages\builtin\_error.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\load-default-error-components.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\dev\next-dev-server.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\next.js
// - D:\Urban Veda\Urban-Veda-Static\urban-veda\node_modules\next\dist\server\lib\start-server.js
//     at ignore-listed frames {
//   code: 'MODULE_NOT_FOUND',
//   requireStack: [Array]
// }
//  GET / 500 in 10.1s (compile: 9.9s, render: 158ms)
//  GET / 500 in 10.1s (compile: 9.9s, render: 159ms)

export const DISEASES: Disease[] = [
  {
    id: "liver-health",
    title: "Liver Health",
    shortDesc: "The body's primary detoxifier under modern pressure.",
    whyItMatters:
      "The liver performs over 500 vital functions, including detoxifying chemicals and metabolizing drugs. It is the engine of your metabolism.",
    modernStressors:
      "Processed foods, environmental toxins, and high stress levels lead to fatty liver and sluggish bile production.",
    symptoms: [
      "Chronic fatigue",
      "Digestive issues",
      "Skin irritation",
      "Poor appetite",
    ],
    ayurvedicView:
      "Ayurveda views the liver (Yakrit) as the seat of Pitta (fire). When heat accumulates, the liver becomes overloaded.",
    keyHerbs: [
      { name: "Amla", description: "Powerful antioxidant and liver tonic." },
      { name: "Aloe Vera", description: "Cools the liver and aids bile flow." },
      {
        name: "Giloy",
        description: "Helps in purifying blood and supporting liver function.",
      },
    ],
    habits: [
      "Drink warm water on waking",
      "Avoid heavy late-night meals",
      "Moderate exercise",
    ],
    relatedProductId: "liver-detox",
  },
  {
    id: "diabetes-support",
    title: "Diabetes Support",
    shortDesc: "Metabolic balance through natural regulation.",
    whyItMatters:
      "Blood sugar regulation is critical for long-term organ health and energy stability.",
    modernStressors:
      'Sedentary lifestyle and hidden sugars in "healthy" processed foods disrupt insulin sensitivity.',
    symptoms: [
      "Frequent thirst",
      "Slow healing",
      "Energy crashes",
      "Blurry vision",
    ],
    ayurvedicView:
      "Referred to as Madhumeha, it is often seen as a Kapha imbalance affecting the Medas (fat tissue).",
    keyHerbs: [
      { name: "Jamun", description: "Helps convert starch into energy." },
      { name: "Karela", description: "Contains insulin-like compounds." },
    ],
    habits: [
      "Consistent meal timings",
      "Bitter foods in diet",
      "Morning walks",
    ],
    relatedProductId: "sugar-balance",
  },
  {
    id: "digestion-care",
    title: "Digestion & Constipation",
    shortDesc: "Healing the root of all health.",
    whyItMatters:
      'In Ayurveda, "Agni" (digestive fire) is the source of life. Poor digestion leads to toxin buildup (Ama).',
    modernStressors:
      "Eating on the go, irregular sleep, and over-processed grains.",
    symptoms: [
      "Bloating",
      "Irregular bowel movements",
      "Heavy feeling after meals",
    ],
    ayurvedicView:
      "Digestion is the foundation of all seven tissues (Dhatus). If Agni is weak, the whole body suffers.",
    keyHerbs: [
      {
        name: "Triphala",
        description: "A classic three-fruit formula for colon health.",
      },
      { name: "Ginger", description: "Kindles the digestive fire." },
    ],
    habits: ["Chew slowly", "Eat in a calm environment", "Dinner before 8 PM"],
    relatedProductId: "digestive-elixir",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "liver-detox",
    name: "Liver Revive",
    purpose: "Liver detox & metabolic support",
    shortDesc: "A cooling blend of Amla, Aloe Vera, and Giloy.",
    image: "https://picsum.photos/seed/liver/600/800",
    longDesc:
      "Crafted at home with freshly extracted juices, Liver Revive targets the root cause of metabolic sluggishness.",
    ingredients: [
      { name: "Fresh Amla", why: "Vitamin C powerhouse for liver cells." },
      { name: "Organic Aloe Vera", why: "Supports bile production." },
    ],
    howToConsume:
      "30ml diluted in 100ml water, twice daily on an empty stomach.",
    whoShouldAvoid:
      "Pregnant women or those with chronic kidney disease should consult a doctor.",
    relatedDiseaseId: "liver-health",
  },
  {
    id: "sugar-balance",
    name: "Glyco-Guard",
    purpose: "Blood sugar & energy stability",
    shortDesc: "Traditional Jamun and Karela extracts.",
    image: "https://picsum.photos/seed/sugar/600/800",
    longDesc:
      "A potent, bitter-sweet juice designed to support your body's natural insulin response.",
    ingredients: [
      { name: "Wild Jamun", why: "Glycemic control." },
      { name: "Fresh Karela", why: "Natural insulin support." },
    ],
    howToConsume: "20ml before breakfast and dinner.",
    whoShouldAvoid:
      "Not a substitute for prescribed insulin. Monitor levels closely.",
    relatedDiseaseId: "diabetes-support",
  },
  {
    id: "digestive-elixir",
    name: "Agni-Boost",
    purpose: "Daily digestion & detox",
    shortDesc: "Triphala and ginger infused herbal juice.",
    image: "https://picsum.photos/seed/digest/600/800",
    longDesc:
      "Warm your digestive fire and clear morning sluggishness with this time-tested blend.",
    ingredients: [
      { name: "Triphala", why: "Gentle detoxification." },
      { name: "Sun-dried Ginger", why: "Stoking the digestive fire." },
    ],
    howToConsume: "30ml in lukewarm water before bed.",
    whoShouldAvoid: "Avoid during active diarrhea or severe dehydration.",
    relatedDiseaseId: "digestion-care",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Sharma",
    age: 45,
    condition: "Digestive issues",
    text: "I didn’t expect instant results, but after 3 weeks of Agni-Boost, my digestion improved noticeably. I feel lighter every morning.",
  },
  {
    id: "2",
    name: "Anjali Nair",
    age: 38,
    condition: "Fatigue & Skin",
    text: "The Liver Revive juice has a very natural taste. My skin irritation cleared up after a month of consistent use. Highly recommended.",
  },
];
