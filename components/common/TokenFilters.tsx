import { Flex, Text } from 'components/primitives'
import { Dispatch, FC, SetStateAction } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { CollapsibleContent } from 'components/primitives/Collapsible'
import Image from 'next/image'
import { NAVBAR_HEIGHT } from 'components/navbar'
import { Collection } from '__generated__/graphql'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  collections?: Collection[]
  filterCollection: string | undefined
  setFilterCollection: Dispatch<SetStateAction<string | undefined>>
  scrollToTop?: () => void
  isLoading?: boolean
}

export const TokenFilters: FC<Props> = ({
  open,
  setOpen,
  collections,
  filterCollection,
  setFilterCollection,
  isLoading,
  scrollToTop,
}) => {
  if (collections?.length === 0 || collections == null || isLoading) {
    return null
  }
  return (
    <Collapsible.Root
      open={open}
      key="Token Filter"
      onOpenChange={setOpen}
      style={{
        transition: 'width .5s',
        width: open ? 350 : 0,
      }}
    >
      <CollapsibleContent
        css={{
          position: 'sticky',
          top: 16 + 80,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px - 32px)`,
          overflow: 'auto',
        }}
      >
        <Flex direction="column">
          <Text style="subtitle1" css={{ mb: '$2', ml: '$3' }}></Text>
          {collections?.map((collection) => {
            let selected = collection?.id == filterCollection
            return (
              <Flex
                key={collection?.id}
                css={{
                  py: '$2',
                  px: '$3',
                  gap: '$3',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selected ? '$gray5' : '$gray4',
                  },
                  backgroundColor: selected ? '$gray5' : '',
                }}
                align="center"
                onClick={() => {
                  if (selected) {
                    setFilterCollection(undefined)
                  } else {
                    setFilterCollection(collection?.id)
                  }
                  scrollToTop?.()
                }}
              >
                {collection?.image && (
                  <Image
                    style={{
                      borderRadius: '4px',
                      objectFit: 'cover',
                      aspectRatio: '1/1',
                    }}
                    loader={({ src }) => src}
                    src={collection?.image as string}
                    alt={collection?.name as string}
                    width={24}
                    height={24}
                  />
                )}
                <Text
                  style="body1"
                  css={{
                    flex: 1,
                  }}
                  ellipsify
                >
                  {collection?.name}
                </Text>
                <Text style="subtitle2" css={{ color: '$gray10' }}>
                  {collection?.totalTokens}
                </Text>
              </Flex>
            )
          })}
        </Flex>
      </CollapsibleContent>
    </Collapsible.Root>
  )
}
