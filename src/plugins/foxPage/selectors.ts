import { createSelector } from '@reduxjs/toolkit'
import { ReduxState } from 'state/reducer'

export const selectApr = (state: ReduxState) => state.aprData

export const selectFoxyApr = createSelector(selectApr, aprData => aprData.foxyApr)
export const selectLpApr = createSelector(selectApr, aprData => aprData.lpApr)
export const selectFarmingApr = createSelector(selectApr, aprData => aprData.farmingApr)
