import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getFarmingApr } from './utils/getFarmingApr'
import { getFoxyApr } from './utils/getFoxyApr'
import { getLpApr } from './utils/getLpApr'

type AprData = {
  foxyApr: string | null
  farmingApr: string | null
  lpApr: string | null
}
const initialState: AprData = {
  foxyApr: null,
  farmingApr: null,
  lpApr: null,
}

export const aprData = createSlice({
  name: 'aprData',
  initialState,
  reducers: {
    clear: () => initialState,
    upsertAprData: (
      aprDataState,
      { payload: { foxyApr, farmingApr, lpApr } }: { payload: AprData },
    ) => {
      aprDataState.foxyApr = foxyApr
      aprDataState.farmingApr = farmingApr
      aprDataState.lpApr = lpApr
    },
  },
})

export const aprDataApi = createApi({
  reducerPath: 'aprDataApi',
  // not actually used, only used to satisfy createApi, we use a custom queryFn
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // 5 minutes caching against overfetching.
  keepUnusedDataFor: 300,
  endpoints: build => ({
    getAprData: build.query<any, any>({
      queryFn: async (_, { dispatch }) => {
        const [foxyApr, farmingApr, lpApr] = await Promise.all([
          getFoxyApr(),
          getFarmingApr(),
          getLpApr(),
        ])

        dispatch(
          aprData.actions.upsertAprData({
            foxyApr,
            farmingApr,
            lpApr,
          }),
        )

        return { data: {} }
      },
    }),
  }),
})
