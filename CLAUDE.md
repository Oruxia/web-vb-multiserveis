# CLAUDE.md — Web VB Multiserveis (cliente Aleix)

## Estado del proyecto
**i18n ES/VA implementado.** Estructura completa y operativa. Pendiente: deploy y actualizar URLs con dominio real del cliente.

## Archivos del proyecto
- `index.html` — home completa con hero, servicios, portfolio, about teaser, CTA
- `servicios.html` — página de servicios con 3 bloques (construcción, jardinería, limpieza)
- `trabajos.html` — portfolio con filtro por categoría y lightbox
- `nosotros.html` — quiénes somos, valores, stats, ubicación
- `contacto.html` — formas de contacto (WhatsApp, teléfono, email, mapa)
- `css/styles.css` — estilos globales con paleta de marca
- `js/main.js` — navbar, scroll, animaciones, portfolio, lightbox, typewriter (expone `window.restartTypewriter`)
- `js/translations.js` — diccionario i18n con todas las cadenas ES y VA
- `js/i18n.js` — lógica de switching de idioma, localStorage, atributo `lang`
- `sitemap.xml` — sitemap con las 5 páginas (actualizar `<loc>` con dominio real al desplegar)
- `robots.txt` — permite indexación, apunta a sitemap.xml

## Cliente
- **Empresa**: VB MULTISERVEIS
- **Sector**: Construcción y reformas, jardinería y forestal, limpieza profesional
- **Ubicación**: Culla, Alt Maestrat (Castellón)
- **Contacto**: 619 627 650 / vbmultiserveis@gmail.com
- **Instagram**: @vb_multiserveis
- **Idiomas web**: Español (defecto) + Valenciano — selector `ES | VA` en el navbar
- ⚠️ No mencionar el nombre "Aleix" en ningún texto visible de la web

## Paleta de marca (variables CSS en styles.css)
- `--forest: #3a4a45` — verde oscuro principal (círculo del logo)
- `--forest-deep: #1e2d28` — versión oscura para overlays
- `--forest-dark: #111a17` — footer y fondos muy oscuros
- `--cream: #f5f2ed` — fondo del logo original (JPG)
- `--amber: #c8903a` — acento cálido, CTAs, typewriter
- `--text: #1a2421` — texto principal
- `--muted: #6b7c78` — texto secundario

## Logo
- Archivo original: `Logo VS MULTISERVEIS.jpg` (fondo crema, NO usar en navbar)
- **En el navbar**: SVG inline con fondo transparente (replicado en los 5 HTML)
  - Círculo `#3a4a45` con iconos blancos: casa, hoja, escoba
  - Texto "VB MULTISERVEIS" + subtítulo "CONSTRUCCIÓ · JARDINERIA · NETEJA"
  - Font: Montserrat (hereda de la página)
- **Tamaño navbar desktop**: definido por el cliente — NO modificar sin consultar
- El JPG del logo sigue en pie para el footer (fondo oscuro, se ve bien)

## Estructura del header (importante)
- Navbar **transparente** sobre el hero en home, **blanco compacto** al hacer scroll
- En páginas interiores: siempre blanco compacto (`nav-solid` class via JS)
- Altura inicial: `--nav-h-hero: 195px` / Altura compacta: `--nav-h: 72px`
- Transición suave de logo grande → logo 56px al hacer scroll
- Links blancos sobre hero, oscuros sobre navbar blanco
- Botón "Contactar": pill outline (blanco sobre hero, forest sobre blanco)
- Móvil: siempre compacto (72px), siempre blanco

## Funcionalidades implementadas
- **Typewriter animation** en hero (h1): "Especialistas en [palabra rotatoria]"
  - Palabras: Construcción, Reformas, Jardinería, Limpieza, Mantenimiento
  - JS puro en `main.js` sección 8, sin librerías
- **Filtro portfolio** por categoría (Todos / Construcción / Jardinería / Limpieza)
- **Lightbox** para galería de trabajos
- **Animaciones reveal** y fade-in con IntersectionObserver
- **Hero zoom sutil** al cargar (CSS transform)
- **Jump nav** en servicios.html con sección activa destacada
- **WhatsApp float** button en todas las páginas
- **i18n bilingüe** ES/VA con selector en navbar, persistencia en localStorage y `<html lang>` dinámico
  - Textos en `js/translations.js` (claves con notación de punto, p.ej. `nav.servicios`)
  - Elementos con `data-i18n="clave"` (textContent) o `data-i18n-html="clave"` (innerHTML con `<br>`)
  - Typewriter del hero se reinicia al cambiar idioma vía `window.restartTypewriter(words)`

## Imágenes
- `Imagenes construccion/` — fotos de obras y reformas
  - `Construccion VB.jpg` — hero de servicios.html
  - `Construccion y reformas VB.jpg` — banner sección construcción en servicios.html
  - `Reforma casa VB.jpg` — hero de trabajos.html
- `Imagenes jardineria/` — fotos de trabajos forestales
  - `Jardineria y Forestal VB.jpg` — banner sección jardinería en servicios.html
- `Imagenes limpieza/` — fotos de limpieza
  - `Limpieza hogasres y casas rurales VB.jpg` — banner sección limpieza en servicios.html
  - `Limpieza hotel VB.jpg` — trabajo en portfolio
- Las imágenes IMG_XXXX son las originales del cliente, siguen usándose en portfolio

## Decisiones de diseño tomadas
- Texto en nosotros.html en **primera persona** (no mencionar Aleix, no mencionar "no subcontratamos")
- Los ":" genéricos en textos se sustituyen por "," para evitar tono corporativo/IA
- Números de sección (01, 02, 03): `sp-num` en ámbar 38%, `service-category-tag` en blanco 28%
- Botón Contactar: pill outline (no relleno sólido genérico)
- Logo en footer: sigue con el JPG original (funciona sobre fondo oscuro)

## SEO (aplicado)
- OG tags, Twitter Card, robots, canonical y `<meta name="author">` en las 5 páginas
- Schema.org `HomeAndConstructionBusiness` en index.html
- `BreadcrumbList` en las 4 páginas interiores
- `<script src="js/main.js" defer>` + `translations.js` + `i18n.js` en todas las páginas
- `<link rel="alternate" hreflang="es/ca">` en las 5 páginas
- `<link rel="preload">` del hero en index.html
- ⚠️ Campos `<!-- REVISAR -->` pendientes en Schema.org de index.html: `"url"` (dominio real), `"openingHours"`, `"priceRange"`
- ⚠️ Al desplegar: actualizar URLs relativas en sitemap.xml, og:url y Schema "url" con el dominio real

## Notas importantes
- ⚠️ No modificar tamaño del logo SVG en navbar sin confirmar con el cliente
- ⚠️ No modificar `referencia/pagina-web-referencia.html` (solo lectura)
- Confirmar siempre antes de borrar archivos o datos
- Respuestas en español, directas y sin tecnicismos
- La web es bilingüe ES/VA. Para añadir o editar traducciones, editar solo `js/translations.js`
- Para añadir una nueva clave: añadirla en `es` y en `va`, y poner `data-i18n="seccion.clave"` en el elemento HTML correspondiente en las 5 páginas
