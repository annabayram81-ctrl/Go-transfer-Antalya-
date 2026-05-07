# GoTransfer Store Listing Draft

## App Name

GoTransfer

## Short Description

Private transfer booking in Antalya and nearby resort locations.

## Full Description

GoTransfer helps travelers estimate and request private transfers from Antalya Airport and between popular resort locations in the Antalya region.

Choose pickup and destination points, set date and time, select passenger count, see an estimated price, and continue the request in WhatsApp or Telegram with the route details already prepared.

The app supports Russian, English, and Turkish.

## Data Safety Notes

- The Android app shell does not add native accounts, payments, push notifications, location access, contacts access, or analytics SDKs.
- The app requires internet access to load the GoTransfer booking site.
- Booking requests are completed through external WhatsApp or Telegram apps/web pages.
- Privacy Policy URL: `https://antalya-transfer.vercel.app/privacy.html`.

## Store Assets

- Icon: `android/store/icon-512.png`.
- Screenshots to capture before submission:
  - Main booking screen in Russian.
  - Route selected with calculated price.
  - Language menu or English/Turkish variant.
  - WhatsApp/Telegram handoff state if allowed by store guidelines.

## Release Checklist

- Confirm `https://antalya-transfer.vercel.app` is the final production URL for v1.
- Verify `versionCode` is higher than any previously uploaded build.
- Build signed `.aab` with upload key.
- Test on a physical Android device or emulator.
- Complete Google Play Data safety and content rating forms.
- Complete RuStore app details, screenshots, icon, permissions declaration, and moderation notes.
