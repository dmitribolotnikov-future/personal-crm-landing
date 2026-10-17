# Handoff: лендинг «Личная CRM»

## Overview
Статичный одностраничный лендинг продукта «Личная CRM». Одно целевое действие — перейти в приложение: все CTA ведут на `https://app.<домен>` (в макетах — заглушка `https://app.example.com`, вынести в константу).

Стек: **Astro + Tailwind CSS 4**, статическая сборка (`output: 'static'`), без клиентского JS.

## About the Design Files
Файлы в `design/` — **дизайн-референсы в HTML**, а не продакшн-код. Их нужно воспроизвести в Astro + Tailwind 4 по этому README. Открываются в браузере напрямую (рядом лежит `support.js` — рантайм прототипа, в проект его не переносить).

- `design/Landing Mobile.dc.html` — мобильная версия (артборд 390 px).
- `design/Landing Desktop.dc.html` — десктопная версия (контейнер max-width 1280 px).
- `content/landing-text.md` — исходный текст лендинга.

Стили в макетах inline — переносить в Tailwind-утилиты + токены в `@theme`.

## Fidelity
**High-fidelity.** Цвета, шрифты, размеры, радиусы и тексты финальные. Верстать пиксель-в-пиксель.

Карточки с примерами (контакты, заметки, поиск) — это **HTML-иллюстрации интерфейса**, их верстать разметкой (не картинками). Имена и заметки в них — демонстрационные, оставить как есть.

---

## Design Tokens

### Цвета
| Токен | Hex | Использование |
|---|---|---|
| `bg` | `#fbfafa` | фон страницы |
| `ink` | `#0d0c22` | основной текст, тёмные кнопки, тёмные карточки |
| `ink-soft` | `#3d3d4e` | основной вторичный текст (описания) |
| `muted` | `#8b8796` | подписи, лейблы в карточках |
| `muted-2` | `#5a5866` | приглушённые имена в списке «Проблема» |
| `accent` | `#e2602a` | терракота: акцентное слово, точка логотипа, номера, аватары |
| `accent-ink` | `#b8461a` | eyebrow-лейблы на светлом фоне |
| `accent-deep` | `#9a3a12` | eyebrow на пудровом фоне, буквы на пудровых аватарах |
| `accent-soft` | `#ffb08a` | даты/лейблы на тёмных карточках |
| `powder` | `#f8dfd2` | фон блоков Hero-иллюстрации, «Решение», финального CTA |
| `gray` | `#f1eff4` | серые карточки, список контактов, поле поиска |
| `gray-2` | `#f7f5f8` | плашка внутри белой карточки контакта |
| `avatar-gray` | `#dedbe5` | серые аватары в блоке «Проблема» |
| `line` | `#e4e2ea` | разделители |
| `line-dark` | `#2a2940` | разделитель внутри тёмной карточки |
| `on-dark-muted` | `#c9c8d6` | вторичный текст на тёмном |
| `line-cta` | `#0d0c22` @ 12% (`#0d0c221f`) | разделитель футера в CTA |
| white | `#ffffff` | белые карточки |

### Типографика
- **Onest** (Google Fonts, 400/500/600/700/800, subset cyrillic) — весь текст.
- **JetBrains Mono** (400/500) — eyebrow-лейблы, номера, даты в заметках. Всегда UPPERCASE, `letter-spacing: .06–.08em`.
- Рекомендуется self-host через `@fontsource/onest` и `@fontsource/jetbrains-mono` или `astro:assets` fonts.
- Для заголовков `text-wrap: balance`, для абзацев `text-wrap: pretty`.
- Неразрывные пробелы (`&nbsp;`) в заголовках сохранить как в макетах.

| Роль | Mobile | Desktop |
|---|---|---|
| H1 | 700 42/1.02, ls −0.045em | 700 `clamp(44px,5.6vw,76px)`/1, ls −0.05em |
| H2 секции | 700 34/1.05, ls −0.04em | 700 `clamp(36px,3.8vw,52px)`/1.05, ls −0.045em |
| H2 финала | 700 38/1.02, ls −0.045em | 700 `clamp(40px,5vw,68px)`/1.02, ls −0.05em |
| Lead (подзаголовок hero) | 400 17/1.45 | 400 20/1.5, max-width 520 |
| Заголовок пункта | 700 20/1.2, ls −0.02em | 700 26/1.2 (Проблема), 22/1.2 (Решение), 24/1.2 (Выгода) |
| Текст пункта | 400 16/1.5 | 400 18/1.5 (Проблема), 17/1.5 (прочее) |
| Eyebrow | Mono 500 12, ls .08em | Mono 500 13 |
| Кнопка | 600 17 | 600 18 |
| Логотип | 800 20, ls −0.03em | 800 24 |

### Радиусы
`99px` (кнопки, поле поиска, pill) · `50%` (аватары) · `12–14px` (внутренние плашки) · `16–18px` (строки списка) · `20–24px` (малые карточки) · `28px` (карточки, hero-блок mobile — только верхние углы `28px 28px 0 0`) · `32px` (карточки выгод desktop) · `36px` (секции-блоки mobile) · `40px` (hero-блок desktop) · `48px` (секции-блоки desktop).

### Тени
- Карточка контакта в hero: `0 10px 30px rgba(13,12,34,.10)` (desktop `0 14px 40px`).
- Pill-карточка «Аня Морозова» (desktop): `0 10px 30px rgba(13,12,34,.08)`.

### Отступы
Mobile: горизонтальный gutter **20px**. Desktop: контейнер `max-width:1280px; padding: 0 40px`.

---

## Компоненты (переиспользуемые)

- **Logo**: текст `лично` + `.` цветом `accent`.
- **AvatarStack**: кружки с инициалами, overlap `margin-left:-8px` (28px), `-10px` (34/40px), `-12px` (52px); обводка 2–3px цветом фона секции.
- **Avatar**: круг с инициалами, Onest 700, центрирование grid.
- **ButtonPrimary**: `<a href={APP_URL}>`, bg `ink`, текст белый, radius 99px, текст «Открыть личную CRM →». Hover: `opacity .88`.
- **Eyebrow**: `01 / ПРОБЛЕМА`, `02 / РЕШЕНИЕ`, `03 / ЧТО ВЫ ПОЛУЧАЕТЕ`.
- **NumberedItem** (Проблема): grid `40px 1fr` (desktop `56px 1fr`), номер mono `accent`, `border-top: 1px line`, у последнего также `border-bottom`.
- **FeatureCard** (Выгода): bg `gray`, radius 28 (desktop 32), padding 24 (desktop 32).

---

## Screens / Sections

Порядок секций одинаков: Header → Hero → Проблема → Решение → Выгода → CTA (с футером внутри).

### Header
Только логотип слева. **Никаких кнопок в шапке** (единственный CTA — в контенте). Mobile padding `22px 20px 0`; desktop `28px 0`.

### 01 Hero
**Mobile:** секция высотой 844px, flex-column.
- padding `36px 20px 0`, gap 18.
- AvatarStack (28px: `СК` accent/white, `ДМ` ink/white, `АП` powder/accent-deep) + текст «Личная CRM для ваших контактов» (500 15, `ink-soft`), gap 10.
- H1: «Не теряйте связь с теми, кого знаете **лично**» — слово «лично» цветом `accent`.
- Lead: «Храните все контакты в одном месте и записывайте важное о каждом человеке, чтобы ничего не терялось».
- Кнопка (padding `18px 28px`, align-self start).
- Иллюстрация: блок `powder`, margin `30px 20px 0`, flex:1, radius `28px 28px 0 0`, overflow hidden, position relative:
  - Белая карточка (left 22, top 26, w 250, padding 16, radius 20, rotate −5°, тень): аватар 40 `СК` accent + «Саша Ковалёва» (700 15) / «Продакт в финтехе» (400 12 muted); плашка `gray-2` radius 12 padding 10: «Познакомились на конференции. Познакомил Дима.» (400 13/1.4).
  - Тёмная карточка (right 18, top 150, w 210, padding 16, radius 20, rotate 4°, bg ink): mono 11 `accent-soft` «ЗАМЕТКА · 12 МАРТА», текст 500 14/1.4 «Переезжает в Тбилиси в мае, ищет школу для сына».

**Desktop:** grid `repeat(auto-fit, minmax(min(100%,460px),1fr))`, gap 56, align center, padding `40px 0 96px`.
- Левая колонка: gap 28, аватары 34px, текст 500 17.
- Правая: блок `powder` h 560, radius 40 (все углы). Внутри три карточки:
  - Белая контакт-карточка: left 8%, top 64, w 320, padding 20, radius 24, rotate −5°, аватар 48.
  - Тёмная заметка: right 8%, top 260, w 280, padding 20, radius 24, rotate 4°, текст 500 17.
  - Pill «Аня Морозова / Юрист · подруга Лены»: left 14%, bottom 48, w 260, bg white, radius 99, rotate −2°, аватар 36 ink.

### 02 Проблема
- Eyebrow «01 / ПРОБЛЕМА» (`accent-ink`), H2 «Контакты есть, а контекста нет».
- Иллюстрация-список: bg `gray`, radius 28 (desktop 32, max-width 440), padding 18 (22). Лейбл mono 11 muted «КОНТАКТЫ · 412». Три строки: первая белая (radius 16) «Саша Конференция» (600), затем «Андрей Сантехник?», «Марина (от Оли)» (500, `muted-2`); аватары `avatar-gray` с одной буквой.
- Пункты:
  1. **«Кто это вообще?»** — В телефоне сотни контактов вроде «Саша Конференция», и уже не вспомнить, кто это и откуда.
  2. **Забываете, о чём говорили** — Человек рассказал про переезд или новую работу, а через месяц вы уже об этом не помните.
  3. **Контакты разбросаны по разным местам** — Часть в телефоне, часть в мессенджерах, часть в почте.
- Mobile: padding `64px 20px 56px`, всё в колонку gap 28.
- Desktop: grid 2 колонки (`auto-fit, minmax(min(100%,420px),1fr)`), gap 56, padding `56px 0 112px`, `border-top: 1px line`. Слева заголовок + список, справа пункты (прижаты к низу, `justify-content:flex-end`), padding пункта 28px 0.

### 03 Решение
Блок bg `powder`. Mobile: margin `0 12px`, padding `48px 20px 24px`, radius 36. Desktop: padding `72px clamp(24px,4vw,56px) 64px`, radius 48.
- Eyebrow «02 / РЕШЕНИЕ» (`accent-deep`), H2 «Всё важное о человеке — в одной карточке».
- Три пары «иллюстрация + текст» (mobile — вертикально, gap 10, текст padding `4px 4px 20px`; desktop — grid 3 колонки `auto-fit minmax(min(100%,300px),1fr)` gap 24, иллюстрации min-height 200):
  1. Белая карточка контакта: аватар 44 `СК`, имя + должность; grid `auto 1fr` gap `8px 14px`, 400 14: Где — Конференция Product Camp / Кто познакомил — Дима Морозов / Чем занимается — Платёжные продукты (лейблы muted).
     **Карточка для каждого контакта** — В ней записано, где вы познакомились, кто вас познакомил и чем человек занимается.
  2. Тёмная карточка (ink, radius 24/28, padding 20/22): «12 МАРТА» / «Переезжает в Тбилиси в мае, ищет школу для сына»; разделитель `line-dark`; «4 ФЕВРАЛЯ» / «Запускает новый продукт, просила фидбек» (`on-dark-muted`).
     **Возможность делать заметки** — Всю важную информацию всегда можно записать в карточку, а затем открыть и вспомнить, о чём говорили в прошлый раз.
  3. Белая карточка поиска: поле `gray` radius 99 «Поиск: **юрист**»; результат «Аня Морозова / Юрист · подруга Лены с йоги» (аватар ink). Desktop добавляет второй результат «Игорь Петров / Юрист по IT · бывший коллега» (аватар accent).
     **Всё в одном месте** — Один список всех, кого вы знаете. Нужный человек находится поиском за пару секунд.

### 04 Выгода
- Eyebrow «03 / ЧТО ВЫ ПОЛУЧАЕТЕ», H2 «Личный CRM-помощник для ваших контактов».
- 5 карточек, **все серые** (`gray`), без иконок и тегов:
  1. Люди чувствуют, что вы их помните — Вы спрашиваете, как прошёл переезд, и отношения от этого крепнут.
  2. Больше не неловко — Не надо переспрашивать имя или делать вид, что помните.
  3. Голова свободна — Держать всё в памяти больше не нужно, CRM помнит за вас.
  4. Нужный человек всегда под рукой — Когда понадобится совет, специалист или рекомендация, вы быстро найдёте, к кому обратиться.
  5. Открывается с телефона и компьютера — Данные одни и те же.
- Mobile: padding `64px 20px 56px`, колонка gap 10.
- Desktop: padding `112px 0`, `flex-wrap` gap 16, каждая карточка `flex: 1 1 340px` → на 1280 получается 3 + 2.

### 05 CTA + футер
Блок bg `powder`. Mobile: margin `0 20px 20px`, padding `40px 20px 24px`, radius 36, выравнивание по левому краю, gap 24. Desktop: margin-bottom 40, padding `80px clamp(24px,4vw,56px) 32px`, radius 48, **по центру**, gap 32.
- AvatarStack (40px mobile / 52px desktop, обводка `powder` 3px): `СК` white/accent, `ДМ` accent/white, `АП` ink/white, `ИП` white/ink.
- H2 «Помните всё о тех, кого знаете лично».
- Кнопка «Открыть личную CRM →» (mobile — во всю ширину, padding 20/28; desktop — авто, padding 22/36).
- Футер-строка: `border-top: 1px line-cta`, padding-top 20/24 (desktop margin-top 48): логотип слева, mono 12 «ЛИЧНАЯ CRM» справа.

---

## Interactions & Behavior
- Все CTA — обычные ссылки `<a href={APP_URL}>`, без JS. Hover: `opacity: .88`. Добавить видимый `focus-visible` (outline 2px `accent`, offset 3px).
- Анимаций нет.
- Responsive: макеты — две точки (390 и 1280). Mobile-first; переход на desktop-раскладку с `md`/`lg` (≈768–1024px). Desktop-гриды уже рассчитаны на `auto-fit`, промежуточные ширины должны корректно переносить колонки.
- Повёрнутые карточки — декоративные (`aria-hidden="true"` на контейнере иллюстраций либо понятный alt-текст группы).

## State Management
Нет. Статическая страница.

## SEO / meta
- `<title>`: «Личная CRM — помните всех, кого знаете лично»
- `<meta name="description">`: «Храните все контакты в одном месте и записывайте важное о каждом человеке, чтобы ничего не терялось»
- `lang="ru"`.

## Реализация в Astro + Tailwind 4 (рекомендация)
- `src/pages/index.astro` + компоненты в `src/components/` (Header, Hero, Problem, Solution, Benefits, Cta, Avatar, AvatarStack, Button, Eyebrow).
- Константа `APP_URL` в `src/config.ts` (или `import.meta.env.PUBLIC_APP_URL`).
- Токены — в `src/styles/global.css`:
```css
@import "tailwindcss";
@theme {
  --color-bg:#fbfafa; --color-ink:#0d0c22; --color-ink-soft:#3d3d4e;
  --color-muted:#8b8796; --color-muted-2:#5a5866;
  --color-accent:#e2602a; --color-accent-ink:#b8461a; --color-accent-deep:#9a3a12; --color-accent-soft:#ffb08a;
  --color-powder:#f8dfd2; --color-gray:#f1eff4; --color-gray-2:#f7f5f8; --color-avatar-gray:#dedbe5;
  --color-line:#e4e2ea; --color-line-dark:#2a2940; --color-on-dark-muted:#c9c8d6;
  --font-sans:"Onest",system-ui,sans-serif; --font-mono:"JetBrains Mono",ui-monospace,monospace;
}
```

## Assets
Нет растровых изображений и иконок. Все иллюстрации — HTML-разметка. Стрелка в кнопке — символ `→`. Шрифты — Google Fonts (Onest, JetBrains Mono).

## Files
- `design/Landing Mobile.dc.html` — мобильный макет
- `design/Landing Desktop.dc.html` — десктопный макет
- `design/support.js` — рантайм для открытия макетов в браузере (не переносить)
- `content/landing-text.md` — исходный текст
