# Shop Integration Alternatives

## Goal and Constraints

Sell pre-made balls through the existing React and Vite website.
Do not implement or operate a backend, database, serverless function, or webhook receiver.
Use a service for checkout, payment validation, stock enforcement, and order records.
Keep customisation outside this release.
This document compares alternatives; it does not authorise a subscription or implementation.

Prices were checked on 14 October 2026.
Assume an Australian merchant who sells in AUD.
Recheck the account's offer before purchase.
The comparison excludes introductory discounts.

## Recommendation

Choose Shopify Basic if control over the React shop interface is the priority.
Use its public Storefront API with Shopify checkout.
This approach best matches the existing design and the earlier Shopify plan.

Choose Ecwid Venture if a quick launch and less frontend maintenance are the priorities.
Embed its catalogue, cart, and checkout rather than build equivalent controls.
Accept the limits of an embedded interface.

Choose Snipcart if low initial subscription costs and the existing product-card layout are the priorities.
Accept code-based catalogue maintenance and a commission that increases with revenue.
It is the weakest fit for frequent one-off stock changes without backend access.

These recommendations are engineering judgements, not provider guarantees.
Select one provider.
Do not build a three-provider abstraction before making that decision.

## Cost Comparison

| Alternative   | Account cost                                                            | Platform fee on sales                                                                                                  | Payment processing                                                                                                 |
| ------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Shopify Basic | AUD 56/month; AUD 42/month equivalent with annual billing, AUD 504/year | No extra third-party transaction fee with Shopify Payments; Basic lists 2% when a third-party payment provider applies | Shopify Payments: standard online cards 1.7% + AUD 0.30; Amex 2.9% + AUD 0.30; international cards 3.5% + AUD 0.30 |
| Ecwid Venture | AUD 49/month; AUD 40/month equivalent with annual billing, AUD 480/year | Ecwid charges 0%                                                                                                       | Example: Stripe Australia charges 1.65% + AUD 0.30 for domestic cards; 3.5% + AUD 0.30 for international cards     |
| Snipcart      | Minimum USD 20/month for live use                                       | 2% of monthly sales replaces the minimum above USD 1,000/month; do not add both                                        | Stripe fees apply separately, at the rates above                                                                   |

Sources: [Shopify Australian pricing](https://www.shopify.com/au/pricing), [Ecwid AUD subscription prices](https://support.ecwid.com/hc/en-us/articles/25122701806108-Changes-to-the-Ecwid-plan-pricing-after-March-2-2026), [Ecwid transaction fees](https://www.ecwid.com/pricing), [Snipcart pricing](https://snipcart.com/pricing), and [Stripe Australian pricing](https://stripe.com/au/pricing).

Ecwid Starter is not the baseline because product inventory tracking starts with Venture.
Venture supports 100 products.
Separate stock tracking for product variations requires Business.
Use one listing for each unique finished ball.
See [Ecwid's feature comparison](https://support.ecwid.com/hc/en-us/articles/207100729-Ecwid-plans-and-features).

Shopify Starter is not the budget for the proposed custom Storefront API integration.
Confirm its current eligibility, channels, and fees separately if a reduced Buy Button launch is preferred.
Do not assume Basic features apply to Starter.

### Worked Monthly Examples

These are calculations, not quotes.
Assume domestic card payments, AUD 250 per order, and monthly subscription billing.
Assume USD 1 = AUD 1.50 only to illustrate Snipcart's minimum.
This is not a current exchange-rate claim.
The actual conversion and card issuer fees can differ.
Ignore taxes on subscriptions, refunds, postage, optional apps, and currency conversion in this illustration.

Let R be the total processed payment amount in AUD.
Let N be the number of successful payments.
Shipping and tax collected at checkout can increase R.

- Shopify: `56 + 0.017 * R + 0.30 * N`.
- Ecwid with Stripe: `49 + 0.0165 * R + 0.30 * N`.
- Snipcart with Stripe: approximately `max(30, 0.02 * R) + 0.0165 * R + 0.30 * N`.

| Monthly payment amount | Payments | Shopify Basic | Ecwid Venture + Stripe | Snipcart + Stripe |
| ---------------------- | -------- | ------------- | ---------------------- | ----------------- |
| AUD 0                  | 0        | AUD 56.00     | AUD 49.00              | AUD 30.00         |
| AUD 500                | 2        | AUD 65.10     | AUD 57.85              | AUD 38.85         |
| AUD 2,000              | 8        | AUD 92.40     | AUD 84.40              | AUD 75.40         |
| AUD 10,000             | 40       | AUD 238.00    | AUD 226.00             | AUD 377.00        |

Annual billing reduces the illustrated Shopify cost by AUD 14/month and the Ecwid cost by AUD 9/month.
It requires the annual commitment shown above.
Under these assumptions, Ecwid becomes cheaper than Snipcart above approximately AUD 2,450/month.
Do not treat this threshold as a forecast.

### Other Costs and Maintenance

Keep the existing static hosting and domain registration.
No alternative requires a new application server.
Existing hosting limits and charges still apply.
Postage, packaging, optional carrier integrations, accounting apps, and paid marketing services remain separate costs.
Do not assume subscription prices include Australian tax.
Check the invoice and account tax treatment.
Stripe states that its listed card fees include GST.
It adds 2% when currency conversion is required.
See [Stripe pricing](https://stripe.com/au/pricing).

Confirm dispute fees, refund fee treatment, and payment-method fees with the chosen processor.
Do not assume the original processing fee returns after a refund.
Confirm Snipcart's fee base and treatment of shipping, tax, and refunds before using the formula for accounting.
Budget separately for international payments and buy-now-pay-later methods.

Development time is a one-off cost.
Recurring maintenance includes dependency updates, API compatibility, checkout tests, and catalogue administration.
The estimates below are working estimates, not quotations.
They assume one developer, an existing catalogue, and no custom order workflow.
Account verification, photographs, and policy writing are additional work.

## Alternative 1: Shopify Basic

### Shopify Interface

Keep the existing React product grid and product details.
Add prices, stock states, and an accessible cart.
The browser queries Shopify through the public Storefront API.
Cart mutations return a checkout URL.
Redirect the customer to Shopify checkout.
Manage products, refunds, orders, and fulfilment in Shopify admin.

Use only the public Storefront token in browser configuration.
Do not expose an Admin API token or a private Storefront token.
Create the public token through the Headless sales channel.
No server proxy is required for this flow.
See [Shopify's headless credentials](https://shopify.dev/docs/storefronts/headless/overview) and [Storefront API authentication](https://shopify.dev/docs/api/storefront/latest).

### Shopify Implementation

1. Create the store and configure AUD, payments, shipping, and policies.
2. Add finished-ball listings with confirmed prices and inventory.
3. Publish the listings to the Headless channel.
4. Add `src/lib/shopify.ts` for catalogue queries and cart mutations.
5. Add `src/components/ShopCart.tsx` and focused browser tests.
6. Update `src/pages/Shop.tsx` to use commercial data instead of gallery data.
7. Restore carts after refresh and handle expired carts.
8. Send customers to a fresh Shopify checkout URL.

Estimate 5-8 development days for a custom catalogue and cart.
A Buy Button release can reduce the frontend work to approximately 2-3 days.
It gives less control over the interface.
See [Shopify Buy Button](https://help.shopify.com/en/manual/online-sales-channels/buy-button).

Catalogue edits do not need a site deployment.
API version upgrades and custom cart behaviour require ongoing frontend maintenance.
Keep account login and automated order administration outside the initial release.

## Alternative 2: Ecwid Venture

### Ecwid Interface

Keep the shared site header, footer, and Shop introduction.
Mount Ecwid's product browser inside the Shop page.
Let the embedded interface handle product details, cart, and checkout.
Connect Stripe through Ecwid admin.
Manage stock and orders through Ecwid admin.

Use the public store ID and Ecwid's embed script.
Do not put a private REST API token in the browser.
Do not build a custom REST integration for the first release.
See [Ecwid's embed configuration](https://docs.ecwid.com/storefronts/store-configuration-settings/overview).

### Ecwid Implementation

1. Create the Ecwid account and select Venture.
2. Configure listings, payment processing, shipping, stock limits, and policies.
3. Add `src/components/EcwidStore.tsx` to load the embed once.
4. Handle loading failures and provide a direct hosted-store link.
5. Test route changes and remounts to prevent duplicate store instances.
6. Apply supported styling for light mode, dark mode, and narrow screens.
7. Keep the existing hidden preview code until the replacement is approved.

Estimate 2-4 development days.
Catalogue edits do not need a site deployment.
The trade-off is less control over layout, navigation, and embedded checkout.
Test browser back navigation and the interaction with React Router.
Do not assume that provider styling exactly matches the website.

## Alternative 3: Snipcart

### Snipcart Interface

Keep React product cards and add Snipcart purchase attributes.
Load Snipcart's cart and checkout interface.
Connect Stripe through Snipcart's dashboard.
Use Snipcart's dashboard for orders and managed stock.
Only the public Snipcart key belongs in browser configuration.
See [Snipcart installation](https://docs.snipcart.com/v3/setup/installation).

Snipcart validates prices by fetching the product URL from its servers.
React-only product markup is not a suitable static validation source.
Publish a JSON catalogue with the required product IDs and prices.
Set each purchase button's `data-item-url` to that JSON resource.
This is a static asset, not a custom backend.
See [Snipcart order validation](https://docs.snipcart.com/v3/setup/order-validation).

### Snipcart Implementation

1. Create Snipcart and Stripe accounts.
2. Add `src/data/shopProducts.json` with confirmed commercial product data.
3. Use the same file for the React catalogue and a generated static validation asset.
4. Extend `vite.config.ts` to emit `dist/shop-products.json`.
5. Verify that the host serves it as JSON, not the SPA fallback HTML.
6. Allow the staging and production domains in Snipcart.
7. Add `src/components/SnipcartStore.tsx` for the script and cart mount.
8. Fetch the JSON through the dashboard to initialise products before launch.
9. Set managed stock to one for unique balls and block out-of-stock purchases.
10. Confirm that dashboard stock remains authoritative; do not publish a stale stock count in the validation JSON.
11. Test price tampering, simultaneous checkout, and failure to fetch the validation asset.

The private Products API requires a secret key.
Do not use it from the browser to obtain live inventory.
Without a backend, sold-out labels can need manual catalogue edits and redeployment.
Checkout must still enforce managed stock.
See [Snipcart's Products API](https://docs.snipcart.com/v3/api-reference/products).

Estimate 3-5 development days.
Prices and catalogue content need code changes and a deployment unless a hosted content service is added later.
That service would introduce another account, integration, and possible cost.
Keep it outside the initial comparison.

## Common Risks and Launch Gates

Do not use gallery photographs as proof of current stock.
Confirm the real price, photographs, dimensions, and packed weight for each listing.
Disable overselling and pre-orders for unique finished balls.
Do not list the same one-off ball on Etsy and the new shop without a stock process.
For launch, allocate separate stock or remove the Etsy listing.
Automatic cross-channel stock synchronisation can require paid apps.

Choose simple shipping zones and fixed or weight-based rates first.
Verify the actual service's Australian shipping support before subscribing.
Treat a payment redirect as navigation, not proof of a paid order.
Use the provider's confirmed order records for fulfilment.
Leave receipts and transactional emails to the provider.
Do not send card details through site code.

The repository currently uses `https://www.hessellmakes.com` as its production origin.
The earlier Shopify plan mentions `https://www.hessellmakes.com.au`.
Confirm the canonical domain before configuring allowed domains, checkout links, or redirects.

## Implementation Checklist After Selection

- [ ] **SHOP: Integrate the selected service without a custom backend**
  - **Description:** Enable sales of pre-made balls through provider-managed checkout.
  - **Scope:**
    - **In scope:** `@src/pages/Shop.tsx`, its styles and tests, one provider integration, configuration, and launch documentation.
    - **Out of scope:** Custom orders, user-owned servers, database administration, private browser credentials, and automated marketplace synchronisation.
  - **Implementation Tasks:**
    - [ ] **Decide:** Confirm provider, billing term, expected revenue, order value, and catalogue size.
    - [ ] **Confirm:** Check Australian account eligibility, current fees, stock rules, shipping support, and payout timing.
    - [ ] **Reconcile:** Update `@docs/shopify-plan.md` after the provider decision.
    - [ ] **Investigate:** Review the hidden collection in `@src/pages/Shop.tsx` and the portfolio data in `@src/data/soccerBalls.ts`.
    - [ ] **Configure:** Create the account manually; complete payment verification and customer policies.
    - [ ] **Implement:** Add only the selected provider's frontend code and tests.
    - [ ] **Document:** Add public configuration to `.env.example` and `@README.md`; state that Vite variables are visible to visitors.
    - [ ] **Test:** Cover loading, empty stock, sold-out items, retries, quantity limits, cart restoration, and checkout cancellation.
    - [ ] **Test:** Check desktop, mobile, both themes, keyboard operation, and accessibility for each interactive state.
    - [ ] **Verify:** Complete a test payment, a refund, an inventory decrease, an email receipt, and a fulfilment record.
    - [ ] **Verify:** Test two customers who attempt to purchase the same final item.
    - [ ] **Verify:** Confirm prices cannot change through browser tampering.
    - [ ] **Launch:** Replace preview data, reveal the collection, and enable buying only after the checks pass.
    - [ ] **Launch:** Set `@src/siteRoutes.ts` Shop indexing to true after launch approval; confirm the generated sitemap.
    - [ ] **Verify:** Run `npm run validate` before release.

The sitemap changes remain uncommitted at the time of this plan.
Do not include them in a plan-only commit without approval.
No shop account, subscription, or purchase was created for this research.
