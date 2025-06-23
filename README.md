# Bol Verkoper Suite

Een complete verkoper dashboard voor Bol.com met authenticatie via Supabase.

## Features

- 🔐 **Authenticatie**: Email/password en Google OAuth via Supabase
- 📊 **Dashboard**: Overzicht van verkoop, bestellingen en performance
- 📱 **Responsive**: Werkt op desktop, tablet en mobiel
- 🌙 **Dark Mode**: Ondersteuning voor donkere modus
- ⚡ **Modern**: Gebouwd met Next.js 15, React 19 en TypeScript

## Quick Start

### 1. Clone het project

```bash
git clone <repository-url>
cd bol-verkoper-suite
```

### 2. Installeer dependencies

```bash
npm install
```

### 3. Supabase Setup

Volg de [Supabase Setup Gids](./SUPABASE_SETUP.md) om je Supabase project te configureren.

### 4. Environment Variables

Kopieer `env.example` naar `.env.local` en vul je Supabase gegevens in:

```bash
cp env.example .env.local
```

### 5. Start de development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Authenticatie

De applicatie ondersteunt twee authenticatie methoden:

### Email/Password
- Registratie met e-mail bevestiging
- Wachtwoord reset functionaliteit
- Veilige wachtwoord validatie

### Google OAuth
- Eén-klik inloggen met Google
- Automatische account aanmaak
- Veilige OAuth 2.0 flow

## Project Structuur

```
src/
├── app/
│   ├── (protected)/          # Beschermde routes (dashboard)
│   ├── auth/                 # Authenticatie pagina's
│   │   ├── login/
│   │   ├── register/
│   │   └── callback/
│   └── layout.tsx
├── components/
│   ├── guards/              # Auth guards
│   ├── providers/           # Context providers
│   ├── layout/              # Layout componenten
│   └── ui/                  # UI componenten
├── lib/
│   └── supabase/           # Supabase configuratie
└── middleware.ts           # Auth middleware
```

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Charts**: Recharts
- **Icons**: Lucide React

## Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Verbind je repository met Vercel
3. Voeg environment variables toe in Vercel dashboard
4. Deploy!

### Andere Platforms

Zorg ervoor dat je de volgende environment variables instelt:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## License

Dit project is gelicenseerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## Support

Voor vragen over Supabase setup, bekijk de [Supabase Setup Gids](./SUPABASE_SETUP.md).

Voor algemene vragen, open een issue in de repository.
