# Media Tools Inspiratie

Een overzicht van verschillende media tools en technologieën voor het maken van interactieve projecten. Dit project is gebouwd met Vue 3, TypeScript en Vite.

## Development

### Installatie

```bash
# Installeer dependencies
npm install
# of
yarn install
```

### Development server

```bash
# Start development server
npm run dev
# of
yarn dev
```

De development server draait standaard op `http://localhost:5173`

## Deployment

### Build

```bash
# Build voor productie
npm run build
# of
yarn build
```

### Deploy

```bash
# Deploy naar productie
npm run deploy
# of
yarn deploy
```

Het project wordt automatisch gedeployed naar `https://arts.sd-lab.nl/minor-ad/4/current/`

## Technologieën toevoegen

Nieuwe technologieën kunnen worden toegevoegd aan `src/data/technologieen.json`. Elke technologie heeft de volgende structuur:

```json
{
  "naam": "Naam van de technologie",
  "omschrijving": "Korte beschrijving van wat de technologie doet",
  "note": "Optionele extra informatie of opmerkingen",
  "type": ["audio", "visueel", "data"], // Een of meerdere types
  "links": {
    "website": "URL naar de website",
    "documentatie": "URL naar de documentatie",
    "tutorials": [
      {
        "title": "Titel van de tutorial",
        "url": "URL naar de tutorial"
      }
    ]
  },
  "examples": [
    {
      "title": "Titel van het voorbeeld",
      "note": "Korte beschrijving van het voorbeeld",
      "image": "pad/naar/afbeelding.png", // Relatief pad vanaf public/
      "url": "URL naar het voorbeeld"
    }
  ]
}
```

### Afbeeldingen toevoegen

1. Maak een nieuwe map aan in `public/projects/[technologie-naam]/`
2. Voeg de afbeeldingen toe aan deze map
3. Verwijs naar de afbeeldingen in de `examples` array met het relatieve pad vanaf `public/`

### Best practices

- Gebruik duidelijke, beschrijvende namen voor technologieën
- Voeg altijd een website en documentatie link toe
- Probeer minimaal 1-2 tutorials toe te voegen
- Voeg 2-3 relevante voorbeelden toe met afbeeldingen
- Kies de juiste type(s) voor de technologie
- Zorg dat afbeeldingen een redelijke grootte hebben (max 1MB)
- Gebruik PNG of JPG formaat voor afbeeldingen
