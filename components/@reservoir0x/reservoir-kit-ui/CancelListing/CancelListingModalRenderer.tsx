import React, { FC, useEffect, useState, useCallback, ReactNode } from 'react'
import { useSigner, useNetwork } from 'wagmi'
import { Execute } from '@reservoir0x/reservoir-sdk'
import { Token } from 'types/workaround'
import { Order } from '__generated__/graphql'
import { useQuery } from '@apollo/client'
import { GET_ORDER_BY_HASH } from 'graphql/queries/orders'
import { useLooksRareSDK } from 'context/LooksRareSDKProvider'
import { GET_TOKEN_BY_ID } from 'graphql/queries/tokens'
import { useNft } from 'use-nft'

export enum CancelStep {
  Cancel,
  Approving,
  Complete,
}

type ChildrenProps = {
  loading: boolean
  listing?: Order
  token?: Token
  contract?: string
  cancelStep: CancelStep
  transactionError?: Error | null
  totalUsd: number
  blockExplorerBaseUrl: string
  steps: Execute['steps'] | null
  txHash: string | null
  setCancelStep: React.Dispatch<React.SetStateAction<CancelStep>>
  cancelOrder: () => void
}

type Props = {
  open: boolean
  listingId?: string
  children: (props: ChildrenProps) => ReactNode
}

export const CancelListingModalRenderer: FC<Props> = ({
  open,
  listingId,
  children,
}) => {
  const { data: signer } = useSigner()
  const [cancelStep, setCancelStep] = useState<CancelStep>(CancelStep.Cancel)
  const [transactionError, setTransactionError] = useState<Error | null>()
  const [steps, setSteps] = useState<Execute['steps'] | null>(null)
  const [txHash, setTxHash] = useState<string|null>(null)
  const { chain: activeChain } = useNetwork()
  const blockExplorerBaseUrl =
    activeChain?.blockExplorers?.default.url || 'https://etherscan.io'

  const looksRareSdk = useLooksRareSDK()
  const { data, loading } = useQuery(GET_ORDER_BY_HASH, {
    variables: { hash: listingId as string }
  })

  const listing = data?.order as Order

  const { data: tokenData } = useQuery(GET_TOKEN_BY_ID, {
    variables: { id: `${listing?.collectionAddress}-${listing?.tokenId}` },
  })
  // TO-DO: remove later, should using token.image
  const { nft } = useNft(listing?.collectionAddress, listing?.tokenId)
  const token = {...tokenData?.token, image: nft?.image} as Token

  const cancelOrder = useCallback(async () => {
    if (!signer) {
      const error = new Error('Missing a signer')
      setTransactionError(error)
      throw error
    }

    if (!listing) {
      const error = new Error('Missing list id to cancel')
      setTransactionError(error)
      throw error
    }

    try {
      setCancelStep(CancelStep.Approving)

      const tx = await looksRareSdk.cancelMultipleMakerOrders([listing?.nonce]).call()
      setTxHash(tx.hash);
      await tx.wait()
  
      setCancelStep(CancelStep.Complete)
    } catch (error: any) {
        const errorStatus = (error)?.statusCode
        let message = 'Oops, something went wrong. Please try again.'
        if (errorStatus >= 400 && errorStatus < 500) {
          message = error.message
        }
        //@ts-ignore: Should be fixed in an update to typescript
        const transactionError = new Error(message, {
          cause: error,
        })
        setTransactionError(transactionError)
        setCancelStep(CancelStep.Cancel)
        setTxHash(null);
        setSteps(null)
    }
  }, [listingId, signer])

  useEffect(() => {
    if (!open) {
      setCancelStep(CancelStep.Cancel)
      setTransactionError(null)
      setTxHash(null)
      setSteps(null)
    }
  }, [open])


  return (
    <>
      {children({
        loading,
        listing,
        cancelStep,
        transactionError,
        blockExplorerBaseUrl,
        steps,
        setCancelStep,
        cancelOrder,
        txHash,
        token,
        totalUsd: 0
      })}
    </>
  )
}
