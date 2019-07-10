// http://localhost:3000/v2/candles/config?symbol=VSF-WETH
export const relayerApiCandlesConfigResponse = {
    supports_search: true,
    supports_group_request: false,
    supports_marks: false,
    supports_timescale_marks: false,
    supports_time: false,
    exchanges: [{ value: 'VeriDex', name: 'VeriDex', desc: 'VeriDex' }],
    symbols_types: [{ name: 'Crypto', value: 'crypto' }],
    supported_resolutions: ['D'],
};
