import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { log } from '../utils.js';
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
  log(`Handling tool call: ${toolName}`);

  switch (toolName) {
    case SEARCH_TOOL.name:
      return await handleSearch(args);
      
    case CRAWL_TOOL.name:
      return await handleCrawl(args);
      
    case SITEMAP_TOOL.name:
      return await handleSitemap(args);
      
    case NEWS_TOOL.name:
      return await handleNews(args);
      
    case REASONING_TOOL.name:
      return await handleReasoning(args);

    case TRENDING_TOOL.name:
      return await handleTrending(args);
      
    default:
      log(`Unknown tool: ${toolName}`);
      throw new McpError(
        ErrorCode.InvalidParams,
        `Unknown tool: ${toolName}`
      );
  }
}