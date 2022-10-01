Reflect.defineProperty(Document.prototype, 'domain', {
	get: () => 'waflash.vseigru.net',
});
Reflect.defineProperty(Document.prototype, 'location', {
	get: () => 'waflash.vseigru.net',
});

const original_src = Reflect.getOwnPropertyDescriptor(Image.prototype, 'src');
const ad = 'img/ads/Spinner.png';

Reflect.defineProperty(Image.prototype, 'src', {
	get: original_src.get,
	set(value) {
		if (value.startsWith(ad)) {
			value = value.replace(ad, 'img/gads/Spinner.png');
		}
		return Reflect.apply(original_src.set, this, [value]);
	},
});