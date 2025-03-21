import { SearchArgs, SearchResponse, isValidSearchArgs } from '../types.js';
import { makeRequest } from '../api.js';
import { formatError } from '../utils.js';
import { API_CONFIG } from '../config.js';
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * Implementation of the search tool
 */
export async function handleSearch(args: unknown) {
  if (!isValidSearchArgs(args)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Invalid search arguments"
    );
  }

  try {
    const response = await makeRequest<SearchResponse>(
      API_CONFIG.ENDPOINTS.SEARCH,
      args  
    );

    return {
      content: [{
        type: "text",
        mimeType: "application/json",
        text: JSON.stringify(response.results, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: "text",
        mimeType: "text/plain",
        text: `Search API error: ${formatError(error)}`
      }],
      isError: true
    };
  }
}