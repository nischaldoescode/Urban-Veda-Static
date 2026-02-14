
## Phase 2: Project Structure

```
urban-veda/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # root layout
│   │   ├── page.tsx                   # home page (ssr)
│   │   ├── products/
│   │   │   ├── page.tsx               # products listing (ssr)
│   │   │   └── [id]/
│   │   │       └── page.tsx           # product detail (ssr)
│   │   ├── philosophy/
│   │   │   └── page.tsx               # philosophy (ssr)
│   │   ├── about/
│   │   │   └── page.tsx               # about (ssr)
│   │   ├── contact/
│   │   │   └── page.tsx               # new contact page
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── route.ts               # dashboard route
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx               # admin login page
│   │   │
│   │   ├── media/
│   │   │   └── page.tsx               # media page
│   │   │
│   │   ├── navigation/
│   │   │   └── page.tsx               # navigation page
│   │   │
│   │   ├── pages/
│   │   │   └── page.tsx               # pages page
│   │   │
│   │   ├── products/
│   │   │   ├── new/
│   │   │   │   └── page.tsx           # new product page
│   │   │   └── page.tsx               # products page
│   │   │
│   │   └── settings/
│   │   |    └── page.tsx               # settings page
│   │   └── api/
│   │       ├── auth/
│   │       │   └── login/
│   │       │       └── route.ts       # login api
│   │       ├── config/
│   │       │   ├── route.ts           # get/update config
│   │       │   └── [field]/
│   │       │       └── route.ts       # update specific field
│   │       ├── juices/
│   │       │   ├── route.ts           # get all/create juice
│   │       │   └── [id]/
│   │       │       └── route.ts       # get/update/delete juice
│   │       └── upload/
│   │           └── route.ts           # cloudinary upload
│   ├── components/
│   │   ├── ui/                        # shadcn components
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ChallengesSection.tsx
│   │   │   └── ProductPreview.tsx
│   │   └── shared/
│   │       ├── ScrollReveal.tsx
│   │       └── LoadingSpinner.tsx
│   ├── lib/
│   │   ├── mongodb.ts                 # database connection
│   │   ├── models/
│   │   │   ├── Config.ts              # config schema
│   │   │   ├── Juice.ts               # juice schema
│   │   │   └── Admin.ts               # admin schema
│   │   ├── cloudinary.ts              # cloudinary config
│   │   ├── auth.ts                    # auth helpers
│   │   └── utils.ts                   # utility functions
│   ├── types/
│   │   └── index.ts                   # typescript types
│   └── styles/
│       └── globals.css                # global styles
├── public/
│   ├── images/                       # static webp images
│   └── favicon.ico
├── .env.local                         # environment variables
├── next.config.js
└── package.json
```