# Custom Domain Email Plan

## Goal

Send and receive business email through the domain already purchased from Crazy Domains.
Keep the domain registration and website hosting unchanged.
Use a hosted email provider.
Do not implement a mail server or backend.
Keep this plan separate from the shop integration plan.

Prices were checked on 14 October 2026.
Assume Australian billing in AUD.
The exact domain, existing email service, and number of users remain unconfirmed.
This plan does not authorise a purchase or DNS change.

## Recommendation

Start with one paid mailbox if Emily is the only person who needs access.
Use aliases for public addresses such as `hello@` and `orders@`.
Buy a second user account only if another person needs independent access.
Do not share a mailbox password between people.

Choose Google Workspace if the preferred daily interface is Gmail.
Choose Microsoft Exchange Online Plan 1 if email-only cost and shared business inboxes are the priorities.
Choose Crazy Domains Titan Business if one supplier for registration and email is the priority.
Do not choose its cheapest tier without accepting the security and alias restrictions below.

These recommendations reflect the proposed workflow, not a claim that one provider guarantees better delivery.
Owning a domain at Crazy Domains does not require buying email from Crazy Domains.
Email hosting and domain registration are separate services.

## Mailboxes, Aliases, and Forwarding

| Type           | Purpose                                                             | Cost implication                                                        |
| -------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Mailbox        | A login with its own stored mail and sent messages                  | Usually one paid account per person                                     |
| Alias          | Another address that delivers to an existing mailbox                | Often included; sending from the alias needs support and configuration  |
| Shared mailbox | A separate business inbox accessed through individual user accounts | Depends on the provider's licensing rules                               |
| Forwarding     | Sends incoming messages to another inbox                            | Does not provide authenticated sending from the custom domain by itself |

Suggested first setup:

1. Create a mailbox for `emily@<owned-domain>`.
2. Add `hello@<owned-domain>` as the public enquiry address.
3. Add `orders@<owned-domain>` for manual order support.
4. Configure replies to use the appropriate public address.
5. Add a reporting address for email authentication reports if required.

These addresses are proposals, not confirmed mailboxes.
Aliases do not provide independent access or separate storage.
If two people need to manage enquiries, use delegated access or a shared mailbox instead of sharing credentials.
Avoid catch-all delivery initially because it can attract unwanted mail.

## Three Provider Alternatives

| Provider                          | Advertised cost per account                                          | Billing and tax notes                                                                                  | Relevant features                                                                             |
| --------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Crazy Domains Titan Professional  | AUD 3.89/month equivalent                                            | Page offers 1-, 2-, and 3-year terms; confirm currency, term total, GST, and renewal price at checkout | 10 GB; receiving aliases, but no Send as Alias or two-factor authentication in the comparison |
| Crazy Domains Titan Business      | AUD 7.49/month equivalent                                            | Confirm the same checkout details; not a verified month-to-month offer                                 | 50 GB; Send as Alias and two-factor authentication                                            |
| Google Workspace Business Starter | AUD 9.90/user/month with an annual commitment; AUD 11.80 on Flexible | Listed prices exclude tax; the annual commitment is not the same as a cancellable monthly plan         | Gmail on the custom domain; 30 GB pooled storage per user                                     |
| Microsoft Exchange Online Plan 1  | AUD 6.00/user/month, paid yearly                                     | Annual subscription; excludes GST; confirm any monthly offer separately                                | Email-only service with a 50 GB mailbox and Outlook on the web                                |

There are three providers; the two Titan rows show the relevant Crazy Domains tiers.
Sources: [Crazy Domains email hosting](https://www.crazydomains.com.au/email-hosting/), [Google payment plans](https://knowledge.workspace.google.com/admin/billing/compare-flexible-and-annual-fixed-term-payment-plans), [Google Australian features and pricing](https://workspace.google.com/pricing?hl=en_au&region=AU), and [Exchange Online pricing](https://www.microsoft.com/en-au/microsoft-365/exchange/exchange-online-business-plans-and-pricing).

### Account Budgets

These calculations exclude introductory discounts and optional services.
The Titan figures multiply the advertised rate by 12; they are not confirmed renewal quotes.
Google and Microsoft figures exclude GST.
Confirm Titan's GST treatment before comparing final invoices.

| Service and term                                       | One account per year | Two accounts per year |
| ------------------------------------------------------ | -------------------- | --------------------- |
| Titan Professional, illustrated at the advertised rate | AUD 46.68            | AUD 93.36             |
| Titan Business, illustrated at the advertised rate     | AUD 89.88            | AUD 179.76            |
| Google Starter, annual commitment                      | AUD 118.80           | AUD 237.60            |
| Google Starter, Flexible for 12 months                 | AUD 141.60           | AUD 283.20            |
| Exchange Online Plan 1, annual subscription            | AUD 72.00            | AUD 144.00            |

These mailbox subscriptions do not charge a percentage of shop sales.
Domain renewal remains a separate existing cost.
Optional migration, backup, archiving, or email marketing services can add charges.
Confirm whether the current DNS service supports the required records without a paid upgrade.
Do not buy website hosting merely to obtain email.
Check term length, cancellation conditions, account count, and renewal totals before purchase.

### Option 1: Crazy Domains Titan

The domain and email billing can remain with one supplier.
Use Titan Business for the proposed alias reply workflow and two-factor authentication.
The plan comparison lists 10 aliases per mailbox.
Confirm this limit and how delegated access works before adding another person.
Do not assume the registrar's security settings protect the mailbox itself.
See [the Titan plan comparison](https://www.crazydomains.com.au/email-hosting/).

Follow the welcome instructions for the actual service purchased.
Crazy Domains also has other email products; do not mix their server settings.
Use encrypted client connections.
See [Crazy Domains Titan setup](https://www.crazydomains.com.au/help/article/cd-getting-started-with-titan-email).

Record the renewal quote before accepting the order.
Discounted products can renew at a different rate.
See [Crazy Domains auto-renewal](https://www.crazydomains.com.au/help/article/auto-renewal).

### Option 2: Google Workspace

Buy Workspace directly from Google for a clear billing comparison.
A reseller offer can have different prices, terms, and support arrangements.
Use one Starter account with aliases when one person handles all mail.
Google supports up to 30 aliases per user at no extra charge.
An alias is not a separate Google account.
Configure Gmail's sending identity before replying from an alias.
See [Google's alias guidance](https://support.google.com/a/answer/33327).

Use separate accounts for separate people.
If a team needs a shared queue, evaluate delegation or a Google Group before buying another generic mailbox.
Enable two-step verification and test account recovery.
See [Google two-step verification](https://support.google.com/accounts/answer/185839).

### Option 3: Microsoft Exchange Online

Use Exchange Online Plan 1 when only business email is required.
It does not provide the full Microsoft 365 productivity bundle.
Do not assume it includes a paid desktop Outlook licence.
Buy one licence for each person who needs a mailbox.

If two licensed people manage `hello@`, consider a shared mailbox.
A shared mailbox can hold up to 50 GB without its own licence.
Each person who accesses it still needs a licensed Exchange Online mailbox.
Additional storage or compliance features can require extra licences.
See [Microsoft shared mailbox requirements](https://learn.microsoft.com/en-us/microsoft-365/admin/email/about-shared-mailboxes).

Keep Microsoft security defaults enabled and complete multifactor registration.
See [Microsoft's authentication setup](https://learn.microsoft.com/microsoft-365/admin/security-and-compliance/set-up-multi-factor-authentication).

If web Office apps and file storage are also needed, evaluate Microsoft 365 Business Basic without Teams.
It lists AUD 8.10/user/month with annual billing or AUD 9.72 with a monthly subscription, excluding GST.
It is an upgrade within the Microsoft option, not a fourth provider.
See [Business Basic pricing](https://www.microsoft.com/en-au/microsoft-365/business/microsoft-365-business-basic).

## DNS Setup Without Website Disruption

The registrar and authoritative DNS host can be different providers.
Check the domain's nameservers before editing records.
If Netlify or another service hosts DNS, edit the records there instead of in an inactive Crazy Domains zone.
Keep the existing nameservers unless a separate DNS migration is explicitly approved.

Keep the website's A, AAAA, CNAME, redirect, and certificate validation records.
Add only the records needed for the selected email service.
Do not use a generic setup wizard that replaces the website records without review.
Do not combine unrelated providers' MX records as a backup strategy.

| Record                            | Purpose                                                  | Setup approach                                                       |
| --------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| Verification TXT                  | Proves domain ownership                                  | Copy the value from the chosen account                               |
| MX                                | Routes incoming email                                    | Use the chosen provider's exact hostnames and priorities             |
| SPF TXT                           | Authorises sending services                              | Maintain one SPF record per sending domain; merge legitimate senders |
| DKIM TXT or CNAME                 | Authenticates outgoing mail                              | Publish the provider's generated selector records; activate signing  |
| DMARC TXT at `_dmarc`             | Sets the authentication policy and reporting destination | Start with monitoring; strengthen the policy after all senders pass  |
| Optional client discovery records | Supports email client setup                              | Add only records the selected provider requires                      |

Do not copy example DNS values from this plan.
Use account-specific instructions.
SPF and DKIM must also cover authorised shop notification services where those services send from the domain.
DMARC needs alignment with the message's From domain.
See [Google's sender authentication guidance](https://support.google.com/mail/answer/81126).

For Titan, use [its MX and TXT setup guide](https://support.titan.email/hc/en-us/articles/35326554983193-Setup-Titan-MX-and-TXT-records-for-Crazy-Domains) and [DKIM instructions](https://support.titan.email/hc/en-us/articles/900006699683-Set-up-DKIM-Record).
For Microsoft, use [the custom-domain setup guide](https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain).

## Rollout Checklist

- [ ] Confirm the exact purchased domain and all other owned domains.
- [ ] Resolve the current `.com` versus `.com.au` references before choosing public email addresses.
- [ ] Confirm existing mailboxes, forwarding rules, and any mail that needs migration.
- [ ] Confirm the required users, aliases, preferred client, and storage.
- [ ] Obtain the chosen provider's total price, renewal quote, and tax treatment.
- [ ] Confirm two-factor authentication and a workable alias reply flow before purchase.
- [ ] Obtain approval for the subscription and DNS changes.
- [ ] Export the current DNS zone and record existing mail settings.
- [ ] Protect registrar and email admin accounts with two-factor authentication.
- [ ] Keep an external recovery address that does not depend on the new domain email.
- [ ] Create the new mailboxes and aliases before changing MX records.
- [ ] Verify domain ownership through the provider's TXT record.
- [ ] Prepare SPF, DKIM, and monitoring-only DMARC for all legitimate senders.
- [ ] Lower the MX record's TTL in advance if migration timing requires it.
- [ ] Back up existing mail; arrange the migration if an old service exists.
- [ ] Replace old MX records with the chosen provider's required records.
- [ ] Keep the old mail service active until propagation and migration checks pass.
- [ ] Test incoming mail from unrelated Gmail and Outlook accounts.
- [ ] Test outgoing mail and replies from each alias.
- [ ] Inspect message headers for SPF, DKIM, and DMARC results.
- [ ] Test phone access, attachments, spam filtering, and recovery.
- [ ] Verify that the website and HTTPS still work after DNS changes.
- [ ] Check mail in both services during the migration window.
- [ ] Complete a final mail synchronisation before cancelling any old service.
- [ ] Review DMARC reports before moving to quarantine or reject.
- [ ] Record renewal dates, recovery details, and mailbox ownership outside the public repository.

DNS caches can delay the change.
Provider guides allow up to 24-48 hours in some cases.
If receiving fails, restore the saved MX records at the authoritative DNS host.
Keep the previous service available for rollback.
Changing MX does not move historical mail or guarantee immediate rollback across caches.
Keep legitimate old senders authorised until the migration ends.
Avoid deleting unrelated TXT records.

## Website and Shop Follow-Up

Custom-domain email does not require a React code change.
After delivery tests pass, publish the chosen contact address in the approved site locations.
Do not assume that a mailbox makes the current Contact form work.
`src/pages/Contact.tsx` does not send a message today.

Keep any future form submission on a hosted service.
Never put mailbox passwords, SMTP credentials, or private mail API keys in frontend code or Vite environment variables.
Use the form service's authenticated sender and the visitor's address as Reply-To.
Give automated shop receipts to the selected shop provider.
Authenticate its sender domain separately when its instructions require it.

Do not use a normal mailbox for bulk marketing.
Choose a separate email marketing service if newsletters are required.
Its sending limits, subscription charges, and consent workflow need a separate decision.

## Maintenance and Approval

Review access, storage usage, authentication reports, and renewal dates regularly.
Test recovery and a mail export before relying on the service for business records.
Decide whether a separate backup service is needed.
Do not assume a retention feature is a complete backup.

This plan leaves the shop plan and unfinished sitemap changes intact.
No account, subscription, DNS record, or website contact address was changed for this research.
