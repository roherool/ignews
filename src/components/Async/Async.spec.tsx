import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'

import { Async } from '.'

describe('Async component', () => {
  
  it('should renders correctly', async () => {
    render(<Async />)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
    
    await waitForElementToBeRemoved(screen.queryByText('Button'))
  })
})