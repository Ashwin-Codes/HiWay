export default function isSafari() {
	return !navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari");
}
