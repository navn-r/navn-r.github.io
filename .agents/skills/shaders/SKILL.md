---
name: shaders
description: 'Find and compose shaders.com components, including font and image inputs. Use when building or changing effects with the shaders package.'
---

- To find components, search the [component catalog](https://shaders.com/docs/components) for the requested look, then check the selected component’s props in `node_modules/shaders/dist/core/shaders/<Name>/index.d.ts`. Read its docs at `https://shaders.com/docs/components/<Name>` for behavior and examples; do not guess prop names.

- Composition happens inside `<Shader>`: later layers draw over earlier ones, filters affect preceding layers, and nesting limits a filter to its children. Generators create their own content, so not every component accepts children. Use `maskSource` to reference another layer’s `id` as a mask. These effects process canvas layers, not existing page HTML. See the [composition guide](https://shaders.com/docs/guide/composing-effects).

- Fonts are loaded by `Text` through Google Fonts using `fontFamily`. For self-hosted fonts, define `@font-face` and await `document.fonts.load()` before mounting; the built-in loader may still request Google Fonts. Numeric `fontSize` is a fraction of canvas height. SVG paths are useful for fixed lettering.

- Source images use `<ImageTexture url="..." objectFit="contain" />` and can be nested inside filters; remote images need CORS support. Shape materials such as `LiquidMetal` use a shape configuration or a preprocessed `shapeSdfUrl` asset, not a raw SVG image. A mask clips the material but does not make its lighting follow the outline. See the [shape guide](https://shaders.com/docs/guide/shape-effects).
