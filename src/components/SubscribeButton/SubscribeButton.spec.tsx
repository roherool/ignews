import { fireEvent, render, screen } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton component', () => {
  
  it('should renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)
  
    expect(screen.getByText('Assine agora')).toBeInTheDocument()
  })

  it('should redirects user to sign in when not authentication', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Assine agora')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('should redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { user: { 
        name: 'John Doe', 
        email: 'john.doe@example.com' 
      },
      activeSubscription: 'fake-active-subscription',
      expires: 'fake-expires' 
      }, 
      false
    ])
    
    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Assine agora')

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})