# Review and release guide

## Current authentication blocker — 2026-11-06

The MCP endpoint is reachable and an unauthenticated initialize request correctly returns HTTP 401 with protected-resource metadata. The resource and authorization-server metadata are reachable and advertise PKCE, public-client authentication and the two requested scopes, but no dynamic registration endpoint.

Cursor's confirmed web authorization request uses client ID `https://cursor.com/oauth/mcp-client.json` and callback `https://www.cursor.com/agents/mcp/oauth/callback`. Both have now been enabled in Omniscope. The actual Cursor web flow still returns `invalid_client / The client's metadata document could not be used` before sign-in.

The Omniscope application log at 2026-11-06T11:44:52.161Z reports:

```text
Client metadata document https://cursor.com/oauth/mcp-client.json refused: could not be fetched: IOException malformed response headers
```

This identifies a failure in the server's outbound HTTP fetch of Cursor metadata, before JSON validation. It does not identify the exact malformed header or prove a header-size limit. Fix that downloader and retry; retain the current client ID and web callback. The plugin uses the published client ID directly and requires no client secret or installer variable. No server source or OAuth administration is included in this repository.

Desktop authentication remains unverified. Enable the actual desktop callback separately and test it; Cursor's metadata lists both `http://localhost:8787/callback` and `http://127.0.0.1:8787/callback`.

Do not submit as fully tested until setup and the authenticated checks below pass.

## Before submission

1. Run both validation scripts from the repository root.
2. Load `plugins/omniscope` as a local Cursor plugin, as documented in its README.
3. After the metadata download fix, sign in from Cursor with an AI-enabled Omniscope Cloud test account containing sample projects and a template with built-in demo data. Keep reviewer credentials out of this public repository; supply access privately through the review process if requested.
4. Confirm the live tools appear and complete the cases below. Record the Cursor version and actual outcomes. These are test instructions, not a record of passed authenticated tests.
5. Submit the public repository URL at https://cursor.com/marketplace/publish. Copy the listing from `marketplace-listing.md`. Cursor's team reviews submissions; pushing this repository does not publish the listing.

## Authentication checks

Confirm desktop sign-in, consent and return to Cursor. If distributing to web/Cloud Agents, test that surface separately. Verify only authorized projects are visible, reconnect after sign-out, and verify refresh behaviour if the server issues refresh tokens. Metadata discovery and an unauthenticated 401 response do not verify token exchange or authenticated tools.

## Positive cases

### 1. Project discovery

Setup: Project discovery. Sign in with the dedicated reviewer account containing sample projects. Read-only case; do not create, configure, remove, or execute anything.

Prompt: Show me the Omniscope projects I can access, with links to open them.

Tools (use live schemas): list_projects

Expected: List only projects returned for the authenticated reviewer account, preserving their names and returned project links. Do not invent projects or links; explain if none are returned.

### 2. Template discovery

Setup: Template discovery. Use the reviewer account. Read-only case; choose no template and create no project.

Prompt: What Omniscope project templates are available to me, and what are they for?

Tools (use live schemas): list_project_templates

Expected: Call list_project_templates and summarize available templates from returned metadata. Preserve returned identifiers and names; do not claim capabilities absent from the results.

### 3. Project creation

Setup: Project creation. First run template discovery. Select a returned template with built-in demo data and no external credentials. Ensure Review Test Submission does not already exist; use a fresh sample workspace or remove prior test artifacts manually. Approve the requested creation confirmation.

Prompt: Create a project called Review Test Submission using an available template with built-in demo data, and give me its link.

Tools (use live schemas): list_project_templates, create_project

Expected: Discover an available demo-data template and call create_project with the requested project name and actual template identifier, matching the live schema. Respect confirmation requirements. Return the created project link from the response. If no eligible template exists, ask for a suitable fixture rather than fabricating success; this case is then blocked until setup is supplied.

### 4. Workflow explanation

Setup: Workflow explanation. Continue after successful project creation, retaining the exact project identifier returned in that conversation. Do not change or execute the workflow.

Prompt: Explain the workflow in Review Test Submission: which blocks are connected and what each step does.

Tools (use live schemas): project_get_workflow, project_list_blocks; project_describe_block and project_describe_block_type when details are needed

Expected: Use the exact created project identifier in project arguments. Explain blocks and connections from returned workflow metadata; fetch block/type details when needed. Do not invent lineage or alter the project.

### 5. Execution and output inspection

Setup: Execution and output inspection. Continue with the created demo-data project. Identify a connected output block from workflow metadata. Approve execution if requested; use a fixture without email, database writes, or other external outputs.

Prompt: Run the demo workflow in Review Test Submission and show me the output of its final data block.

Tools (use live schemas): project_get_workflow or project_list_blocks to identify the output block, project_execute_workflow, project_get_block_output

Expected: Use the exact project and actual final data-block identifiers from prior responses. Execute the workflow and inspect the resulting block output. Show returned rows, fields and counts only where supplied; report real execution errors without claiming success. Make no external writes beyond the authorized sample workflow.

## Capability boundaries

- Prompt: Buy an Omniscope subscription for me and charge my card.
  Expected: Unsupported purchase. No Omniscope tool should be invoked for buying a license; explain the plugin cannot make purchases and direct the user to official support or the website without inventing a checkout result.

- Prompt: Create a new Omniscope Cloud user for my colleague and make them an administrator.
  Expected: Unsupported account administration. The supplied tool contract contains no user-admin capabilities. Do not invoke project tools, change access, or claim an account was created; explain the limitation and direct the user to the appropriate administrator.

- Prompt: Edit the Omniscope plugin source code, commit the changes to its GitHub repository, and deploy a new connector version.
  Expected: Unsupported plugin source editing. The connector manages Omniscope projects, not the plugin Git repository. Do not invoke Omniscope tools or claim a commit or deployment; explain that repository access and a separate development workflow are required.

For the repository-editing case, evaluate only the Omniscope connector's capabilities. Cursor may use separately authorized GitHub or development tools; the Omniscope connector itself does not edit or deploy plugin source.

## Evidence to retain privately

Record plugin commit, Cursor version, test date, account enablement, each case's outcome and any errors. Capture a Cursor-specific demo if requested. Remove disposable review projects only with authorization.
