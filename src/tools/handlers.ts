import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { handleSearch } from './search.js';
import { handleCrawl } from './crawl.js';
import { handleSitemap } from './sitemap.js';
import { handleNews } from './news.js';
import { handleReasoning } from './reasoning.js';
import { handleTrending } from './trending.js';
import { SEARCH_TOOL, CRAWL_TOOL, SITEMAP_TOOL, NEWS_TOOL, REASONING_TOOL, TRENDING_TOOL } from './index.js';

/**
 * Dispatch request based on tool name
 * @param toolName Name of the tool
 * @param args Tool parameters
 * @returns Tool processing result
 */
export async function handleToolCall(toolName: string, args: unknown) {
  console.error(`Handling tool call: ${toolName} with args: ${JSON.stringify(args)}`);

  switch (toolName) {
    case SEARCH_TOOL.name:
      console.error("Dispatching to Search handler");
      return await handleSearch(args);

    case CRAWL_TOOL.name:
      console.error("Dispatching to Crawl handler");
      return await handleCrawl(args);

    case SITEMAP_TOOL.name:
      console.error("Dispatching to Sitemap handler");
      return await handleSitemap(args);

    case NEWS_TOOL.name:
      console.error("Dispatching to News handler");
      return await handleNews(args);

    case REASONING_TOOL.name:
      console.error("Dispatching to Reasoning handler");
      return await handleReasoning(args);

    case TRENDING_TOOL.name:
      console.error("Dispatching to Trending handler");
      return await handleTrending(args);

    default:
      console.error(`Unknown tool: ${toolName}`);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Unknown tool: ${toolName}`
      );
  }
}