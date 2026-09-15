# Cars-Only Public Site

The public-facing AWA AUTO MALL site currently exposes Cars only.

- The shared header and footer navigation omit Spare Parts.
- The homepage hero, category section, search form, inquiry form, and supporting copy are cars-only.
- Spare-parts routes, marketplace components, and inventory data remain in the codebase but are intentionally unlinked for a later phase.
- The uploaded `src/assets/awa-logo.png` is used directly by the site shell.

## Verification

- `npm run build` passes for client, SSR, and Nitro output.
- Public component and route scans contain no `/spare-parts` links or Spare Parts labels outside the preserved spare-parts route/component files.
