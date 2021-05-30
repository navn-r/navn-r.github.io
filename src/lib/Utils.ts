const MOBILE_REGEX =
  /mobile|android|webos|iphone|ipad|ipod|blackberry|bb|playbook|iemobile|windows phone|kindle|silk|opera mini/i;

export const isMobile = () => navigator.userAgent.toLowerCase().match(MOBILE_REGEX);
