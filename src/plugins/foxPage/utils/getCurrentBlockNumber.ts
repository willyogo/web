import memoize from 'lodash/memoize'

import { ethersProvider } from '../utils'

export const getCurrentBlockNumber = memoize(async () => ethersProvider?.getBlockNumber())
