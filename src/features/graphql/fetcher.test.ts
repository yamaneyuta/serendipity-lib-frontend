import { getRestPhpVarName } from '../../lib/global/getRestPhpVarName';
import { RestPhpVar } from '../../types/RestPhpVar';
import { fetcher } from './fetcher';

describe( 'fetcher', () => {
	const setGlobalVar = ( graphqlUrl?: string, wpRestNonce?: string ) => {
		const varName = getRestPhpVarName();
		const globalVar: RestPhpVar = {
			graphqlUrl,
			wpRestNonce,
		} as RestPhpVar; // テストのために強制的に型を指定(テストではundefinedを許容する)
		( global as any )[ varName ] = globalVar;
	};

	const cleanup = () => {
		( global as any )[ getRestPhpVarName() ] = undefined;
	};
	beforeEach( cleanup );
	afterEach( cleanup );

	/**
	 * グローバルオブジェクトが存在する場合のテスト
	 */
	it( 'should be defined', () => {
		// ARRANGE
		setGlobalVar( 'https://example.com/graphql', 'abcde01234' );

		// ACT, ASSERT
		expect( () => fetcher( '' ) ).not.toThrow();
		const result = fetcher( '' );
		expect( typeof result ).toBe( 'function' );
	} );

	/**
	 * グローバルオブジェクトが存在しない場合のテスト
	 */
	it( 'should throw an error', () => {
		// ARRANGE
		// Do nothing

		// ACT, ASSERT
		// 例外がスローされることを確認
		expect( () => fetcher( '' ) ).toThrow( '[EC048815]' );
	} );
} );