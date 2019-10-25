import { schemas as jsonSchemas } from '@0x/json-schemas';

import * as assetsCMCSchema from './schemas/assets_cmc_schema.json';
import * as fillSchema from './schemas/fill_schema.json';
import * as tokenTradeSchema from './schemas/token_trade_schema.json';
import * as fillTradeSchema from './schemas/fill_trade_schema.json';
import * as historyTradeSchema from './schemas/history_trade_schema.json';
import * as marketBaseTradeSchema from './schemas/market_base_trade_schema.json';
import * as marketStatsSchema from './schemas/market_stats_schema.json';
import * as marketTradeSchema from './schemas/market_trade_schema.json';
import * as orderTradeSchema from './schemas/order_trade_schema.json';
import * as orderbookCMCSchema from './schemas/orderbook_cmc_schema.json';
import * as relayerApi0xMarketHistoryResponse from './schemas/relayer_api_0x_market_history_response_schema.json';
import * as relayerApi0xMarketStatsResponse from './schemas/relayer_api_0x_market_stats_response_schema.json';
import * as relayerApi0xMarketTickerResponse from './schemas/relayer_api_0x_market_ticker_response_schema.json';
import * as relayerApi0xMarketsListResponseSchema from './schemas/relayer_api_0x_markets_list_response_schema.json';
import * as relayerApi0xTokensListResponseSchema from './schemas/relayer_api_0x_tokens_list_response_schema.json';
import * as relayerApiMarketsFillsPairByAddressResponseSchema from './schemas/relayer_api_markets_fills_pairs_by_address_response_schema.json';
import * as relayerApiMarketsFillsPairResponseSchema from './schemas/relayer_api_markets_fills_pairs_response_schema.json';
import * as relayerApiMarketsPairsStatsResponseSchema from './schemas/relayer_api_markets_pairs_stats_response_schema.json';
import * as relayerApiMarketsResponseSchema from './schemas/relayer_api_markets_response_schema.json';
import * as relayerApiMarketsSchema from './schemas/relayer_api_markets_schema.json';
import * as statsTradeSchema from './schemas/stats_trade_schema.json';
import * as tickerCMCSchema from './schemas/ticker_cmc_schema.json';
import * as tickerTradeSchema from './schemas/ticker_trade_schema.json';
import * as tradeCMCSchema from './schemas/trade_cmc_schema.json';

import * as relayerApi0xAccountFillsResponse from './schemas/relayer_api_0x_accounts_fills_response_schema.json';
import * as relayerApi0xAccountOrdersResponse from './schemas/relayer_api_0x_accounts_orders_response_schema.json';
import * as relayerApi0xMarketBookResponse from './schemas/relayer_api_0x_market_book_response_schema.json';
import * as relayerApi0xMarketFillsResponse from './schemas/relayer_api_0x_market_fills_response_schema.json';
import * as relayerApi0xMarketOrderMarketResponse from './schemas/relayer_api_0x_markets_order_market_response_schema.json';

import * as relayerApiCMCAssetsListResponse from './schemas/relayer_api_cmc_assets_list_response_schema.json';
import * as relayerApiCMCTickerListResponse from './schemas/relayer_api_cmc_ticker_list_response_schema.json';
import * as relayerApiCMCTradesListResponse from './schemas/relayer_api_cmc_trades_list_response_schema.json';

import * as  markets0XOrderLimitBodySchema from './schemas/markets_0x_order_limit_body_schema.json';
import * as  markets0XOrderMarketBodySchema from './schemas/markets_0x_order_market_body_schema.json';

// Only include schemas we actually need
const {
    wholeNumberSchema,
    numberSchema,
    addressSchema,
    hexSchema,
    orderHashSchema,
    orderSchema,
    signedOrderSchema,
    signedOrdersSchema,
    ordersSchema,
    paginatedCollectionSchema,
    relayerApiErrorResponseSchema,
    relayerApiFeeRecipientsResponseSchema,
    relayerApiOrderSchema,
    relayerApiOrdersSchema,
    relayerApiOrderConfigPayloadSchema,
    relayerApiOrderConfigResponseSchema,
    relayerApiOrderbookResponseSchema,
    relayerApiAssetDataPairsResponseSchema,
    relayerApiAssetDataTradeInfoSchema,
    relayerApiOrdersChannelSubscribeSchema,
    relayerApiOrdersChannelSubscribePayloadSchema,
    relayerApiOrdersChannelUpdateSchema,
    relayerApiOrdersResponseSchema,
    relayerApiAssetDataPairsSchema,
} = jsonSchemas;

const usedSchemas = {
    wholeNumberSchema,
    numberSchema,
    addressSchema,
    hexSchema,
    orderHashSchema,
    orderSchema,
    signedOrderSchema,
    signedOrdersSchema,
    ordersSchema,
    tokenTradeSchema,
    fillSchema,
    fillTradeSchema,
    marketStatsSchema,
    marketBaseTradeSchema,
    assetsCMCSchema,
    historyTradeSchema,
    marketTradeSchema,
    orderTradeSchema ,
    statsTradeSchema ,
    tickerCMCSchema ,
    tickerTradeSchema ,
    tradeCMCSchema ,
    orderbookCMCSchema,
    paginatedCollectionSchema,
    relayerApiErrorResponseSchema,
    relayerApiFeeRecipientsResponseSchema,
    relayerApiOrderSchema,
    relayerApiOrdersSchema,
    relayerApiOrderConfigPayloadSchema,
    relayerApiOrderConfigResponseSchema,
    relayerApiOrderbookResponseSchema,
    relayerApiAssetDataPairsResponseSchema,
    relayerApiAssetDataTradeInfoSchema,
    relayerApiOrdersChannelSubscribeSchema,
    relayerApiOrdersChannelSubscribePayloadSchema,
    relayerApiOrdersChannelUpdateSchema,
    relayerApiOrdersResponseSchema,
    relayerApiAssetDataPairsSchema,
    relayerApiMarketsFillsPairByAddressResponseSchema,
    relayerApiMarketsFillsPairResponseSchema,
    relayerApiMarketsPairsStatsResponseSchema,
    relayerApiMarketsResponseSchema,
    relayerApiMarketsSchema,
    relayerApi0xTokensListResponseSchema,
    relayerApi0xMarketsListResponseSchema,
    relayerApi0xMarketTickerResponse,
    relayerApi0xMarketStatsResponse,
    relayerApi0xMarketHistoryResponse,
    relayerApi0xMarketFillsResponse,
    relayerApi0xMarketBookResponse,
    relayerApi0xMarketOrderMarketResponse,
    relayerApi0xAccountFillsResponse,
    relayerApi0xAccountOrdersResponse,
    relayerApiCMCAssetsListResponse,
    relayerApiCMCTickerListResponse,
    relayerApiCMCTradesListResponse,
    markets0XOrderLimitBodySchema,
    markets0XOrderMarketBodySchema,
};

// We need to replace the `$ref`s to be OpenAPI compliant.
const openApiSchemas = JSON.parse(
    JSON.stringify(usedSchemas).replace(/(\/\w+)/g, match => `#/components/schemas${match}`),
);


// The json schema used by OpenAPI does not accept ids
Object.keys(openApiSchemas).forEach(key => delete openApiSchemas[key].id);

export const schemas = openApiSchemas;
