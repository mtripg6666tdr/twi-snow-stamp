export function getLocalStorageBoolean(name, defaultValue) {
	const loadedValue = localStorage.getItem(name)
	try {
		return loadedValue === undefined ? defaultValue : JSON.parse(loadedValue)
	} catch (e) {
		return defaultValue
	}
}

// https://github.com/iamkun/dayjs/issues/732#issuecomment-554383261
export function detectLocale() {
	const navLangs =
		navigator.languages || (navigator.language ? [navigator.language] : false)
	if (!navLangs || navLangs.length === 0) return null
	return navLangs[0].toLowerCase()
}

export function detectTimeZone() {
	const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
	const tzIndex = TZ_NAMES.indexOf(tz)
	if (tzIndex < 0) return '-'
	return tzIndex.toString(36)
}

export function encodeSnowflake(snowflake) {
	// Split snowflake into 15-digit chunks (max safe int = 999,999,999,999,999)
	const chunks = []
	const chunkCount = Math.ceil(snowflake.length / 15)
	for (let i = 0; i < chunkCount; i++) {
		chunks.push(snowflake.substring(0, 15))
		snowflake = snowflake.substring(15)
	}
	return chunks.map((chunk) => parseInt('1' + chunk).toString(36)).join('-')
}

export function decodeSnowflake(encodedSnowflake) {
	const chunks = encodedSnowflake.split('-')
	return chunks.map((chunk) => parseInt(chunk, 36).toString().slice(1)).join('')
}

// https://svelte.dev/repl/b4db6313dfeb4b50871a9b43398a6952?version=3.16.7
/** Selects the text inside a text node when the node is focused */
export function selectTextOnFocus(node) {
	const handleFocus = (event) => {
		node && typeof node.select === 'function' && node.select()
	}

	node.addEventListener('focus', handleFocus)

	return {
		destroy() {
			node.removeEventListener('focus', handleFocus)
		},
	}
}

/** Blurs the node when Escape is pressed */
export function blurOnEscape(node) {
	const handleKey = (event) => {
		if (event.key === 'Escape' && node && typeof node.blur === 'function')
			node.blur()
	}

	node.addEventListener('keydown', handleKey)

	return {
		destroy() {
			node.removeEventListener('keydown', handleKey)
		},
	}
}

// List of all time zones from IANA TZ database, sorted by population
export const TZ_NAMES = [
	'Asia/Tokyo',
	'Asia/Jakarta',
	'Asia/Manila',
	'Asia/Karachi',
	'Asia/Seoul',
	'Asia/Shanghai',
	'America/New_York',
	'America/Sao_Paulo',
	'America/Mexico_City',
	'Africa/Lagos',
	'Europe/Moscow',
	'Asia/Dhaka',
	'Africa/Cairo',
	'America/Los_Angeles',
	'Asia/Bangkok',
	'Asia/Kolkata',
	'Asia/Tehran',
	'Europe/Istanbul',
	'Europe/Paris',
	'America/Lima',
	'Europe/London',
	'America/Chicago',
	'America/Bogota',
	'Asia/Ho_Chi_Minh',
	'Africa/Johannesburg',
	'Asia/Taipei',
	'Asia/Hong_Kong',
	'Asia/Kuala_Lumpur',
	'Asia/Baghdad',
	'America/Toronto',
	'America/Santiago',
	'Europe/Madrid',
	'Asia/Riyadh',
	'Asia/Singapore',
	'Africa/Khartoum',
	'Africa/Abidjan',
	'Asia/Rangoon',
	'Africa/Nairobi',
	'Asia/Kabul',
	'America/Phoenix',
	'Africa/Accra',
	'America/Monterrey',
	'Europe/Berlin',
	'Australia/Sydney',
	'Asia/Dubai',
	'Australia/Melbourne',
	'Europe/Rome',
	'America/Detroit',
	'Europe/Athens',
	'America/Fortaleza',
	'Europe/Kiev',
	'America/Recife',
	'Africa/Casablanca',
	'Asia/Urumqi',
	'America/Santo_Domingo',
	'America/Caracas',
	'Asia/Pyongyang',
	'America/Asuncion',
	'America/Guayaquil',
	'America/Bahia',
	'Europe/Lisbon',
	'Asia/Baku',
	'Africa/Maputo',
	'Africa/Algiers',
	'Asia/Damascus',
	'America/Denver',
	'Asia/Amman',
	'America/Puerto_Rico',
	'America/Port-au-Prince',
	'America/Vancouver',
	'Asia/Tashkent',
	'America/Managua',
	'Asia/Beirut',
	'Asia/Colombo',
	'America/Havana',
	'Europe/Brussels',
	'Australia/Brisbane',
	'Africa/Tunis',
	'America/Belem',
	'America/Tijuana',
	'Europe/Minsk',
	'America/La_Paz',
	'America/Manaus',
	'Europe/Bucharest',
	'Asia/Gaza',
	'Europe/Vienna',
	'Australia/Perth',
	'Europe/Warsaw',
	'Europe/Budapest',
	'America/Montevideo',
	'Europe/Amsterdam',
	'Asia/Almaty',
	'America/Panama',
	'Asia/Novosibirsk',
	'Asia/Makassar',
	'Europe/Stockholm',
	'Asia/Yekaterinburg',
	'Pacific/Auckland',
	'Europe/Prague',
	'Europe/Ulyanovsk',
	'America/Guatemala',
	'Asia/Yerevan',
	'Africa/Ndjamena',
	'Europe/Copenhagen',
	'Asia/Ulaanbaatar',
	'Europe/Helsinki',
	'Europe/Sofia',
	'Asia/Kathmandu',
	'Europe/Belgrade',
	'America/Costa_Rica',
	'Europe/Samara',
	'Europe/Dublin',
	'Asia/Omsk',
	'Australia/Adelaide',
	'Asia/Tbilisi',
	'America/Tegucigalpa',
	'America/Merida',
	'Africa/Tripoli',
	'Africa/Monrovia',
	'America/El_Salvador',
	'Asia/Tomsk',
	'America/Edmonton',
	'Europe/Volgograd',
	'Europe/Astrakhan',
	'Asia/Krasnoyarsk',
	'Asia/Qatar',
	'America/Jamaica',
	'America/Maceio',
	'Pacific/Fiji',
	'Asia/Bishkek',
	'Indian/Reunion',
	'America/Chihuahua',
	'Asia/Jerusalem',
	'America/Guyana',
	'America/Campo_Grande',
	'Europe/Zaporozhye',
	'Asia/Dushanbe',
	'Asia/Qyzylorda',
	'Europe/Chisinau',
	'America/Winnipeg',
	'Europe/Riga',
	'America/Hermosillo',
	'America/Cancun',
	'Europe/Oslo',
	'Asia/Irkutsk',
	'Asia/Vladivostok',
	'Asia/Sakhalin',
	'Asia/Macau',
	'Asia/Novokuznetsk',
	'Europe/Luxembourg',
	'America/Cuiaba',
	'Atlantic/Canary',
	'Europe/Vilnius',
	'Atlantic/Cape_Verde',
	'Europe/Kirov',
	'America/Matamoros',
	'America/Mazatlan',
	'Europe/Kaliningrad',
	'Europe/Malta',
	'Europe/Tirane',
	'Asia/Brunei',
	'Europe/Tallinn',
	'Asia/Ashgabat',
	'America/Halifax',
	'Africa/Bissau',
	'America/Martinique',
	'Europe/Zurich',
	'Pacific/Honolulu',
	'America/Porto_Velho',
	'Asia/Samarkand',
	'Indian/Maldives',
	'Europe/Simferopol',
	'Asia/Chita',
	'Africa/Windhoek',
	'Asia/Nicosia',
	'America/Rio_Branco',
	'America/Anchorage',
	'America/Barbados',
	'Asia/Yakutsk',
	'Asia/Aqtobe',
	'Asia/Oral',
	'Atlantic/Madeira',
	'Asia/Jayapura',
	'Pacific/Port_Moresby',
	'Asia/Hebron',
	'Pacific/Norfolk',
	'Atlantic/Azores',
	'America/Nassau',
	'America/Paramaribo',
	'Asia/Pontianak',
	'America/Boise',
	'America/Santarem',
	'Australia/Hobart',
	'Africa/El_Aaiun',
	'Asia/Dili',
	'America/Regina',
	'Asia/Kamchatka',
	'Pacific/Tahiti',
	'Pacific/Bougainville',
	'Pacific/Guam',
	'America/Curacao',
	'Asia/Aqtau',
	'Indian/Mauritius',
	'America/Araguaina',
	'Asia/Kuching',
	'Atlantic/Reykjavik',
	'Australia/Darwin',
	'Europe/Uzhgorod',
	'Pacific/Guadalcanal',
	'America/Thunder_Bay',
	'America/St_Johns',
	'Pacific/Noumea',
	'Asia/Magadan',
	'Africa/Ceuta',
	'America/Bahia_Banderas',
	'Asia/Hovd',
	'Europe/Andorra',
	'Asia/Thimphu',
	'Indian/Mahe',
	'Pacific/Tongatapu',
	'Pacific/Efate',
	'Atlantic/Bermuda',
	'America/Moncton',
	'America/Cayman',
	'America/Cayenne',
	'America/Belize',
	'Atlantic/Faroe',
	'Pacific/Chuuk',
	'America/Port_of_Spain',
	'Asia/Choibalsan',
	'Europe/Monaco',
	'Pacific/Apia',
	'Pacific/Pohnpei',
	'America/Juneau',
	'America/Eirunepe',
	'Europe/Gibraltar',
	'Pacific/Tarawa',
	'Pacific/Majuro',
	'Pacific/Galapagos',
	'America/Santa_Isabel',
	'America/Whitehorse',
	'America/Ojinaga',
	'Pacific/Palau',
	'America/Yellowknife',
	'America/Glace_Bay',
	'Australia/Broken_Hill',
	'America/Godthab',
	'America/Swift_Current',
	'Pacific/Wake',
	'Pacific/Kwajalein',
	'Pacific/Rarotonga',
	'Asia/Anadyr',
	'America/Dawson_Creek',
	'Pacific/Nauru',
	'America/Sitka',
	'Pacific/Marquesas',
	'America/Menominee',
	'America/Goose_Bay',
	'America/Iqaluit',
	'Asia/Khandyga',
	'Pacific/Kosrae',
	'Asia/Ust-Nera',
	'America/Boa_Vista',
	'America/Miquelon',
	'America/Creston',
	'Pacific/Kiritimati',
	'Pacific/Funafuti',
	'America/Fort_Nelson',
	'America/Nome',
	'America/Grand_Turk',
	'Pacific/Pago_Pago',
	'Asia/Srednekolymsk',
	'America/Inuvik',
	'America/Noronha',
	'Indian/Chagos',
	'Pacific/Easter',
	'America/Atikokan',
	'America/Rankin_Inlet',
	'Atlantic/Stanley',
	'Indian/Christmas',
	'America/Nipigon',
	'America/Cambridge_Bay',
	'America/Pangnirtung',
	'America/Metlakatla',
	'America/Dawson',
	'Pacific/Niue',
	'America/Blanc-Sablon',
	'America/Rainy_River',
	'Australia/Currie',
	'America/Thule',
	'America/Yakutat',
	'Pacific/Chatham',
	'Indian/Cocos',
	'Pacific/Fakaofo',
	'America/Scoresbysund',
	'Australia/Eucla',
	'Australia/Lord_Howe',
	'America/Adak',
	'America/Resolute',
	'Antarctica/Rothera',
	'Indian/Kerguelen',
	'Pacific/Gambier',
	'Pacific/Wallis',
	'Antarctica/DumontDUrville',
	'Antarctica/Davis',
	'Antarctica/Mawson',
	'Pacific/Pitcairn',
	'Antarctica/Palmer',
	'Antarctica/Troll',
	'Atlantic/South_Georgia',
	'Antarctica/Vostok',
	'Antarctica/Syowa',
	'Antarctica/Casey',
	'Australia/Lindeman',
	'America/Danmarkshavn',
	'Antarctica/Macquarie',
	'Pacific/Enderbury',
	'Africa/Addis_Ababa',
	'Africa/Asmara',
	'Africa/Asmera',
	'Africa/Bamako',
	'Africa/Bangui',
	'Africa/Banjul',
	'Africa/Blantyre',
	'Africa/Brazzaville',
	'Africa/Bujumbura',
	'Africa/Conakry',
	'Africa/Dakar',
	'Africa/Dar_es_Salaam',
	'Africa/Djibouti',
	'Africa/Douala',
	'Africa/Freetown',
	'Africa/Gaborone',
	'Africa/Harare',
	'Africa/Juba',
	'Africa/Kampala',
	'Africa/Kigali',
	'Africa/Kinshasa',
	'Africa/Libreville',
	'Africa/Lome',
	'Africa/Luanda',
	'Africa/Lubumbashi',
	'Africa/Lusaka',
	'Africa/Malabo',
	'Africa/Maseru',
	'Africa/Mbabane',
	'Africa/Mogadishu',
	'Africa/Niamey',
	'Africa/Nouakchott',
	'Africa/Ouagadougou',
	'Africa/Porto-Novo',
	'Africa/Sao_Tome',
	'Africa/Timbuktu',
	'America/Anguilla',
	'America/Antigua',
	'America/Argentina/Buenos_Aires',
	'America/Argentina/Catamarca',
	'America/Argentina/ComodRivadavia',
	'America/Argentina/Cordoba',
	'America/Argentina/Jujuy',
	'America/Argentina/La_Rioja',
	'America/Argentina/Mendoza',
	'America/Argentina/Rio_Gallegos',
	'America/Argentina/Salta',
	'America/Argentina/San_Juan',
	'America/Argentina/San_Luis',
	'America/Argentina/Tucuman',
	'America/Argentina/Ushuaia',
	'America/Aruba',
	'America/Atka',
	'America/Buenos_Aires',
	'America/Catamarca',
	'America/Coral_Harbour',
	'America/Cordoba',
	'America/Dominica',
	'America/Ensenada',
	'America/Fort_Wayne',
	'America/Grenada',
	'America/Guadeloupe',
	'America/Indiana/Indianapolis',
	'America/Indiana/Knox',
	'America/Indiana/Marengo',
	'America/Indiana/Petersburg',
	'America/Indiana/Tell_City',
	'America/Indiana/Vevay',
	'America/Indiana/Vincennes',
	'America/Indiana/Winamac',
	'America/Indianapolis',
	'America/Jujuy',
	'America/Kentucky/Louisville',
	'America/Kentucky/Monticello',
	'America/Knox_IN',
	'America/Kralendijk',
	'America/Louisville',
	'America/Lower_Princes',
	'America/Marigot',
	'America/Mendoza',
	'America/Montreal',
	'America/Montserrat',
	'America/North_Dakota/Beulah',
	'America/North_Dakota/Center',
	'America/North_Dakota/New_Salem',
	'America/Nuuk',
	'America/Porto_Acre',
	'America/Punta_Arenas',
	'America/Rosario',
	'America/Shiprock',
	'America/St_Barthelemy',
	'America/St_Kitts',
	'America/St_Lucia',
	'America/St_Thomas',
	'America/St_Vincent',
	'America/Tortola',
	'America/Virgin',
	'Antarctica/McMurdo',
	'Antarctica/South_Pole',
	'Arctic/Longyearbyen',
	'Asia/Aden',
	'Asia/Ashkhabad',
	'Asia/Atyrau',
	'Asia/Bahrain',
	'Asia/Barnaul',
	'Asia/Calcutta',
	'Asia/Chongqing',
	'Asia/Chungking',
	'Asia/Dacca',
	'Asia/Famagusta',
	'Asia/Harbin',
	'Asia/Istanbul',
	'Asia/Kashgar',
	'Asia/Katmandu',
	'Asia/Kuwait',
	'Asia/Macao',
	'Asia/Muscat',
	'Asia/Phnom_Penh',
	'Asia/Qostanay',
	'Asia/Saigon',
	'Asia/Tel_Aviv',
	'Asia/Thimbu',
	'Asia/Ujung_Pandang',
	'Asia/Ulan_Bator',
	'Asia/Vientiane',
	'Asia/Yangon',
	'Atlantic/Faeroe',
	'Atlantic/Jan_Mayen',
	'Atlantic/St_Helena',
	'Australia/ACT',
	'Australia/Canberra',
	'Australia/LHI',
	'Australia/North',
	'Australia/NSW',
	'Australia/Queensland',
	'Australia/South',
	'Australia/Tasmania',
	'Australia/Victoria',
	'Australia/West',
	'Australia/Yancowinna',
	'Brazil/Acre',
	'Brazil/DeNoronha',
	'Brazil/East',
	'Brazil/West',
	'Canada/Atlantic',
	'Canada/Central',
	'Canada/Eastern',
	'Canada/Mountain',
	'Canada/Newfoundland',
	'Canada/Pacific',
	'Canada/Saskatchewan',
	'Canada/Yukon',
	'CET',
	'Chile/Continental',
	'Chile/EasterIsland',
	'CST6CDT',
	'Cuba',
	'EET',
	'Egypt',
	'Eire',
	'EST',
	'EST5EDT',
	'Etc/GMT-0',
	'Etc/GMT-1',
	'Etc/GMT-10',
	'Etc/GMT-11',
	'Etc/GMT-12',
	'Etc/GMT-13',
	'Etc/GMT-14',
	'Etc/GMT-2',
	'Etc/GMT-3',
	'Etc/GMT-4',
	'Etc/GMT-5',
	'Etc/GMT-6',
	'Etc/GMT-7',
	'Etc/GMT-8',
	'Etc/GMT-9',
	'Etc/GMT',
	'Etc/GMT+0',
	'Etc/GMT+1',
	'Etc/GMT+10',
	'Etc/GMT+11',
	'Etc/GMT+12',
	'Etc/GMT+2',
	'Etc/GMT+3',
	'Etc/GMT+4',
	'Etc/GMT+5',
	'Etc/GMT+6',
	'Etc/GMT+7',
	'Etc/GMT+8',
	'Etc/GMT+9',
	'Etc/GMT0',
	'Etc/Greenwich',
	'Etc/UCT',
	'Etc/Universal',
	'Etc/UTC',
	'Etc/Zulu',
	'Europe/Belfast',
	'Europe/Bratislava',
	'Europe/Busingen',
	'Europe/Guernsey',
	'Europe/Isle_of_Man',
	'Europe/Jersey',
	'Europe/Ljubljana',
	'Europe/Mariehamn',
	'Europe/Nicosia',
	'Europe/Podgorica',
	'Europe/San_Marino',
	'Europe/Sarajevo',
	'Europe/Saratov',
	'Europe/Skopje',
	'Europe/Tiraspol',
	'Europe/Vaduz',
	'Europe/Vatican',
	'Europe/Zagreb',
	'GB-Eire',
	'GB',
	'GMT-0',
	'GMT',
	'GMT+0',
	'GMT0',
	'Greenwich',
	'Hongkong',
	'HST',
	'Iceland',
	'Indian/Antananarivo',
	'Indian/Comoro',
	'Indian/Mayotte',
	'Iran',
	'Israel',
	'Jamaica',
	'Japan',
	'Kwajalein',
	'Libya',
	'MET',
	'Mexico/BajaNorte',
	'Mexico/BajaSur',
	'Mexico/General',
	'MST',
	'MST7MDT',
	'Navajo',
	'NZ-CHAT',
	'NZ',
	'Pacific/Johnston',
	'Pacific/Midway',
	'Pacific/Ponape',
	'Pacific/Saipan',
	'Pacific/Samoa',
	'Pacific/Truk',
	'Pacific/Yap',
	'Poland',
	'Portugal',
	'PRC',
	'PST8PDT',
	'ROC',
	'ROK',
	'Singapore',
	'Turkey',
	'UCT',
	'Universal',
	'US/Alaska',
	'US/Aleutian',
	'US/Arizona',
	'US/Central',
	'US/East-Indiana',
	'US/Eastern',
	'US/Hawaii',
	'US/Indiana-Starke',
	'US/Michigan',
	'US/Mountain',
	'US/Pacific',
	'US/Samoa',
	'UTC',
	'W-SU',
	'WET',
	'Zulu',
]
