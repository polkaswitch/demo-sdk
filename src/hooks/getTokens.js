import SwingSDK from '@swing.xyz/sdk';

const sdk = new SwingSDK();

export const getTokens = () => {
  return sdk.tokens;
}