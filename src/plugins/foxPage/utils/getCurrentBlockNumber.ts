import { ethersProvider } from '../utils'

const web3Provider = ethersProvider

export const getCurrentBlockNumber = async () => web3Provider.getBlockNumber()
