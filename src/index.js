/**
 * WordPress dependencies
 */
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/private-apis';

/**
 * Acknowledgement strings for each WordPress version.
 */
const ACKNOWLEDGEMENTS = {
	6.5: 'I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.',
	6.6: 'I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.',
};

/**
 * The default acknowledgement string.
 */
const DEFAULT_ACKNOWLEDGEMENT = ACKNOWLEDGEMENTS['6.6'];

/**
 * Get the acknowledgement string based on WordPress version.
 * @param {string} version The WordPress version.
 * @returns {string} The acknowledgement string.
 */
function getAcknowledgement(version) {
	return ACKNOWLEDGEMENTS[version] || DEFAULT_ACKNOWLEDGEMENT;
}

/**
 * A wrapping function used to unlock private APIs in a specific WordPress version.
 * @param {*} target The target to unlock.
 * @param {string} version The WordPress version.
 * @returns {*}
 */
export function superUnlock(target, version) {
	const acknowledgement = getAcknowledgement(version);

	const { unlock } = __dangerousOptInToUnstableAPIsOnlyForCoreModules(
		acknowledgement,
		'@wordpress/edit-post'
	);

	return unlock(target);
}
