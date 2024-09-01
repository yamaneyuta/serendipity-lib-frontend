import { useGraphQLUrl } from './useGraphQLUrl';
import { getRestPhpVarName } from './getRestPhpVarName';
import { render } from '../../jest-lib';
import { RestPhpVar } from '../../types/RestPhpVar';

const TEST_ID = '61D2F697';

const Sut: React.FC = () => {
	const graphqlUrl = useGraphQLUrl();
	return (
		<>
			<p data-testid={ TEST_ID }>{ String( graphqlUrl ) }</p>
		</>
	);
};

const setGlobalVar = ( graphqlUrl: string, wpRestNonce: string ) => {
	const varName = getRestPhpVarName();
	const globalVar: RestPhpVar = {
		graphqlUrl,
		wpRestNonce,
	};
	( global as any )[ varName ] = globalVar;
};

describe( '[975F9282] useGraphQLUrl', () => {
	const cleanup = () => {
		( global as any )[ getRestPhpVarName() ] = undefined;
	};
	beforeEach( cleanup );
	afterEach( cleanup );

	/**
	 * GraphQLのURLが存在する場合のテスト
	 */
	it( '[BE9A4991] useGraphQLUrl - graphqlUrl exists', () => {
		// ARRANGE
		setGlobalVar( 'https://example.com/graphql', 'abcde01234' );

		// ACT
		const { getByTestId } = render( <Sut /> );

		// ASSERT
		const graphqlUrl = getByTestId( TEST_ID ).textContent;
		expect( graphqlUrl ).toBe( 'https://example.com/graphql' );
	} );

	/**
	 * GraphQLのURLが存在しない場合のテスト
	 */
	it( '[57BEB900] useGraphQLUrl - graphqlUrl does not exist', () => {
		// ARRANGE
		// Do nothing

		// ACT
		const { getByTestId } = render( <Sut /> );

		// ASSERT
		const graphqlUrl = getByTestId( TEST_ID ).textContent;
		expect( graphqlUrl ).toBe( 'null' ); // 値が存在しない場合はnullが返る
	} );
} );
