import axios from 'axios'
import { getConfig } from 'config'
import memoize from 'lodash/memoize'
import { bnOrZero } from 'lib/bignumber/bignumber'

type BoardroomGovernanceData = Array<{
  currentState: string
  title: string
  choices: Array<string>
  results: Array<{ total: number; choice: number }>
  refId: string
}>

export type ParsedBoardroomGovernanceData = Array<{
  refId: string
  title: string
  choices: string[]
  results: Array<{
    absolute: string
    percent: string
  }>
}>

const BOARDROOM_API_BASE_URL = getConfig().REACT_APP_BOARDROOM_API_BASE_URL

const parseGovernanceData = (
  governanceData: BoardroomGovernanceData,
): ParsedBoardroomGovernanceData => {
  const activeProposals = governanceData.filter(data => data.currentState === 'active')
  const proposals = activeProposals.length ? activeProposals : [governanceData[0]]

  return proposals.map(({ title, choices, results, refId }) => {
    const totalResults = results.reduce((acc, currentResult) => {
      acc = acc.plus(currentResult.total)
      return acc
    }, bnOrZero('0'))

    return {
      refId,
      title,
      choices,
      results: results.map(result => ({
        absolute: bnOrZero(result.total).toString(),
        percent: bnOrZero(result.total).div(totalResults).toString(),
      })),
    }
  })
}

export const getGovernanceData = memoize(async () => {
  try {
    const response = await axios.get<{ data: BoardroomGovernanceData }>(
      `${BOARDROOM_API_BASE_URL}proposals`,
    )
    const governanceData = response?.data?.data
    const parsedGovernanceData = parseGovernanceData(governanceData)
    return parsedGovernanceData
  } catch (e) {
    console.error(e)
    return null
  }
})
