/**
 * @file Uma classe para representar uma circunferência e realizar cálculos
 * relacionados a ela.
 * @copyright Tiago Andrade 2023
 */

/**
 * Uma classe para representar uma circunferência e realizar cálculos relacionados
 * a ela.
 */
class Circumference {
	/** Valor da constante Pi utilizado para este objeto. */
	#PI = Math.PI;
	/** Raio da circunferência. */
	#radius = 0;
	/** Coordenada X do centro da circunferência. */
	#x = 0;
	/** Coordenada Y do centro da circunferência. */
	#y = 0;

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
	 * @param {number | undefined} radius - O raio da circunferência.
	 */
	constructor(radius) {
		if (typeof radius !== 'undefined') {
			this.radius = radius;
		}
	}

	/**
	 * Configura o valor da constante Pi especificando sua precisão.
	 * @param {number} decimalPlaces - O número de casas decimais para PI.
	 * @param {boolean} [rounding = false] - Se a última casa decimal deve ser
	 * arredondada.
	 */
	setPI(decimalPlaces, round = false) {
		Circumference.#validateNumber(decimalPlaces, 'Decimal places');

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
		this.#PI = fixMethod(Math.PI * factor) / factor;
	}
	get PI() {
		return this.#PI;
	}

	set radius(value) {
		Circumference.#validateNumber(value, 'Radius');

		if (value < 0) {
			throw new RangeError('Radius cannot be negative');
		}
		this.#radius = value;
	}
	get radius() {
		return this.#radius;
	}

	set diameter(value) {
		Circumference.#validateNumber(value, 'Diameter');

		if (value < 0) {
			throw new RangeError('Diameter cannot be negative');
		}
		this.#radius = value / 2;
	}
	get diameter() {
		return this.radius * 2;
	}

	set area(value) {
		Circumference.#validateNumber(value, 'Area');

		if (value < 0) {
			throw new RangeError('Area cannot be negative');
		}
		this.radius = Math.sqrt(value / this.PI);
	}
	get area() {
		return this.PI * this.radius * this.radius;
	}

	set circumference(value) {
		Circumference.#validateNumber(value, 'Circumference');

		if (value < 0) {
			throw new RangeError('Circumference cannot be negative');
		}
		this.radius = value / 2 / this.PI;
	}
	get circumference() {
		return 2 * this.PI * this.radius;
	}

	set x(value) {
		Circumference.#validateNumber(value, 'X');

		this.#x = value;
	}
	get x() {
		return this.#x;
	}

	set y(value) {
		Circumference.#validateNumber(value, 'Y');

		this.#y = value;
	}
	get y() {
		return this.#y;
	}

	/**
	 * Calcula a relação de um ponto P(X, Y) em relação ao centro da circunferência.
	 * @param {number} a - Coordenada X do ponto.
	 * @param {number} b - Coordenada Y do ponto.
	 * @returns {number} - 0 se o ponto pertence à circunferência, -1 se é interno
	 * a ela, 1 se externo.
	 */
	compareToPoint(pX, pY) {
		Circumference.#validateNumber(pX, 'pX');
		Circumference.#validateNumber(pY, 'pY');

		const distanceFromCircumferenceCenter =
			Math.sqrt(Math.pow(pX - this.x, 2) + Math.pow(pY - this.y, 2));

		switch (true) {
			case distanceFromCircumferenceCenter < this.radius:
				return -1;
			
			case distanceFromCircumferenceCenter > this.radius:
				return 1;
			
			default:
				return 0;
		}
	}
}
