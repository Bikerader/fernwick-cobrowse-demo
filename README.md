# Fernwick Outfitters — Genesys Co-browse test site

A fictional two-page static site for testing Genesys Cloud Co-browse. Nothing entered is sent or stored.

- `index.html`: company info and a customer details form (fields an agent should be able to see)
- `payment.html`: checkout with card fields (fields that should be masked)

## Host on GitHub Pages

1. Create a repo and push these files to its root.
2. Go to **Settings > Pages**, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site appears at `https://<username>.github.io/<repo>/`.

## Connect Genesys Cloud

1. **Admin > Message > Messenger Configurations**: turn on Co-browse.
2. In the Co-browse settings, add the masking selector `.cobrowse-mask` (card number, expiry, CVV all carry this class). You can also mask by ID: `#cc-number`, `#cc-exp`, `#cc-cvv`.
3. **Admin > Message > Messenger Deployments**: create a deployment with that configuration and add `<username>.github.io` to the allowed domains.
4. Put the deployment ID and your region in `js/genesys.js`.

## Test cards

| Brand | Number |
|---|---|
| Visa | 4111 1111 1111 1111 |
| Mastercard | 5555 5555 5555 4444 |
| Amex | 3782 822463 10005 |

Any future expiry and any CVV.
