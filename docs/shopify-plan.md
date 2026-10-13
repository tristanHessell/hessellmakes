# Shopify Integration Plan

## Goal

Sell pre-made leather soccer balls through the existing React and Vite website.
Use Shopify for product prices, stock, payments, shipping, and orders after the account exists.
Keep the Gallery as a portfolio of previous work.
Defer customisation and quotes until a later release.

## Initial Purchase Flow

Customers choose a finished ball and pay its listed price at checkout.
Each listing must describe the actual ball offered for sale.
Do not treat gallery photographs as proof of current stock.

1. Create a Shopify product for each finished ball or stocked design.
2. Set its price, stock quantity, dimensions, photographs, and shipping details.
3. Publish it to the shop's sales channel.
4. Display Shopify prices and availability on the Shop page.
5. Let the customer add an available ball to a Shopify cart.
6. Send the customer to Shopify checkout through the cart's checkout URL.
7. Confirm payment and fulfil the order through Shopify.

Use Shopify as the source of prices and inventory.
Prevent purchases when a ball is out of stock.
Recheck availability during cart updates and checkout.
Do not add artwork, personalisation, or commission fields in the initial release.

## Integration Approaches

| Approach           | Scope                                                                    | Best Fit                                         |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------ |
| Shopify Buy Button | Embed Shopify product and cart controls in the existing website.         | A small catalogue of finished balls.             |
| Storefront API     | Build product and cart views in React. Use Shopify checkout for payment. | A shop that matches the existing website design. |

Use the Storefront API for the planned shop.
The Buy Button remains an alternative for a smaller initial release.

## Initial Work Without a Shopify Account

- [x] Add a Shop route at `/site/shop` and a navigation link.
- [x] Link to the Shop page from Home.
- [x] Show a pre-made collection preview with existing product photographs.
- [x] Provide product details for each ball.
- [x] State that prices and availability remain unconfirmed.
- [x] Keep checkout disabled until the store is connected.
- [x] Link to the existing Etsy shop for current stock.
- [x] Remove the commission form, custom-order tabs, and enquiry downloads.
- [x] Add browser and accessibility tests for the collection and product details.
- [x] Keep the unfinished shop out of the sitemap and mark it as noindex.

The preview uses existing gallery data until the Shopify catalogue exists.
The entire collection section is currently hidden, but its code remains for later work.
Remove its `hidden` attribute in `src/pages/Shop.tsx` when it is ready to show.
It does not claim that the photographed balls are available.
Replace preview data with confirmed Shopify listings before launch.

## Shopify Setup

- [ ] Create the Shopify account and confirm the store plan.
- [ ] Configure currency, payments, shipping zones, taxes, and customer policies.
- [ ] Create listings for finished balls with accurate stock quantities.
- [ ] Add the Headless channel and publish the products to it.
- [ ] Create a public Storefront token with the required permissions.
- [ ] Confirm the checkout domain and customer support channel.
- [ ] Complete a test purchase before enabling checkout.

## Implementation After Setup

### Catalogue

- [ ] Add `src/lib/shopify.ts` with typed product queries and cart mutations.
- [ ] Configure the shop domain, public token, and a supported API version through environment variables.
- [ ] Document these values in `.env.example` and the README.
- [ ] Fetch commercial data from Shopify rather than the gallery data file.
- [ ] Show price, currency, stock availability, dimensions, and shipping information.
- [ ] Add loading, empty, sold-out, and retry states.
- [ ] Add variant selection only where stocked products have variants.

### Cart and Checkout

- [ ] Add a cart provider and an accessible cart view.
- [ ] Support quantity changes, removal, and Shopify-calculated totals.
- [ ] Restore the cart after a refresh and handle expired carts.
- [ ] Handle stock limits, sold-out products, and request errors.
- [ ] Prevent duplicate cart entries during repeated clicks.
- [ ] Retrieve a fresh checkout URL before redirecting the customer.
- [ ] Keep payment collection on Shopify checkout.

### Launch

- [ ] Test checkout, inventory changes, shipping, and fulfilment with Shopify test payments.
- [ ] Test error recovery, cart persistence, mobile layouts, and keyboard navigation.
- [ ] Add accessibility tests for each shopping state.
- [ ] Add accurate product structured data from Shopify.
- [ ] Check canonical URLs against `https://www.hessellmakes.com.au`.
- [ ] Add the live Shop routes to the sitemap and remove noindex.
- [ ] Decide when to remove the temporary Coming Soon page and the `/site` prefix.
- [ ] Run `npm run validate` before release.

## Later Phase: Custom Orders

Custom orders remain outside the initial shop.
Choose a workflow before adding them.

### Option A: Fixed-Price Custom Order

Use this option when the maker can confirm a price before the customer orders.
Use Shopify variants for choices that affect the price.
Use cart-line attributes for personalisation instructions.
Confirm production capacity and lead times before accepting payment.
Do not calculate prices from customer-supplied attributes.

### Option B: Quote Before Payment

Use this option for new designs, artwork, unusual materials, or larger orders.

1. Collect the specification and customer contact details through a real enquiry service.
2. Let the maker confirm the design, price, and lead time.
3. Create a Shopify draft order and send its payment link to the customer.
4. Start production after the agreed payment and design approval.

The maker can create draft orders manually.
Automated draft orders require a server-side integration with the Shopify Admin API.
Keep private credentials out of the browser.
Confirm deposit, cancellation, and refund terms before implementing this phase.
The current Contact form does not send messages.
Connect a real submission service before using it for quote requests.

## References

- [Shopify Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api)
- [Cart and checkout](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage)
- [Buy Button](https://help.shopify.com/en/manual/online-sales-channels/buy-button)
- [Cart-line attributes for later custom orders](https://shopify.dev/docs/api/storefront/latest/input-objects/CartLineInput)
- [Draft orders for later custom orders](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders)
