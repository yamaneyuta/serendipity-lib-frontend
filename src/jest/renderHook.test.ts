import { renderHook } from './renderHook';

/**
 * 例外を発生させるカスタムフック
 */
const useSut = () => {
	throw new Error( '[EBB70CF8]' );
};

/**
 * renderHook関数呼び出し時に例外が発生するテスト
 */
it( 'should not throw an error', () => {
	expect( () => renderHook( useSut ) ).toThrow( '[EBB70CF8]' );
} );
