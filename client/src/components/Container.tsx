import * as React from 'react'
import { Container as BootContainer } from 'reactstrap'

export const Container : React.StatelessComponent<{}> = ({children}) =>
	<BootContainer>
		{children}
	</BootContainer>