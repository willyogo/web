import { getEthersProvider } from '../utils'

const web3Provider = getEthersProvider()

export const getCurrentBlockNumber = async () => web3Provider.getBlockNumber()
