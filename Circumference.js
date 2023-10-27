/**
 * @file A class for representing a circle and performing calculations
 * related to it.
 * @copyright Tiago Andrade 2023
 */

/**
 * A class for representing a circle and performing calculations related
 * to it.
 */
class Circle {
	/** Value of the Pi constant used for this object. */
	#PI_CONST = Math.PI;
	/** Radius of the circle. */
	#radius = 0;
	/** X-coordinate of the center of the circle. */
	#centerX = 0;
	/** Y-coordinate of the center of the circle. */
	#centerY = 0;

	static #validateNumber(value, valueName) {
		switch (true) {
			case typeof value !== 'number':
				throw new TypeError(`${valueName} must be a number`);
			
			case Number.isNaN(value):
				throw new RangeError(`${valueName} cannot be NaN`);
			
			case !Number.isFinite(value):
				throw new RangeError(`${valueName} cannot be Infinity nor -Infinity`);
		}
	}

	/**
	 * @param {number | undefined} radius - The radius of the circle.
	 */
	constructor(radius) {
		if (typeof radius !== 'undefined') {
			this.radius = radius;
		}
	}

	/**
	 * Set the value of the Pi constant, specifying its precision.
	 * @param {number} decimalPlaces - The number of decimal places for PI.
	 * @param {boolean} [round = false] - Whether the last decimal place should be
	 * rounded.
	 */
	setPiConstPrecision(decimalPlaces, round = false) {
		Circle.#validateNumber(decimalPlaces, 'Decimal places');

		if (typeof round !== 'boolean') {
			throw new TypeError('Round must be a boolean');
		}

		decimalPlaces = Math.round(decimalPlaces);
		if (decimalPlaces < 0) {
			decimalPlaces = 0;
		} else if (decimalPlaces > 15) {
			decimalPlaces = 15;
		}

		const factor = 10 ** decimalPlaces;
		const fixMethod = round ? Math.round : Math.trunc;
		this.#PI_CONST = fixMethod(Math.PI * factor) / factor;
	}
	get PI_CONST() {
		return this.#PI_CONST;
	}

	set radius(value) {
		Circle.#validateNumber(value, 'Radius');

		if (value < 0) {
			throw new RangeError('Radius cannot be negative');
		}
		this.#radius = value;
	}
	get radius() {
		return this.#radius;
	}

	set diameter(value) {
		Circle.#validateNumber(value, 'Diameter');

		if (value < 0) {
			throw new RangeError('Diameter cannot be negative');
		}
		this.#radius = value / 2;
	}
	get diameter() {
		return this.radius * 2;
	}

	set area(value) {
		Circle.#validateNumber(value, 'Area');

		if (value < 0) {
			throw new RangeError('Area cannot be negative');
		}
		this.radius = Math.sqrt(value / this.PI_CONST);
	}
	get area() {
		return this.PI_CONST * this.radius * this.radius;
	}

	set circumference(value) {
		Circle.#validateNumber(value, 'Circumference');

		if (value < 0) {
			throw new RangeError('Circumference cannot be negative');
		}
		this.radius = value / 2 / this.PI_CONST;
	}
	get circumference() {
		return 2 * this.PI_CONST * this.radius;
	}

	set centerX(value) {
		Circle.#validateNumber(value, 'X');

		this.#centerX = value;
	}
	get centerX() {
		return this.#centerX;
	}

	set centerY(value) {
		Circle.#validateNumber(value, 'Y');

		this.#centerY = value;
	}
	get centerY() {
		return this.#centerY;
	}

	/**
	 * Calculate the relationship of a point P(X, Y) to the center of the circle.
	 * @param {number} a - X-coordinate of the point.
	 * @param {number} b - Y-coordinate of the point.
	 * @returns {number} - 0 if the point belongs to the circle, -1 if it is inside
	 * it, 1 if it is outside.
	 */
	comparePointToCircle(pX, pY) {
		Circle.#validateNumber(pX, 'pX');
		Circle.#validateNumber(pY, 'pY');

		const distanceFromCircleCenter =
			Math.sqrt(Math.pow(pX - this.centerX, 2) + Math.pow(pY - this.centerY, 2));

		switch (true) {
			case distanceFromCircleCenter < this.radius:
				return -1;
			
			case distanceFromCircleCenter > this.radius:
				return 1;
			
			default:
				return 0;
		}
	}
}
