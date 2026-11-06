# Omniscope for Cursor

Data to insight. Yours to own.

Connect Cursor to [Omniscope](https://visokio.com) to prepare and analyse data, build visual workflows, inspect results and create interactive reports through conversation. Keep an editable Omniscope project whose sources, transformations and outputs you can inspect and reuse.

## What you can do

- Discover accessible projects and available project templates.
- Combine supported data sources, clean and transform data, and build visual ETL workflows.
- Inspect and edit workflow blocks, connections and configuration.
- Run workflows, inspect block outputs and investigate unexpected results.
- Create interactive reports and open projects in Omniscope to explore and refine them.

Connectors, blocks and reporting features depend on your account, permissions and server configuration. Discover the live tools and schemas before using them.

## Release status

Package validation passes. Marketplace submission is pending a server-side OAuth metadata download fix and authenticated testing in Cursor. See the [release guide](docs/review-guide.md) for the observed authentication failures and required setup.

## Requirements and installation

Requires an Omniscope Cloud account enabled for AI-agent access. Contact [support@visokio.com](mailto:support@visokio.com) to request enablement.

After marketplace approval, open **Customize** in Cursor, find **Omniscope**, select **Install**, and choose the appropriate scope. Enable the Omniscope MCP server and complete the Omniscope OAuth sign-in when prompted.

The connection uses the hosted Omniscope Cloud MCP server. No local server, API key or client secret is bundled. See the [plugin setup guide](plugins/omniscope/README.md) for local testing, authentication and troubleshooting.

## Try asking

- “Show me the Omniscope projects I can access, with links to open them.”
- “Combine my sales files, clean the data and build an interactive report with revenue, margin and regional trends.”
- “Join customers and renewals, identify renewals due in the next 90 days and build a report filterable by owner.”
- “Investigate why my workflow loses rows. Trace the transformations and show which step changes the record count.”

Make source files available to Omniscope using the live tools or supported connectors; files in the local Cursor workspace are not automatically uploaded.

## Repository and validation

This repository follows Cursor's multi-plugin template layout and registers one plugin at `plugins/omniscope`. The root `.cursor-plugin/marketplace.json` points to its manifest. The template's demonstration plugins, hooks and scripts have been removed.

Run from the repository root with Node.js:

```bash
node scripts/validate-template.mjs
node scripts/validate-omniscope.mjs
```

The first script is retained from [Cursor's template](https://github.com/cursor/plugin-template). Its warning about absent hooks is expected: this plugin needs no hooks. The second checks Omniscope's MCP connection and metadata. Neither performs authenticated end-to-end testing.

- [Marketplace submission copy](docs/marketplace-listing.md)
- [Manual smoke tests and release checklist](docs/review-guide.md)
- [Changelog](CHANGELOG.md)

## Support and policies

Built by Visokio, the creators of Omniscope.

- [Support](https://help.visokio.com/support/home)
- [Privacy policy](https://visokio.com/omniscope-cloud-saas-privacy-policy/)
- [Terms and conditions](https://visokio.com/omniscope-cloud-saas-terms-and-conditions-tc/)

The plugin can change and execute Omniscope projects within your permissions. Execution can trigger external writes configured in a workflow; inspect its outputs before running unfamiliar projects. The plugin does not provide account administration or purchases.
