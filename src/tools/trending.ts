import { TrendingArgs, TrendingResponse, isValidTrendingArgs } from '../types.js';
import { makeRequest } from '../api.js';
import { formatError } from '../utils.js';
import { API_CONFIG } from '../config.js';
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * Implementation of the trending tool
 */
export async function handleTrending(args: unknown) {
  if (!isValidTrendingArgs(args)) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Invalid trending arguments"
    );
  }

  try {
    const response = await makeRequest<TrendingResponse>(
      API_CONFIG.ENDPOINTS.TRENDING,
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
        text: `Trending API error: ${formatError(error)}`
      }],
      isError: true
    };
  }
} 