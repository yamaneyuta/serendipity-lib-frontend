import { PhpVarName } from '../../lib/repository/PhpVarName';
import { RestPhpVar } from '../../types/RestPhpVar';
import { fetcher } from './fetcher';

describe( 'fetcher', () => {
	const setGlobalVar = ( graphqlUrl?: string, wpRestNonce?: string ) => {
		const varName = new PhpVarName().get();
		const globalVar: RestPhpVar = {
			graphqlUrl,
			wpRestNonce,
		} as RestPhpVar; // テストのために強制的に型を指定(テストではundefinedを許容する)
		( global as any )[ varName ] = globalVar;
	};

	const cleanup = () => {
		( global as any )[ new PhpVarName().get() ] = undefined;
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
