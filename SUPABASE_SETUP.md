# Supabase Authenticatie Setup

Deze gids helpt je bij het opzetten van Supabase authenticatie voor de Bol Verkoper Suite.

## 1. Supabase Project Aanmaken

1. Ga naar [supabase.com](https://supabase.com) en maak een account aan
2. Maak een nieuw project aan
3. Kies een project naam en database wachtwoord
4. Wacht tot het project is aangemaakt

## 2. Project Configuratie

1. Ga naar je Supabase dashboard
2. Ga naar **Settings** > **API**
3. Kopieer de volgende waarden:
   - **Project URL** (bijv. `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (begint met `eyJ...`)

## 3. Environment Variables

1. Kopieer het `env.example` bestand naar `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Vul je Supabase gegevens in:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://jouw-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key
   ```

## 4. Google OAuth Instellen

### Google Cloud Console
1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak een nieuw project aan of selecteer een bestaand project
3. Ga naar **APIs & Services** > **Credentials**
4. Klik op **Create Credentials** > **OAuth 2.0 Client IDs**
5. Kies **Web application**
6. Voeg de volgende redirect URIs toe:
   - `https://jouw-project.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (voor development)
7. Kopieer de **Client ID** en **Client Secret**

### Supabase Dashboard
1. Ga naar je Supabase dashboard
2. Ga naar **Authentication** > **Providers**
3. Zoek **Google** en klik op **Enable**
4. Vul in:
   - **Client ID**: Je Google Client ID
   - **Client Secret**: Je Google Client Secret
5. Klik op **Save**

## 5. Database Schema (Optioneel)

Als je extra gebruikersgegevens wilt opslaan, kun je een `profiles` tabel aanmaken:

```sql
-- Maak een profiles tabel
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maak een RLS policy
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger om automatisch een profile aan te maken bij registratie
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 6. Applicatie Starten

1. Installeer dependencies:
   ```bash
   npm install
   ```

2. Start de development server:
   ```bash
   npm run dev
   ```

3. Ga naar `http://localhost:3000/auth/login`

## 7. Testen

1. **Email/Password Registratie**:
   - Ga naar `/auth/register`
   - Vul een e-mail en wachtwoord in
   - Controleer je e-mail voor bevestiging

2. **Google OAuth**:
   - Klik op "Inloggen met Google"
   - Volg de Google OAuth flow
   - Je wordt automatisch doorgestuurd naar de dashboard

3. **Login**:
   - Ga naar `/auth/login`
   - Log in met je gegevens
   - Je wordt doorgestuurd naar de dashboard

## 8. Troubleshooting

### "Invalid API key" fout
- Controleer of je `NEXT_PUBLIC_SUPABASE_ANON_KEY` correct is
- Zorg dat je de **anon public** key gebruikt, niet de service role key

### Google OAuth werkt niet
- Controleer of de redirect URIs correct zijn ingesteld
- Zorg dat Google OAuth is ingeschakeld in Supabase
- Controleer of de Client ID en Secret correct zijn

### Middleware errors
- Zorg dat je de juiste Supabase URL gebruikt
- Controleer of alle environment variables zijn ingesteld

## 9. Productie Deployment

Voor productie deployment:

1. Update de Google OAuth redirect URIs met je productie domain
2. Zorg dat alle environment variables zijn ingesteld in je hosting platform
3. Test de authenticatie flow in productie

## Support

Voor vragen over Supabase, bekijk de [officiële documentatie](https://supabase.com/docs). 