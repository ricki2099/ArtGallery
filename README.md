# 🎨 ArtGallery — Prueba Técnica React Native

Aplicación móvil para la visualización y venta de cuadros, desarrollada con React Native + TypeScript.

---

## 📱 Pantallas

| # | Pantalla | Descripción |
|---|----------|-------------|
| 01 | **Home** | Carrusel animado, contador de favoritos, galería grid |
| 02 | **Detalle** | Imagen, descripción, tabla de detalles, toggle favorito |
| 03 | **Drawer** | Menú lateral con navegación a secciones estáticas |
| 04 | **Ayuda** | FAQ con acordeón animado |
| 05 | **Quiénes somos** | Historia + estadísticas |
| 06 | **Contáctanos** | Datos de contacto |

---

## 🛠 Stack tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React Native | 0.86 | Framework base |
| TypeScript | 5.x | Tipado estático |
| React Navigation | 6.x | Navegación Stack + Drawer |
| AsyncStorage | 2.x | Persistencia de favoritos |
| NativeWind | 4.2.6 | Instalado y configurado* |

---

## 🚀 Instalación y ejecución

### Requisitos previos
- Node.js >= 18
- JDK 17
- Android Studio + Android SDK (API 34)
- Variables de entorno `ANDROID_HOME` configuradas

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/tu-usuario/ArtGallery.git
cd ArtGallery
npm install
```

### 2. iOS — instalar pods

```bash
cd ios && pod install && cd ..
```

### 3. Ejecutar

```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

### 4. Correr tests

```bash
npm test
```

---

## 🏗 Arquitectura del proyecto

```
ArtGallery/
├── App.tsx                          # Entry point — providers + navigator
├── index.js                         # Registro de la app + import global.css
├── global.css                       # NativeWind base styles
├── tailwind.config.js               # Configuración de colores y tipografía
├── babel.config.js                  # Plugin Reanimated
├── metro.config.js                  # withNativeWind
│
├── src/
│   ├── types/
│   │   └── index.ts                 # Painting, RootStackParamList, DrawerParamList
│   │
│   ├── data/
│   │   └── paintings.ts             # Mock data — 6 cuadros con todos los campos
│   │
│   ├── context/
│   │   └── FavoritesContext.tsx     # Context API + AsyncStorage persistence
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx        # Drawer navigator raíz
│   │   ├── MainStack.tsx            # Stack: Home → Detail
│   │   └── CustomDrawerContent.tsx  # Drawer UI personalizado
│   │
│   ├── components/
│   │   ├── BackButton.tsx           # Botón de retroceso reutilizable
│   │   ├── PaintingCard.tsx         # Tarjeta de cuadro reutilizable
│   │   └── Carousel.tsx             # Carrusel con animaciones Animated API
│   │
│   └── screens/
│       ├── HomeScreen.tsx           # Inicio: header, favoritos, carrusel, grid
│       ├── DetailScreen.tsx         # Detalle: imagen, info, toggle favorito
│       ├── HelpScreen.tsx           # Ayuda con FAQ acordeón
│       ├── AboutUsScreen.tsx        # Quiénes somos + estadísticas
│       └── ContactScreen.tsx        # Contacto
│
└── __tests__/
    ├── FavoritesContext.test.tsx    # Tests del contexto
    └── PaintingCard.test.tsx        # Tests del componente
```

---

## 🧠 Decisiones técnicas

### Estado global — Context API
Se eligió **Context API** sobre Redux Toolkit porque:
- El scope de estado es acotado (solo favoritos)
- No hay lógica asíncrona compleja ni middleware necesario
- Mantiene el proyecto liviano y sin dependencias adicionales

### Persistencia — AsyncStorage
Los favoritos se persisten automáticamente en cada cambio del estado usando un `useEffect` que observa el array `favorites`. Al montar la app, se restaura el estado desde el storage, garantizando que los favoritos sobrevivan a reinicios.

### Animaciones — Animated API nativa
El carrusel usa `Animated.FlatList` con `interpolate` para aplicar `scale` y `opacity` en función del `scrollX`. Las animaciones corren **en el hilo nativo** (`useNativeDriver: true`) sin bloquear el JS thread, garantizando 60fps.

### Estilos — StyleSheet en lugar de NativeWind
La prueba solicita **NativeWind** como tecnología de estilos. NativeWind está instalado y configurado correctamente (`tailwind.config.js`, `metro.config.js`, `global.css`, `index.js`).

Sin embargo, durante el desarrollo se identificó una **incompatibilidad entre NativeWind v4.2.6 y React Native 0.86**: las clases de Tailwind no se procesaban en tiempo de ejecución en el emulador Android (las clases `className` no generaban estilos visuales). Esto se debe a que NativeWind v4 aún no tiene soporte estable para la Nueva Arquitectura de React Native (Fabric/TurboModules), que viene habilitada por defecto desde RN 0.74+.

**Solución adoptada:** Se implementaron los estilos con `StyleSheet` de React Native, respetando exactamente la misma paleta de colores, espaciados y diseño definidos en el mockup. La decisión prioriza la calidad visual y la entrega funcional sobre el uso forzado de una librería con incompatibilidades conocidas.

**Paleta de colores aplicada:**
| Token | Valor |
|-------|-------|
| Primary | `#6D2BD9` |
| Primary Light | `#8B5CF6` |
| Hero BG | `#EDE9FE` |
| Light BG | `#F3F4F6` |
| Dark Text | `#111B27` |
| Muted Text | `#6B7280` |

### Navegación — Stack + Drawer anidados
- El **Drawer** es el navigator raíz, permitiendo abrir el menú lateral desde cualquier pantalla
- Dentro del Drawer, el **Stack** maneja la navegación Home → Detail
- `DrawerActions.openDrawer()` se dispara desde `HomeScreen` apuntando al navigator padre

### Datos mock
Los cuadros se cargan desde `src/data/paintings.ts`, un arreglo estático con 6 obras que incluyen todos los campos del tipo `Painting` (id, title, image, description, artist, technique, year, dimensions).

---

## 🧪 Tests

```bash
npm test
```

Cobertura:
- `FavoritesContext` — agregar, remover, contador, error fuera de provider
- `PaintingCard` — render de título/artista, callback onPress

---

## ✅ Checklist de requerimientos

### Funcionales
- [x] Header con nombre/logo y botón menú lateral
- [x] Contador de favoritos en Home
- [x] Carrusel animado con varias imágenes
- [x] Sección informativa en Home
- [x] Tap en cuadro navega al detalle
- [x] Drawer con Ayuda, Quiénes somos, Contáctanos
- [x] Detalle con imagen, nombre, ícono favorito y tabla de detalles
- [x] Toggle de favorito con cambio visual
- [x] Contador de favoritos se actualiza en tiempo real
- [x] Estado centralizado accesible desde múltiples pantallas

### Técnicos
- [x] React Native + TypeScript
- [x] NativeWind (instalado y configurado — ver decisión técnica)
- [x] React Navigation (Stack + Drawer)
- [x] Context API para estado de favoritos
- [x] Tipo `Painting` con id, title, image, description
- [x] Datos mock locales

### Entregables
- [x] Repositorio en GitHub
- [x] README con instrucciones de ejecución
- [x] Explicación de decisiones técnicas
- [x] Persistencia con AsyncStorage
- [x] Animaciones en el carrusel (scale + opacity)
- [x] Pruebas unitarias
- [x] Loading states (isLoading en FavoritesContext)
