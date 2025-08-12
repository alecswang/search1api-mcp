import { NewsArgs, NewsResponse, isValidNewsArgs } from '../types.js';
import { makeRequest } from '../api.js';
import { formatError } from '../utils.js';
import { API_CONFIG } from '../config.js';
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * Implementation of the news search tool
 */
export async function handleNews(args: unknown) {
  console.error("Entered handleNews with args:", JSON.stringify(args));

  if (!isValidNewsArgs(args)) {
    console.error("Invalid news search arguments:", JSON.stringify(args));
    throw new McpError(
      ErrorCode.InvalidParams,
      "Invalid news search arguments"
    );
  }

  try {
    console.error("Sending request to News API with query:", (args as NewsArgs).query);
    const response = await makeRequest<NewsResponse>(
      API_CONFIG.ENDPOINTS.NEWS,
      args
    );
    console.error("Received response from News API:", JSON.stringify(response, null, 2));
    
    const result = {
      content: [{
        type: "text",
        mimeType: "application/json",
        text: JSON.stringify(response.results, null, 2)
      }]
    };
    console.error("Returning result from handleNews:", JSON.stringify(result));
    return result;
    
  } catch (error) {
    console.error("News search error:", error);
    const errorResult = {
      content: [{
        type: "text",
        mimeType: "text/plain",
        text: `News API error: ${formatError(error)}`
      }],
      isError: true
    };
    console.error("Returning error from handleNews:", JSON.stringify(errorResult));
    return errorResult;
  }
}