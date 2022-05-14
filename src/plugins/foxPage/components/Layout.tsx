import { Box, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useTranslate } from 'react-polyglot'
import foxPageBg from 'assets/foxpage-bg.png'
import { AssetIcon } from 'components/AssetIcon'

type FoxLayoutProps = {
  content: ReactNode
  icon: string
}

export const Layout = ({ content, icon }: FoxLayoutProps) => {
  const translate = useTranslate()

  return (
    <>
      <Box
        position='relative'
        textAlign='center'
        py={{ base: 8, md: 12 }}
        mb={4}
        px={{ base: 4, md: 8 }}
      >
        <Box
          backgroundImage={foxPageBg}
          backgroundPosition={'bottom'}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
          height='100%'
          width='100%'
          position='absolute'
          bottom='0'
          left='0'
          zIndex='-1'
        ></Box>
        <Box maxWidth='900px' width='100%' m='auto'>
          <AssetIcon src={icon} boxSize='12' zIndex={2} mb={2} />
          <Text color='inherit' fontSize='1.125rem' fontWeight='bold' mb={2}>
            {translate('plugins.foxPage.foxToken')}
          </Text>
          <Text color='gray.400'>{translate('plugins.foxPage.description')}</Text>
        </Box>
      </Box>

      <Box px={{ base: 2, md: 8 }}>{content}</Box>
    </>
  )
}