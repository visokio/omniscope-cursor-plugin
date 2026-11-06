# Omniscope

Connect Cursor to Omniscope Cloud for data preparation, visual workflows, analytics and interactive reporting.

## Local plugin testing

Clone this repository, then copy **the contents of this directory** (`plugins/omniscope`, including `.cursor-plugin`) to `~/.cursor/plugins/local/omniscope/`. Open a new Cursor window or reload the window so Cursor loads the local plugin. Do not copy the repository root into that folder: the root is a marketplace containing the plugin.

Use Cursor's Customize page to check the plugin and its Omniscope MCP server. Complete OAuth sign-in, then ask Cursor to list your projects. Follow the [manual test guide](../../docs/review-guide.md) before submission. Avoid enabling a second manual MCP entry for the same server while testing the plugin.

For connection-only testing, merge the contents of this directory's `mcp.json` into `.cursor/mcp.json` in a test workspace, or `~/.cursor/mcp.json` globally. This tests the connection without testing plugin discovery or its rules.

## Connection and authentication

The `mcp.json` file connects to `https://omniscope.visokio.com/_api_/v1/cloudmcp` using Streamable HTTP (`type: http` in Cursor's configuration).

Authentication uses OAuth with PKCE and Cursor's published client ID, `https://cursor.com/oauth/mcp-client.json`. No installer variable or client secret is required. The requested scopes are `projectapi:execute` and `workflowapi:execute`.

Cursor web / Cloud Agents uses the callback `https://www.cursor.com/agents/mcp/oauth/callback`. Cursor's published metadata also includes the desktop callbacks `http://localhost:8787/callback` and `http://127.0.0.1:8787/callback`.

Discovery endpoints:

- [Protected resource metadata](https://omniscope.visokio.com/.well-known/oauth-protected-resource/_api_/v1/cloudmcp)
- [Authorization server metadata](https://omniscope.visokio.com/.well-known/oauth-authorization-server)
- [Cursor MCP documentation](https://cursor.com/docs/mcp)

## Troubleshooting

- **Account not activated for AI apps:** contact support@visokio.com.
- **Sign-in fails:** reconnect the MCP server and sign in with your AI-enabled Omniscope account. Contact support@visokio.com if you need help.
- **No tools or projects:** check the MCP connection, sign-in, account enablement and project permissions. Start with project discovery.
- **Execution fails:** inspect the actual error, source credentials, block configuration and connections. Report failure without claiming fresh results.
- **Local file missing:** make the file accessible through a supported source or upload tool; the remote server cannot read arbitrary local workspace paths.

## Tools and behaviour

Available tools come from the live server and can change. Examples from the original Omniscope submission include `list_projects`, `list_project_templates`, `create_project`, `project_get_workflow`, `project_list_blocks`, `project_describe_block`, `project_describe_block_type`, `project_execute_workflow` and `project_get_block_output`.

Use the live schemas for arguments and identifiers. The included Omniscope rule guides discovery, workflow changes, execution and reporting. No local commands or automatic hooks are installed.

[Support](https://help.visokio.com/support/home) · [Privacy](https://visokio.com/omniscope-cloud-saas-privacy-policy/) · [Terms](https://visokio.com/omniscope-cloud-saas-terms-and-conditions-tc/)
