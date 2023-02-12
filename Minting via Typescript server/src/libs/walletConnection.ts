import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { createStarkSigner, WalletConnection } from '@imtbl/core-sdk';

/**
 * Generate a ethSigner/starkSigner object from a private key.
 */
export const generateWalletConnection = async (
  ethNetwork: string,
): Promise<WalletConnection> => {
  const userPrivateKey = "db9a059b2827d6691a2f3de17975dc9597cc9b38feb89811340b206cd23b9c8b";
  const userStarkKey = "0x7917eDb51ecD6CdB3F9854c3cc593F33de10c623";
  const alchemyKey = "WmzAboIrYGOEDnuUJnxQ8ucuu3jfoR_q";

  // connect provider
  const provider = new AlchemyProvider(ethNetwork, alchemyKey);

  // L1 credentials
  const ethSigner = new Wallet(userPrivateKey).connect(provider);

  // L2 credentials
  const starkSigner = createStarkSigner(userStarkKey);

  return {
    ethSigner,
    starkSigner,
  };
};