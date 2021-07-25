import { getEmbedTitle } from './embed'
import { TZ_NAMES } from './util'

const snowflake = '86913608335773696'

test('returns false if given insufficient parameters', () => {
	expect(getEmbedTitle({})).toBe(false)
	expect(getEmbedTitle({ z: '-' })).toBe(false)
	expect(getEmbedTitle({ z: '-', l: 'en-US' })).toBe(false)
})

test('returns false if given invalid snowflake', () => {
	expect(getEmbedTitle({ z: '-', s: 'abc' })).toBe(false)
	expect(getEmbedTitle({ z: '-', f: 'abc' })).toBe(false)
})

test('returns correct timestamp when no time zone specified', () => {
	expect(getEmbedTitle({ s: snowflake, l: 'en-US', z: '-' })).toBe(
		'07/01/2011 9:46:33 PM UTC'
	)
})

test('returns correct timestamp with locale format', () => {
	expect(getEmbedTitle({ s: snowflake, l: 'de', z: '-' })).toBe(
		'01.07.2011 21:46:33 UTC'
	)
	expect(getEmbedTitle({ s: snowflake, l: 'de-DE', z: '-' })).toBe(
		'01.07.2011 21:46:33 UTC'
	)
	expect(getEmbedTitle({ s: snowflake, l: 'zn', z: '-' })).toBe(
		'2011/07/01 21:46:33 UTC'
	)
})

test('returns correct timestamp with America/New_York time zone', () => {
	expect(
		getEmbedTitle({
			s: snowflake,
			l: 'en-US',
			z: TZ_NAMES.indexOf('America/New_York'),
		})
	).toBe('07/01/2011 5:46:33 PM EDT')
})
