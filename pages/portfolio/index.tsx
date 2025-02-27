import { NextPage } from 'next'
import { Text, Flex, Box } from '../../components/primitives'
import Layout from 'components/Layout'
import { useMediaQuery } from 'react-responsive'
import { useContext, useState } from 'react'
import { useAccount } from 'wagmi'
import { TabsList, TabsTrigger, TabsContent } from 'components/primitives/Tab'
import * as Tabs from '@radix-ui/react-tabs'
import { useMounted } from '../../hooks'
import { TokenTable } from 'components/portfolio/TokenTable'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { MobileTokenFilters } from 'components/common/MobileTokenFilters'
import { TokenFilters } from 'components/common/TokenFilters'
import { FilterButton } from 'components/common/FilterButton'
import { ListingsTable } from 'components/portfolio/ListingsTable'
import { OffersTable } from 'components/portfolio/OffersTable'
import { CollectionsTable } from 'components/portfolio/CollectionsTable'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Head } from 'components/Head'
import PortfolioSortDropdown, {
  PortfolioSortingOption,
} from 'components/common/PortfolioSortDropdown'
import { useQuery } from '@apollo/client'
import { GET_USER_RELATIVE_COLLECTIONS } from 'graphql/queries/collections'

const IndexPage: NextPage = () => {
  const { address, isConnected } = useAccount()
  const [tokenFiltersOpen, setTokenFiltersOpen] = useState(true)
  const [filterCollection, setFilterCollection] = useState<string | undefined>(
    undefined
  )
  const [sortByType, setSortByType] =
    useState<PortfolioSortingOption>('acquiredAt')
  const isSmallDevice = useMediaQuery({ maxWidth: 905 })
  const isMounted = useMounted()
  
  const { data, loading } = useQuery(GET_USER_RELATIVE_COLLECTIONS, {
    variables: {
      first: 100,
      where: {
        user: address?.toLocaleLowerCase() as string
      }
    },
    skip: !address
  })
  const collections = data?.relativeCollections || []

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Head />
      <Layout>
        <Flex
          direction="column"
          css={{
            px: '$4',
            py: 40,
            '@sm': {
              px: '$5',
            },
          }}
        >
          {isConnected ? (
            <>
              <Flex align="center" justify="between" css={{ gap: '$4' }}>
                <Text style="h4" css={{}}>
                  Portfolio
                </Text>
              </Flex>
              <Tabs.Root defaultValue="items">
                <Flex
                  css={{ overflowX: 'scroll', '@sm': { overflowX: 'auto' } }}
                >
                  <TabsList
                    style={{
                      whiteSpace: 'nowrap',
                      width: '100%',
                    }}
                  >
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="collections">Collections</TabsTrigger>
                    <TabsTrigger value="listings">Listings</TabsTrigger>
                    <TabsTrigger value="offers">Offers Made</TabsTrigger>
                  </TabsList>
                </Flex>
                <TabsContent value="items">
                  <Flex
                    css={{
                      gap: tokenFiltersOpen ? '$5' : '0',
                      position: 'relative',
                    }}
                  >
                    {isSmallDevice ? (
                      <MobileTokenFilters
                        collections={collections}
                        filterCollection={filterCollection}
                        setFilterCollection={setFilterCollection}
                      />
                    ) : (
                      <TokenFilters
                        isLoading={loading}
                        open={tokenFiltersOpen}
                        setOpen={setTokenFiltersOpen}
                        collections={collections}
                        filterCollection={filterCollection}
                        setFilterCollection={setFilterCollection}
                      />
                    )}
                    <Box
                      css={{
                        flex: 1,
                        maxWidth: '100%',
                      }}
                    >
                      {/* {isSmallDevice && (
                        <Flex justify="center">
                          <PortfolioSortDropdown
                            option={sortByType}
                            onOptionSelected={(option) => {
                              setSortByType(option)
                            }}
                          />
                        </Flex>
                      )} */}
                      <Flex justify="between" css={{ marginBottom: '$4' }}>
                        {!isSmallDevice &&
                          !loading &&
                          collections.length > 0 && (
                            <FilterButton
                              open={tokenFiltersOpen}
                              setOpen={setTokenFiltersOpen}
                            />
                          )}
                        {/* {!isSmallDevice && !loading && (
                          <PortfolioSortDropdown
                            option={sortByType}
                            onOptionSelected={(option) => {
                              setSortByType(option)
                            }}
                          />
                        )} */}
                      </Flex>
                      <TokenTable
                        isLoading={loading}
                        address={address}
                        sortBy={sortByType}
                        filterCollection={filterCollection}
                      />
                    </Box>
                  </Flex>
                </TabsContent>
                <TabsContent value="collections">
                  <CollectionsTable address={address} />
                </TabsContent>
                <TabsContent value="listings">
                  <ListingsTable address={address} />
                </TabsContent>
                <TabsContent value="offers">
                  <OffersTable address={address} />
                </TabsContent>
              </Tabs.Root>
            </>
          ) : (
            <Flex
              direction="column"
              align="center"
              css={{ mx: 'auto', py: '120px', maxWidth: '350px', gap: '$4' }}
            >
              <Text style="h4" css={{ mb: '$3' }}>
                Sell your NFT instantly
              </Text>
              <Text css={{ color: '$gray11' }}>
                <FontAwesomeIcon icon={faWallet} size="2xl" />
              </Text>
              <Text
                style="body1"
                css={{ color: '$gray11', textAlign: 'center', mb: '$4' }}
              >
                Connect wallet to instant sell your token across all major
                marketplaces.
              </Text>
              <ConnectWalletButton />
            </Flex>
          )}
        </Flex>
      </Layout>
    </>
  )
}

export default IndexPage
