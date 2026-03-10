/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Google Analytics gtag function type declaration
interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}

declare const gtag: (...args: any[]) => void;
