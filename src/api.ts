import { OpenApiSpec } from '@loopback/openapi-v3-types';

import { examples } from './examples';
import { schemas } from './json-schemas';
import { md } from './md';
import { generateParameters } from './parameters';
import { generateResponses } from './responses';

export const api: OpenApiSpec = {
    openapi: '3.0.0',
    info: {
        version: '2.0.1',
        title: 'VeriDex Api',
        description: md.introduction,
        contact: {
            name: 'API Support',
            url: 'http://www.verisafe.io',
            email: 'dev@verisafe.io',
        },
    },
    tags: [
        {
            name: 'SRA',
            description: 'Standard Relayer Api',
        },
        {
            name: 'CHART',
            description: 'API for feed charts like Trading View',
        },
        {
            name: 'MARKET',
            description: 'Market api v3',
        },
        {
            name: 'FEED',
            description: 'Feed api almost compatible with Radar/Bamboo relays',
        },
        {
            name: 'TRADE',
            description: 'Trade api almost compatible with Radar/Bamboo relays',
        },
        {
            name: 'ACCOUNTS',
            description: 'Accounts api almost compatible with Radar/Bamboo relays',
        },
    ],
    servers: [{
        url: 'https://dex-backend.verisafe.io',
        description: 'Api Server',
    }],
    paths: {
        '/v3/asset_pairs': {
            get: {
                tags: ['SRA'],
                description:
                    'Retrieves a list of available asset pairs and the information required to trade them (in any order). Setting only `assetDataA` or `assetDataB` returns pairs filtered by that asset only.',
                operationId: 'getAssetPairs',
                parameters: generateParameters(
                    [
                        {
                            name: 'assetDataA',
                            in: 'query',
                            description: 'The assetData value for the first asset in the pair.',
                            example: '0xf47261b04c32345ced77393b3530b1eed0f346429d',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                        {
                            name: 'assetDataB',
                            in: 'query',
                            description: 'The assetData value for the second asset in the pair.',
                            example: '0x0257179264389b814a946f3e92105513705ca6b990',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                    ],
                    true,
                ),
                responses: generateResponses(
                    'relayerApiAssetDataPairsResponseSchema',
                    examples.relayerApiAssetDataPairsResponse,
                    `Returns a collection of available asset pairs with some meta info`,
                ),
            },
        },
        '/v3/orders': {
            get: {
                tags: ['SRA'],
                description:
                    'Retrieves a list of orders given query parameters. This endpoint should be [paginated](#section/Pagination). For querying an entire orderbook snapshot, the [orderbook endpoint](#operation/getOrderbook) is recommended. If both makerAssetData and takerAssetData are specified, returned orders will be sorted by price determined by (takerTokenAmount/makerTokenAmount) in ascending order. By default, orders returned by this endpoint are unsorted.',
                operationId: 'getOrders',
                parameters: generateParameters(
                    [
                        {
                            name: 'makerAssetProxyId',
                            in: 'query',
                            description: `The maker [asset proxy id](https://0xproject.com/docs/0x.js#types-AssetProxyId) (example: "0xf47261b0" for ERC20, "0x02571792" for ERC721).`,
                            example: '0xf47261b0',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                        {
                            name: 'takerAssetProxyId',
                            in: 'query',
                            description: `The taker asset [asset proxy id](https://0xproject.com/docs/0x.js#types-AssetProxyId) (example: "0xf47261b0" for ERC20, "0x02571792" for ERC721).`,
                            example: '0x02571792',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                        {
                            name: 'makerAssetAddress',
                            in: 'query',
                            description: `The contract address for the maker asset.`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                        {
                            name: 'takerAssetAddress',
                            in: 'query',
                            description: `The contract address for the taker asset.`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                        {
                            name: 'exchangeAddress',
                            in: 'query',
                            description: `Same as exchangeAddress in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                        {
                            name: 'senderAddress',
                            in: 'query',
                            description: `Same as senderAddress in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                        {
                            name: 'makerAssetData',
                            in: 'query',
                            description: `Same as makerAssetData in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                        {
                            name: 'takerAssetData',
                            in: 'query',
                            description: `Same as takerAssetData in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                        {
                            name: 'traderAssetData',
                            in: 'query',
                            description: `Same as traderAssetData in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                        {
                            name: 'makerAddress',
                            in: 'query',
                            description: `Same as makerAddress in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                        {
                            name: 'takerAddress',
                            in: 'query',
                            description: `Same as takerAddress in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                        {
                            name: 'traderAddress',
                            in: 'query',
                            description: `Same as traderAddress in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                        {
                            name: 'feeRecipientAddress',
                            in: 'query',
                            description: `Same as feeRecipientAddress in the [0x Protocol v3 Specification](https://github.com/0xProject/0x-protocol-specification/blob/master/v3/v3-specification.md#order-message-format)`,
                            example: '0xe41d2489571d322189246dafa5ebde1f4699f498',
                            schema: {
                                $ref: '#/components/schemas/addressSchema',
                            },
                        },
                    ],
                    true,
                ),
                responses: generateResponses(
                    'relayerApiOrdersResponseSchema',
                    examples.relayerApiOrdersResponse,
                    `A collection of 0x orders with meta-data as specified by query params`,
                ),
            },
        },
        '/v3/order/{orderHash}': {
            get: {
                tags: ['SRA'],
                description: 'Retrieves the 0x order with meta info that is associated with the hash.',
                operationId: 'getOrder',
                parameters: generateParameters(
                    [
                        {
                            name: 'orderHash',
                            in: 'path',
                            description: 'The hash of the desired 0x order.',
                            example: '0xd4b103c42d2512eef3fee775e097f044291615d25f5d71e0ac70dbd49d223591',
                            schema: {
                                $ref: '#/components/schemas/orderHashSchema',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApiOrderSchema',
                    examples.relayerApiOrder,
                    `The order and meta info associated with the orderHash`,
                ),
            },
        },
        '/v3/orderbook': {
            get: {
                tags: ['SRA'],
                description: `Retrieves the orderbook for a given asset pair. This endpoint should be [paginated](#section/Pagination). Bids will be sorted in descending order by price, and asks will be sorted in ascending order by price. Within the price sorted orders, the orders are further sorted by _taker fee price_ which is defined as the **takerFee** divided by **takerTokenAmount**. After _taker fee price_, orders are to be sorted by expiration in ascending order. The way pagination works for this endpoint is that the **page** and **perPage** query params apply to both \`bids\` and \`asks\` collections, and if \`page\` * \`perPage\` > \`total\` for a certain collection, the \`records\` for that collection should just be empty. `,
                operationId: 'getOrderbook',
                parameters: generateParameters(
                    [
                        {
                            name: 'baseAssetData',
                            in: 'query',
                            description: `assetData (makerAssetData or takerAssetData) designated as the base currency in the [currency pair calculation](https://en.wikipedia.org/wiki/Currency_pair) of price.`,
                            required: true,
                            example: '0xf47261b04c32345ced77393b3530b1eed0f346429d',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                        {
                            name: 'quoteAssetData',
                            in: 'query',
                            description: `assetData (makerAssetData or takerAssetData) designated as the quote currency in the currency pair calculation of price (required).`,
                            required: true,
                            example: '0xf47261b04c32345ced77393b3530b1eed0f346429d',
                            schema: {
                                $ref: '#/components/schemas/hexSchema',
                            },
                        },
                    ],
                    true,
                ),
                responses: generateResponses(
                    'relayerApiOrderbookResponseSchema',
                    examples.relayerApiOrderbookResponse,
                    `The sorted order book for the specified asset pair.`,
                ),
            },
        },
        '/v3/order_config': {
            post: {
                tags: ['SRA'],
                description: `Relayers have full discretion over the orders that they are willing to host on their orderbooks (e.g what fees they charge, etc...). In order for traders to discover their requirements programmatically, they can send an incomplete order to this endpoint and receive the missing fields, specifc to that order. This gives relayers a large amount of flexibility to tailor fees to unique traders, trading pairs and volume amounts. Submit a partial order and receive information required to complete the order: \`senderAddress\`, \`feeRecipientAddress\`, \`makerFee\`, \`takerFee\`. `,
                operationId: 'getOrderConfig',
                parameters: generateParameters([], false),
                requestBody: {
                    description:
                        'The fields of a 0x order the relayer may want to decide what configuration to send back.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/relayerApiOrderConfigPayloadSchema',
                            },
                            example: examples.relayerApiOrderConfigPayload,
                        },
                    },
                },
                responses: generateResponses(
                    'relayerApiOrderConfigResponseSchema',
                    examples.relayerApiOrderConfigResponse,
                    `The additional fields necessary in order to submit an order to the relayer.`,
                ),
            },
        },
        '/v3/fee_recipients': {
            get: {
                tags: ['SRA'],
                description: `Retrieves a collection of all fee recipient addresses for a relayer. This endpoint should be [paginated](#section/Pagination).`,
                operationId: 'getFeeRecipients',
                parameters: generateParameters([], true),
                responses: generateResponses(
                    'relayerApiFeeRecipientsResponseSchema',
                    examples.relayerApiFeeRecipientsResponse,
                    `A collection of all used fee recipient addresses.`,
                ),
            },
        },
        '/v3/order': {
            post: {
                tags: ['SRA'],
                description: `Submit a signed order to the relayer.`,
                operationId: 'postOrder',
                parameters: generateParameters([], false),
                requestBody: {
                    description: 'A valid signed 0x order based on the schema.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/signedOrderSchema',
                            },
                            example: examples.signedOrder,
                        },
                    },
                },
                responses: generateResponses(),
            },
        },

        '/v3/markets': {
            get: {
                tags: ['MARKET'],
                description: `List all markets with optional stats`,
                operationId: 'listMarkets',
                parameters: generateParameters([
                    {
                        name: 'include',
                        in: 'query',
                        description: `includes optional field stats on the markets list`,
                        required: false,
                        example: 'stats',
                        schema: {
                            type: 'string',
                        },
                    },
                ], true),
                responses: generateResponses(
                    'relayerApiMarketsResponseSchema',
                    examples.relayerApiMarketsResponse,
                    `Returns a collection of paginated available markets`,
                ),
            },
        },
        '/v3/markets/stats/{pair}': {
            get: {
                tags: ['MARKET'],
                description: `List markets stats per pair.`,
                operationId: 'getPairMarketStats',
                parameters: generateParameters([], false),
                responses: generateResponses(
                    'relayerApiMarketsPairsStatsResponseSchema',
                    examples.relayerApiMarketsPairsStatsResponse,
                    `Returns stats related to a pair`,
                ),
            },
        },
        '/v3/markets/{pair}/history': {
            get: {
                tags: ['MARKET'],
                description: `Get all pair history.`,
                operationId: 'getMarketPairHistory',
                parameters: generateParameters([], true),
                responses: generateResponses(
                    'relayerApiMarketsFillsPairResponseSchema',
                    examples.relayerApiMarketsFillsPairResponse,
                    `Returns a paginated collection of fills related to a pair`,
                ),
            },
        },
        '/v3/markets/{pair}/history/{address}': {
            get: {
                tags: ['MARKET'],
                description: `Get all pair history related to address`,
                operationId: 'getMarketPairHistoryByAddress',
                parameters: generateParameters([], true),
                responses: generateResponses(
                    'relayerApiMarketsFillsPairByAddressResponseSchema',
                    examples.relayerApiMarketsFillsPairByAddressResponse,
                    `Returns a paginated collection of fills related to a pair by address`,
                ),
            },
        },

        '/v3/candles/history': {
            get: {
                tags: ['CHART'],
                description: `Get candles history from a pair.`,
                operationId: 'getCandlesHistory',
                parameters: generateParameters(
                    [
                        {
                            name: 'symbol',
                            in: 'query',
                            description: `Pair to be fetched.`,
                            required: true,
                            example: 'VSF-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                        {
                            name: 'from',
                            in: 'query',
                            description: `starting timestamp date in seconds`,
                            required: true,
                            example: '1562695767',
                            schema: {
                                type: 'number',
                            },
                        },
                        {
                            name: 'to',
                            in: 'query',
                            description: `stop timestamp date in seconds.`,
                            required: true,
                            example: '1562695767',
                            schema: {
                                type: 'number',
                            },
                        },
                        {
                            name: 'resolution',
                            in: 'query',
                            description: `resolution required. Only supports daily resolution - D`,
                            required: true,
                            example: 'D',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false),
                /* responses: generateResponses(
                     'relayerApiCandlesHistoryResponseSchema',
                     examples.relayerApiCandlesHistoryResponse,
                     `Returns a  collection of candles related to a pair`,
                 ),*/
            },
        },
        '/v3/candles/config': {
            get: {
                tags: ['CHART'],
                description: `Get candles config.`,
                operationId: 'getCandlesConfig',
                parameters: generateParameters([], false),
                /* responses: generateResponses(
                     'relayerApiCandlesConfigResponseSchema',
                     examples.relayerApiCandlesConfigResponse,
                     `Returns candles config related to a pair`,
                 ),*/
            },
        },
        '/v3/candles/symbols': {
            get: {
                tags: ['CHART'],
                description: `Get candles symbols config.`,
                operationId: 'getCandlesSymbolConfig',
                parameters: generateParameters([
                    {
                        name: 'symbol',
                        in: 'query',
                        description: `Get Symbols Config`,
                        required: true,
                        example: 'VSF-WETH',
                        schema: {
                            type: 'string',
                        },
                    },

                ], false),
                /*  responses: generateResponses(
                      'relayerApiCandlesSymbolsResponseSchema',
                      examples.relayerApiCandlesSymbolsResponse,
                      `Returns symbols`,
                  ),*/
            },
        },
        '/v3/candles/time': {
            get: {
                tags: ['CHART'],
                description: `Get server time in seconds.`,
                operationId: 'getCandlesTime',
                parameters: generateParameters([], false),
                /* responses: generateResponses(
                     'relayerApiCandlesTimeResponseSchema',
                     examples.relayerApiCandlesTimeResponse,
                     `Returns server time`,
                 ),*/
            },
        },
        '/v3/candles/search': {
            get: {
                tags: ['CHART'],
                description: `Search symbols support by this relayer.`,
                operationId: 'searchSymbols',
                parameters: generateParameters([
                    {
                        name: 'symbol',
                        in: 'query',
                        description: `Pair to be search.`,
                        required: true,
                        example: 'VSF-WETH',
                        schema: {
                            type: 'string',
                        },
                    },
                    {
                        name: 'type',
                        in: 'query',
                        description: `starting timestamp date in seconds`,
                        required: false,
                        example: '1562695767',
                        schema: {
                            type: 'number',
                        },
                    },
                    {
                        name: 'exchange',
                        in: 'query',
                        description: `stop timestamp date in seconds.`,
                        required: false,
                        example: 'VeriDEX',
                        schema: {
                            type: 'number',
                        },
                    },
                    {
                        name: 'limit',
                        in: 'query',
                        description: `Amount of symbols to retrieve`,
                        required: false,
                        example: '10',
                        schema: {
                            type: 'number',
                        },
                    },
                ], false),
                /* responses: generateResponses(
                     'relayerApiCandlesSearchResponseSchema',
                     examples.relayerApiCandlesSearchResponse,
                     `Returns a collection of symbols filtered by symbol`,
                 ),*/
            },
        },
        '/v3/0x/tokens': {
            get: {
                tags: ['FEED'],
                description: `Retrieves a list of available tokens for trading. This endpoint is not paginated.`,
                operationId: 'getTokensList',
                parameters: generateParameters([], false),
                responses: generateResponses(
                    'relayerApi0xTokensListResponseSchema',
                    examples.relayerApi0xTokensListResponse,
                    `Retrieves a list of available tokens for trading`,
                ),
            },
        },
        '/v3/0x/markets': {
            get: {
                tags: ['FEED'],
                description: `Retrieves a list of available markets given query parameters.`,
                operationId: 'getMarketsList',
                parameters: generateParameters([], false),
                responses: generateResponses(
                    'relayerApi0xMarketsListResponseSchema',
                    examples.relayerApi0xMarketsListResponse,
                    `Retrieves a list of available markets`,
                ),
            },
        },
        '/v3/0x/markets/{marketId}': {
            get: {
                tags: ['FEED'],
                description: `Retrieves a single market.`,
                operationId: 'getSingleMarket',
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                        {
                            name: 'include',
                            in: 'path',
                            description: 'comma-separated list to include additional market information, valid options include base, ticker, stats, and history.',
                            example: 'base,ticker,stats,history',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'marketBaseTradeSchema',
                    examples.relayerApi0xSingleMarketsResponse,
                    `Retrieves a single market with options on include base,ticker,stats,history`,
                ),
            },
        },
        '/v3/0x/markets/{marketId}/ticker': {
            get: {
                tags: ['FEED'],
                description: `Retrieves a ticker for a single market.`,
                operationId: 'getMarketTicker',
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApi0xMarketTickerResponse',
                    examples.relayerApi0xMarketTickerResponse,
                    `Retrieves a ticker for a single market.`,
                ),
            },
        },
        '/v3/0x/markets/{marketId}/stats': {
            get: {
                tags: ['FEED'],
                description: `Retrieves stats for a single market.`,
                operationId: 'getMarketStats',
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApi0xMarketStatsResponse',
                    examples.relayerApi0xMarketStatsResponse,
                    `Retrieves stats for a single market.`,
                ),
            },
        },
        '/v3/0x/markets/{marketId}/history': {
            get: {
                tags: ['FEED'],
                description: `Retrieves price history for a single market.`,
                operationId: 'getMarketHistory',
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApi0xMarketHistoryResponse',
                    examples.relayerApi0xMarketHistoryResponse,
                    `Retrieves price history for a single market`,
                ),
            },
        },
        '/v3/0x/markets/{marketId}/fills': {
            get: {
                tags: ['FEED'],
                description: `Retrieves a paginated list of order fills for a market, sorted by fill date.`,
                operationId: 'getMarketFillsList',
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApi0xMarketFillsResponse',
                    examples.relayerApi0xMarketFillsResponse,
                    `Retrieves a paginated list of order fills for a market, sorted by fill date.`,
                ),
            },
        },
        '/v3/0x/markets/{marketId}/book': {
            get: {
                tags: ['FEED'],
                description: `Retrieves the order book for a market, containing a list of bids and asks. Both asks and bids are sorted by best price.`,
                operationId: 'getMarketOrderBook',
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApi0xMarketBookResponse',
                    examples.relayerApi0xMarketBookResponse,
                    `Retrieves the order book for a market, containing a list of bids and asks.`,
                ),
            },
        },
        '/v3/0x/orders/{orderHash}': {
            get: {
                tags: ['FEED'],
                description: `Retrieves a specific order by order hash.`,
                operationId: 'getOrderHash',
                parameters: generateParameters([
                    {
                        name: 'orderHash',
                        in: 'path',
                        description: 'hash of order object',
                        example: '0x653a64f3a1c9f62c93de63dc0d0c416c5fe8754418cb32e0d8c29c725037252c',
                        schema: {
                            $ref: '#/components/schemas/hexSchema',
                        },
                    },
                ], false),
                responses: generateResponses(
                    'orderTradeSchema',
                    examples.orderTrade,
                    `Retrieves a specific order by order hash.`,
                ),
            },
        },
        '/v3/0x/orders/{orderHash}/validate': {
            get: {
                tags: ['FEED'],
                description: `Validates a specific order by order hash.`,
                operationId: 'OrderValidate',
                parameters: generateParameters([], false),
                responses: generateResponses(),
            },
        },
        '/v3/0x/orders': {
            post: {
                tags: ['TRADE'],
                description: `Submit a signed order to the relayer.`,
                operationId: 'postOrder',
                parameters: generateParameters([], false),
                requestBody: {
                    description: 'A valid signed 0x order based on the schema.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/signedOrderSchema',
                            },
                            example: examples.signedOrder,
                        },
                    },
                },
            },
        },
        '/v3/0x/markets/{marketId}/order/limit': {
            post: {
                tags: ['TRADE'],
                description: `Submits a limit order request for a specified market. The response that is returned will need to be completed and signed before it is submitted.`,
                operationId: 'postMarketsOrderLimit',
                requestBody: {
                    description: 'Payload to submit.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/markets0XOrderLimitBodySchema',
                            },
                            example: examples.markets0XOrderLimitBody,
                        },
                    },
                },
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'signedOrderSchema',
                    examples.relayerApi0xMarketOrderLimitResponse,
                    `Retrieves a list of available markets`,
                ),
            },
        },
        '/v3/0x/markets/{marketId}/order/market': {
            post: {
                tags: ['TRADE'],
                description: `Submits a market order request for a specified market. The response returned will include a list of orders that will fill the market request.`,
                operationId: 'postMarketsOrderMarket',
                requestBody: {
                    description: 'Payload to submit.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/markets0XOrderMarketBodySchema',
                            },
                            example: examples.markets0XOrderMarketBody,
                        },
                    },
                },
                parameters: generateParameters(
                    [
                        {
                            name: 'marketId',
                            in: 'path',
                            description: 'market id in the format of {baseToken}-{quoteToken}.',
                            example: 'VSF-WETH, ZRX-WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApi0xMarketOrderMarketResponse',
                    examples.relayerApi0xMarketOrderMarketResponse,
                    `Market Order response`,
                ),
            },
        },
        '/v3/0x/accounts/{:accountAddress}/fills': {
            get: {
                tags: ['ACCOUNTS'],
                description: `Retrieves a list of order fills for an account, sorted by fill date.`,
                operationId: 'getAccountFills',
                parameters: generateParameters([
                    {
                        name: 'accountAddress',
                        in: 'path',
                        description: 'ethereum account address',
                        example: '0xffd99af9f7322e78be8dec497df76ef5c2207e04',
                        schema: {
                            type: 'string',
                        },
                    },
                ],
                    false),
                responses: generateResponses(
                    'relayerApi0xAccountFillsResponse',
                    examples.relayerApi0xAccountFillsResponse,
                    `Retrieves a list of order fills for an account, sorted by fill date.`,
                ),
            },
        },
        '/v3/0x/accounts/{:accountAddress}/orders': {
            get: {
                tags: ['ACCOUNTS'],
                description: `Retrieves a list of open orders for an account.`,
                operationId: 'getAccountOpenOrders',
                parameters: generateParameters([], false),
                responses: generateResponses(
                    'relayerApi0xAccountOrdersResponse',
                    examples.relayerApi0xAccountOrdersResponse,
                    `Retrieves a list of open orders for an account.`,
                ),
            },
        },
        '/v1/cmc/assets': {
            get: {
                tags: ['CMC'],
                description: `The assets endpoint is to provide a detailed summary for each currency available on the exchange.`,
                operationId: 'getAssetsList',
                parameters: generateParameters([], false),
                responses: generateResponses(
                    'relayerApiCMCAssetsListResponse',
                    examples.relayerApiCMCAssetsListResponse,
                    `Assets List`,
                ),
            },
        },
        '/v1/cmc/ticker': {
            get: {
                tags: ['CMC'],
                description: `The ticker endpoint is to provide a 24-hour pricing and volume summary for each market pair available on the exchange.`,
                operationId: 'getTickerList',
                parameters: generateParameters([], false),
                responses: generateResponses(
                    'relayerApiCMCTickerListResponse',
                    examples.relayerApiCMCTickerListResponse,
                    `Tickers List`,
                ),
            },
        },
        '/v1/cmc/orderbook/{market_pair}': {
            get: {
                tags: ['CMC'],
                description: `The order book endpoint is to provide a complete level 2 order book (arranged by best asks/bids) with full depth returned for a given market pair.`,
                operationId: 'getMarketOrderBook',
                parameters: generateParameters(
                    [
                        {
                            name: 'market_pair',
                            in: 'path',
                            description: ' A pair such as LTC_BTC',
                            example: 'VSF_WETH, ZRX_WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                        {
                            name: 'depth',
                            in: 'query',
                            description: 'Orders depth quantity:[0,5,10,20,50,100,500] Not defined or 0 = full order book ',
                            example: '0 or 5 or 10 ...',
                            schema: {
                                enum: [0, 5, 10, 20, 50, 100, 500],
                            },
                        },
                        {
                            name: 'level',
                            in: 'query',
                            description: ' Level 1 – Only the best bid and ask. Level 2 – Arranged by best bids and asks. Level 3 – Complete order book, no aggregation.',
                            example: '1 or 2 or 3',
                            schema: {
                                enum: [1, 2, 3],
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'orderbookCMCSchema',
                    examples.relayerApiCMCOrderBookResponse,
                    `Retrieves a list of available markets`,
                ),
            },
        },
        '/v1/cmc/trades/{market_pair}': {
            get: {
                tags: ['CMC'],
                description: `Retrieves a list of available markets given query parameters. .`,
                operationId: 'getMarketTradesList',
                parameters: generateParameters(
                    [
                        {
                            name: 'market_pair',
                            in: 'path',
                            description: ' A pair such as LTC_BTC',
                            example: 'VSF_WETH, ZRX_WETH',
                            schema: {
                                type: 'string',
                            },
                        },
                        {
                            name: 'type',
                            in: 'query',
                            description: 'Query buy side or sell side only.',
                            example: 'sell or buy or left it blank',
                            schema: {
                                enum: ['sell', 'buy'],
                            },
                        },
                    ],
                    false,
                ),
                responses: generateResponses(
                    'relayerApiCMCTradesListResponse',
                    examples.relayerApiCMCTradesResponse,
                    `Retrieves a list of available markets`,
                ),
            },
        },
    },
    components: {
        schemas,
    },
};

