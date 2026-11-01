# Super Schema: website and README improvement review

Reviewed November 1, 2026. This is a recommendation document; it does not change the public site, repository settings, licensing, or application behavior.

## Recommendation

Prioritize a complete repository front door, a reproducible first run, and the shared control-plane message. The current visual identity, workbench screenshot, and interactive workflow are useful foundations. More animation or a broader feature list would contribute less than making the project understandable and usable from a fresh visit.

The site should explain the outcome and demonstrate it. The application README should establish what the project does, its current boundaries, and how to run and contribute to it. The website repository's maintenance README serves a different audience and should remain focused on maintaining the site.

## Benchmarks and useful patterns

These are established projects chosen for relevant product and documentation patterns, not a measured ranking. Their popularity, customer adoption, and production claims are not evidence about Super Schema.

| Reference | Observed pattern | Application to Super Schema |
| --- | --- | --- |
| [Supabase site](https://supabase.com/) and [README](https://github.com/supabase/supabase/blob/master/README.md) | Clear category, concrete capabilities, dashboard imagery, examples, and distinct documentation/support routes. | Name the category immediately; connect each promise to an example or documentation. Show the actual product before adding more conceptual visuals. |
| [TypeSpec site](https://typespec.io/) and [README](https://github.com/microsoft/typespec/blob/main/README.md) | Input and output shown together; prominent install/playground paths; a usage exercise connects a model to compilation and a named artifact. | Make logical-to-physical decisions inspectable. Give the reader a complete exercise with a defined result. |
| [DataHub site](https://datahubproject.io/) and [README](https://github.com/datahub-project/datahub/blob/master/README.md) | Business meaning, ownership, and governance accompany technical capabilities. Demo, tour, quickstart, and deployment paths are discoverable. | Bring collaboration into the main story, show where Super Schema sits in the stack, and distinguish its modeled references from runtime discovery. |
| [Prisma ORM README](https://github.com/prisma/orm/blob/main/README.md) | Prerequisites and maturity are explicit; supported systems and getting-started paths are distinguished; contribution/security routes are available. | Publish an honest capability matrix and separate trying the app from developing it. The former prisma/prisma URL currently redirects to prisma/orm. |

These observations compare the published material. The benchmark projects were not installed or tested.

## Confirmed gaps in Super Schema

1. **No application README.** The local tracked tree and the public repository's README API contain no root README. This is a missing entry point, rather than an existing README that needs polishing. See the [application repository](https://github.com/super-schema/super-schema).
2. **Repository identity is incomplete.** GitHub reports description `super schema builder`, no homepage, no topics, no detected license, and Discussions disabled. Issues are enabled. No root license appeared in the checked tree. This records repository state, not a legal assessment. A maintainer must choose the intended licensing before a license badge or licensing promise is added.
3. **The hero understates the agreed positioning.** [The homepage](https://super-schema.github.io/) opens with “One model. Many schemas.” and a description focused on reuse. Collaboration and governance appear deeper in the workflow and feature sections. A visitor can reasonably understand the project primarily as a schema generator.
4. **The getting-started journey stops before first success.** [The guide](https://super-schema.github.io/get-started.html#source) provides clone commands and prerequisites, then links to developer testing/database documents. It does not provide a complete setup, first-login path, and first generated artifact.
5. **Setup has a concrete dependency gap.** [package.json](https://github.com/super-schema/super-schema/blob/main/package.json) references five sibling TypeSpec emitter packages through `file:../typespec/packages/...`. [The testing prerequisites](https://github.com/super-schema/super-schema/blob/main/docs/testing/e2e.md#ci-prerequisites-what-npm-ci-needs-on-a-runner) describe building that sibling checkout, but use a placeholder repository URL in their example. [The database guide](https://github.com/super-schema/super-schema/blob/main/docs/database.md) opens with a zero-config database quickstart that does not explain those emitter prerequisites. Database convenience does not make the complete application installation self-contained.
6. **Compatibility information is scattered.** The homepage lists formats and labels previews, but a reader still needs a compact view of generation, import, required packages, version support, and known limitations. These are different capabilities and need separate columns.
7. **Project participation and maturity are hard to discover.** The homepage navigation/footer offer the workflow, features, guide, and source. They do not expose contribution instructions, project status, release notes, a roadmap, or a security-reporting path. Add working destinations before adding navigation to them.

## Proposed positioning

Suggested hero:

> **Shared meaning. Consistent implementation.**
>
> Bring product, governance, and engineering into one modeling workspace. Define field meaning, ownership, and logical types together, then review how those decisions map into schemas, API contracts, events, and database definitions.

Primary action: **Get started**. Secondary action: **Explore the workflow**. Keep GitHub visible in the header. Until there is an actual hosted app, do not label a static illustration “Try the app.”

Use “a shared control plane for data definitions” as the category explanation. Present the broader enterprise control-plane ambition separately from implemented guarantees. Administrative controls, approvals, and governance features should be described at their actual supported granularity.

Two supporting messages:

- **Agree before implementation:** product and business describe meaning; governance records standards; engineering makes physical mappings explicit.
- **Follow the definition through its representations:** inspect references, field descriptions, optionality, target types, and version choices in one connected workflow.

Do not promise that all physical formats have identical type systems. Consistency means preserving meaning through explicit mappings, reviewing precision and nullability, and making exceptions visible. Preventing quality issues is an intended benefit, not an absolute guarantee.

## Website improvements, in order

| Priority | Change | Completion criterion |
| --- | --- | --- |
| First | Replace the generator-focused hero with the shared-workspace story above. | The first screen identifies the audience, shared decisions, and implementation outcome; the same category appears in metadata and README. |
| First | Complete a self-hosted quickstart. | A clean environment can follow exact prerequisites, dependency sources/versions, install commands, configuration, first-user setup, and startup URL to a visible Customer entity and one generated artifact. Record what environment was actually tested. |
| First | Add a concise product tour near the top. | A real recording or screenshot sequence shows modeling, governance metadata, references, target inspection, and publishing. Use synthetic data and distinguish real UI from conceptual diagrams. |
| Next | Add an explicit consistency example to the existing workflow. | A selected field shows its description, logical type, target representation, optionality, and relevant constraints. A deliberate mismatch explains what the user should review. Reuse the existing interaction rather than adding a second large demo. |
| Next | Publish a support matrix. | Each target separates import, generation, stability/preview status, emitter prerequisites, and important limits. Derive current claims from the actual target/import catalogs; do not infer import support from generation support. |
| Next | Add a short “Where it fits” section and FAQ. | Explain the relationship to TypeSpec, API/schema registries, metadata catalogs, and migration tools. Address self-hosting, data location, governance intent, modeled lineage, and generated artifacts. |
| Later | Add contribution, project status, release notes, and roadmap links. | Destinations exist, describe current reality, and link back to docs/source. Use real releases and verified CI badges. |

For an eventual API → event → analytics → reporting illustration, label each node as an implemented capability, a declared external relationship, or a proposed future view. A reporting endpoint in a diagram must not imply an existing report connector or automatic field-level runtime lineage.

Suggested homepage order: outcome and example → shared decisions → current interactive workflow → real workbench tour → supported capabilities → where it fits and limitations → quickstart → project/community links. Preserve the current lightweight implementation, accessible controls, and progressive enhancement.

## Application README structure

1. **Logo, name, category, and primary links.** Website, walkthrough, quickstart, and documentation.
2. **Actual workbench screenshot.** Short caption explaining the task and synthetic data.
3. **Why it exists.** Field meaning, ownership, governance metadata, and consistent logical-to-physical implementation.
4. **One end-to-end example.** Customer with a required identifier and optional email; inspect intent, declare an API/event reference, generate an artifact, then publish and deliberately update a pin. Name the output file and expected result.
5. **Quickstart.** Prerequisites first, exact commands second, first-user access and startup URL third, first successful task last. Document sibling emitter dependencies until a reproducible package/distribution replaces them.
6. **Supported capabilities.** Compact target matrix, preview labels, limitations, and links to detailed docs. Distinguish available features from roadmap items.
7. **How it works and deployment.** Small architecture diagram, TypeSpec's role, PGlite/PostgreSQL choices, and links for configuration, backup, upgrades, and production operations where those guides exist.
8. **Project status and participation.** Verified release/test status, issues, contribution workflow, private security-reporting instructions, roadmap, and maintainer-selected license.

Suggested opening paragraph:

> Super Schema is a shared workspace for data definitions. Product, governance, and engineering teams can document meaning, ownership, and logical types together, connect entities to API and event contracts, and review generated physical schemas and published versions.

Suggested repository description: **Shared data modeling, governance metadata, and schema generation across APIs, events, and databases.**

Set the repository homepage to `https://super-schema.github.io/`. Consider accurate topics such as `data-modeling`, `schema`, `typespec`, `data-governance`, `json-schema`, `openapi`, and `asyncapi`; avoid adding topics for unsupported integrations.

## Delivery sequence and limits

First make the README, setup path, and metadata coherent. Resolve the licensing choice and document the actual dependency source. Then update the hero, tour, matrix, and FAQ together so the site and repository tell the same story. Improve distribution to remove the sibling-checkout requirement as a separate engineering change, with a clean-install check.

Do not add customer logos, performance claims, a production-ready badge, an invented community channel, or future capabilities as if they shipped. Do not choose a license as a design task. Do not replace the site's design system or add dependencies for this content work.

This review did not run a fresh application installation, test licensing suitability, perform a performance/accessibility audit, or verify every supported target. The clean-install journey and current feature matrix need their own implementation checks before publication. No application code or public pages changed during this review.
