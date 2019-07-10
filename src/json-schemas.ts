import { schemas as jsonSchemas } from '@0x/json-schemas';

import * as fillSchema from './schemas/fill_schema.json';
import * as marketStatsSchema from './schemas/market_stats_schema.json';
import * as relayerApiMarketsFillsPairByAddressResponseSchema from './schemas/relayer_api_markets_fills_pairs_by_address_response_schema.json';
import * as relayerApiMarketsFillsPairResponseSchema from './schemas/relayer_api_markets_fills_pairs_response_schema.json';
import * as relayerApiMarketsPairsStatsResponseSchema from './schemas/relayer_api_markets_pairs_stats_response_schema.json';
import * as relayerApiMarketsResponseSchema from './schemas/relayer_api_markets_response_schema.json';
import * as relayerApiMarketsSchema from './schemas/relayer_api_markets_schema.json';

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
    fillSchema,
    marketStatsSchema,
};

// We need to replace the `$ref`s to be OpenAPI compliant.
const openApiSchemas = JSON.parse(
    JSON.stringify(usedSchemas).replace(/(\/\w+)/g, match => `#/components/schemas${match}`),
);
// The json schema used by OpenAPI does not accept ids
Object.keys(openApiSchemas).forEach(key => delete openApiSchemas[key].id);

export const schemas = openApiSchemas;
